using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Application.Activities
{
    public class ActivityDTO
    {
          public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        [JsonProperty("atendees")]
        public ICollection<AtendeeDTO> UserActivities { get; set; }
    }
}