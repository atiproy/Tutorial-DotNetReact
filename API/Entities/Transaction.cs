using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Transaction
    {
        public int Id { get; set; }

        public int SubscriberID { get; set; }
        public Subscriber Subscriber { get; set; }

        public DateTime TransactionDate { get; set; }
        public string TransactionMode { get; set; }
 
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateOnly ModifiedDate { get; set; }        
    }
}