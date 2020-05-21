using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using System.Net;
using Application.Validation;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }

        }
        public class CommandValidator : AbstractValidator<Command>
        {

            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();

            }
        }

        public class Handler : IRequestHandler<Command, User>
        {

            string errors;
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManger;
            private readonly IJwtGenerator _jwtGenerator;
            public Handler(DataContext context, UserManager<AppUser> userManger, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userManger = userManger;
                _context = context;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                // handler logic       

                if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });


                }
                else if (await _context.Users.Where(x => x.NormalizedEmail == request.Email.ToUpper()).AnyAsync())
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });
                }
                if (await _context.Users.Where(x => x.UserName == request.UserName).AnyAsync())
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { usename = "username already exists" });

                }
                else if (await _context.Users.Where(x => x.NormalizedUserName == request.UserName.ToUpper()).AnyAsync())
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { usename = "username already exists" });
                }




                var user = new AppUser
                {

                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.UserName.ToString().ToLower()
                };
                var result = await _userManger.CreateAsync(user, request.Password);
                if (result.Succeeded)
                {

                    return new User
                    {
                        Displayname = user.DisplayName,
                        Username = user.UserName,
                        Image = null,
                        Token = _jwtGenerator.CreateToken(user)

                    };
                }
                else
                {

                    result.Errors.ToList().ForEach(x => errors += x);
                    foreach (var error in result.Errors)
                    {
                        throw new RestException(HttpStatusCode.BadRequest, new { usename = error.Description });
                    }

                    throw new Exception(errors);
                }

            }
        }
    }
}