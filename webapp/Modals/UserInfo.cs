using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapp.Modals
{
    public class UserInfo
    {
        public UserInfo()
        {
            this.Avatar = "https://picsum.photos/200/300";
        }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Avatar { get; set; }
    }
}
