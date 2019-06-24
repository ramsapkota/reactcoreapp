using System.Collections.Generic;

namespace sc.data
{
    public class PagedData<T>
    {
        public IEnumerable<T> Data { get; set; }

        public Pager Pager { get; set; }
    }

    public class Pager
    {
        public int PageNo { get; set; }

        public int ItemsPerPage { get; set; }

        public int PagePerDisplay { get; set; }

        public int TotalNextPages { get; set; }
    }

}
