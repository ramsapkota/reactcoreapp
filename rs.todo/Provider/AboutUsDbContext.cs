using sc.aboutUs.Model;
using sc.data;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sc.aboutUs.Provider
{
    public class AboutUsDbContext : DbContextt
    {
        public AboutUsDbContext() : base("DefaultConnection") { }

        public async Task<PagedData<Todo>> GetTodo(int pageNo = 1, int itemsPerPage = 50, int pagePerDisplay = 5)
        {
            try
            {
                var p = new Parameters();
                p.Add("@PageNo", pageNo);
                p.Add("@ItemsPerPage", itemsPerPage);
                p.Add("@PagePerDisplay", pagePerDisplay);

                var data = await this.ExecuteMultipleAsync("dbo.todo_get", p);

                return new PagedData<Todo>
                {
                    Data = data.ReadAsList<Todo>(),
                    Pager = data.ReadAsObject<Pager>()
                };

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<DbResult> SaveTodo(Todo info)
        {
            try
            {
                var p = new Parameters();
                p.Add("@Id", info.Id);
                p.Add("@Title", info.Title);
                p.Add("@Department", info.Department);
                p.Add("@Status", info.Status);

                var data = await this.ExecuteDbResultAsync("dbo.todo_save", p);
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DbResult> SaveAboutUs(AboutUsInfo info)
        {
            try
            {
                var p = new Parameters();
                p.Add("@Description", info.Description);
                p.Add("@AddedBy", info.AddedBy);

                return await this.ExecuteDbResultAsync("dbo.usp_sc_AboutUs_save", p);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
