using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<User>
        {

            public string Email { get; set; }
            public string Password { get; set; }
        }
        public class QueryValidator : AbstractValidator<Query>
        {

            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }

        }
        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManger;
            private readonly SignInManager<AppUser> _signInManger;
            private readonly IJwtGenerator _JwtGenerator;

            public Handler(UserManager<AppUser> userManger, SignInManager<AppUser> signInManger,
            IJwtGenerator JwtGenerator)
            {
                _JwtGenerator = JwtGenerator;
                _signInManger = signInManger;
                _userManger = userManger;


            }
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                // handler logic goes here
                var user = await _userManger.FindByEmailAsync(request.Email);
                if (user == null)
                {

                    throw new RestException(HttpStatusCode.Unauthorized);
                }
                var result = await _signInManger.CheckPasswordSignInAsync(user, request.Password, false);
                if (result.Succeeded)
                {

                    return new User
                    {
                        Displayname = user.DisplayName,
                        Token = _JwtGenerator.CreateToken(user),
                        Username = user.UserName,
                        Image = null

                    };

                }

                throw new RestException(HttpStatusCode.Unauthorized);

            }
        }
    }
}