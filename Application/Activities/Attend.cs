using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Attend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // handler logic          
                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "couldn't found anny activity" });
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName ==_userAccessor.GetCurrentUserName());

                var attendence=await _context.UserActivities.SingleOrDefaultAsync(x =>x.ActivityId==activity.Id && x.AppUserId==user.Id );
                if(attendence!=null)
                throw new RestException(HttpStatusCode.NotFound, new { Attendece = "Already joined" });
                attendence=new UserActivity{
                     AppUser=user,
                     Activity=activity,
                     IsHost=false,
                     DateJoined=DateTime.Now  
                };
                _context.UserActivities.Add(attendence);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}