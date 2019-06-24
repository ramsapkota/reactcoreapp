using Dapper;
using System.Data;

namespace sc.data
{
    public class Parameters
    {
        private DynamicParameters _params;

        public DynamicParameters Params
        {
            get => _params;
            private set => _params = value;
        }

        public Parameters()
        {
            _params = new DynamicParameters();
        }

        public void Add(string name, object value, DbType? dbType, ParameterDirection? direction, int? size)
        {
            _params.Add(name, value, dbType, direction, size);
        }

        public void Add(string name, object value = null, DbType? dbType = default(DbType?), ParameterDirection? direction = default(ParameterDirection?), int? size = default(int?), byte? precision = default(byte?), byte? scale = default(byte?))
        {
            _params.Add(name, value, dbType, direction, size, precision);
        }

        public T Get<T>(string name)
        {
            return _params.Get<T>(name);
        }
    }
}
