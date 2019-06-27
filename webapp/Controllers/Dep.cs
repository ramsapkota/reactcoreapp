using Microsoft.Extensions.DependencyInjection;
using sc.aboutUs.Provider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapp.Controllers
{

    public class AboutUsDependancy
    {
        public void RegisterDependencies(IServiceCollection services)
        {
            services.AddTransient<AboutUsDbContext>();
        }
    }

}
