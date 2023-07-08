using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Subscriber
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int TypeID { get; set; }
        public SubscriberType SubscriberType { get; set; }

        public string Location { get; set; }
        public int LastContribution { get; set; }
        public DateTime LastContributionDate { get; set; }
    }
}