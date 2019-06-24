using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sc.aboutUs.Model
{

    public class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Department { get; set; }
        public bool Status { get; set; }
    }
    public class AboutUsInfo
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

        public DateTime AddedOn { get; set; }

        public string AddedBy { get; set; }

        public bool IsUpdated { get; set; }

        public DateTime UpdatedOn { get; set; }

        public string UpdatedBy { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime DeletedOn { get; set; }

        public string DeletedBy { get; set; }
    }
}
