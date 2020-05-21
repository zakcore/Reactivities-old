using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;
using System;

namespace Infrastructure.Security
{
    public class IsHostRequirment : IAuthorizationRequirement
    {

    }
    public class IsHostRequirmentHandler : AuthorizationHandler<IsHostRequirment>
    {
        private readonly IHttpContextAccessor _httpContext;
        private readonly DataContext _context;
        public IsHostRequirmentHandler(IHttpContextAccessor httpContext, DataContext context)
        {
            _context = context;
            _httpContext = httpContext;

        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirment requirement)
        {

            if(context.Resource is AuthorizationFilterContext authcontext)
            {
                    var currentuser=_httpContext.HttpContext.User?.Claims?
                    .SingleOrDefault(x =>x.Type==ClaimTypes.NameIdentifier)?.Value;
                    var activiyid=Guid.Parse(authcontext.RouteData.Values["id"].ToString());
                    var activity=_context.Activities.FindAsync(activiyid).Result;
                    var host=activity.UserActivities.FirstOrDefault(x =>x.IsHost);
                    if(host.AppUser.UserName ==currentuser)
                    context.Succeed(requirement);
            } else
            {
            context.Fail();
            }

            return Task.CompletedTask;

            }

         }
    }
