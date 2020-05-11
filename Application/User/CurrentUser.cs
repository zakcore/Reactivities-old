using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { };

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _useManager;
            private readonly IUserAccessor _UserAccessor;
            private readonly IJwtGenerator _jwt;

            public Handler(UserManager<AppUser> useManager, IUserAccessor UserAccessor, IJwtGenerator jwt)
            {
               _jwt = jwt;
               _UserAccessor = UserAccessor;
               _useManager = useManager;

            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _useManager.FindByNameAsync(_UserAccessor.GetCurrentUserName());
                return new User{

                      Displayname=user.DisplayName,
                      Username=user.UserName,
                      Token=_jwt.CreateToken(user),
                      Image=null  
                };
            }
        }
    }
}