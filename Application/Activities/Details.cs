using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityDTO>
        {
            public Guid Id { get; set; }

        }
        public class Handler : IRequestHandler<Query, ActivityDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;

                this._context = context;
            }

            public async Task<ActivityDTO> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.SingleOrDefaultAsync(x => x.Id== request.Id);
                
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "no activity found" });

                    var ActivityToReturn=_mapper.Map<Activity,ActivityDTO>(activity);
                return ActivityToReturn;
            }
        }
    }
}