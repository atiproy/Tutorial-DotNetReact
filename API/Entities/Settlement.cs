using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Settlement
    {
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public int PreviousValue { get; set; }
        public int ProposedValue { get; set; }
        public int SettledValue { get; set; }

        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateOnly ModifiedDate { get; set; }
    }
}