using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapp.Modals;

namespace webapp.Interfaces
{
    public interface IAuthenticateService
    {
        bool IsAuthenticated(TokenRequest request, out string token);
    }
}
