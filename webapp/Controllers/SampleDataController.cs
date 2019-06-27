using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using sc.aboutUs.Model;
using sc.aboutUs.Provider;

namespace webapp.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller  {

        private AboutUsDbContext _AboutUsDbContext;
        public AboutUsDbContext AboutUsDbContext
        {
            get
            {
                if (this._AboutUsDbContext == null)
                    this._AboutUsDbContext = new AboutUsDbContext();
                return _AboutUsDbContext;
            }
        }
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveTodo ([FromBody]Todo model)
        {
            //save todo
          var data = await AboutUsDbContext.SaveTodo(model );
            return Ok(data);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> RemoveTodo([FromBody]Todo model)
        {
            //save todo
            var datt = model.Id;
            var data = await AboutUsDbContext.RemoveTodo(model.Id);
            return Ok(data);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetTodo()
        {
            var data = await AboutUsDbContext.GetTodo();

            return Ok(data);

        }



        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class TotoDTO
        {
            public string Title { get; set; }
            public string Department { get; set; }
            public bool Status { get; set; }
        }
        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
