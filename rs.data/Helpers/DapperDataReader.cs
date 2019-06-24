using Dapper;
using System.Collections.Generic;
using System.Data;


namespace sc.data
{
    public class DapperDataReader
    {
        private SqlMapper.GridReader _reader;
        private IDbConnection _connection;

        public SqlMapper.GridReader Reader
        {
            set => _reader = value;
        }

        public IDbConnection Connection
        {
            set => _connection = value;
        }

        public IEnumerable<T> ReadAsList<T>()
        {
            return _reader.Read<T>();
        }

        public T ReadAsObject<T>()
        {
            return _reader.ReadSingleOrDefault<T>();
        }

        public void Close()
        {
            ConnectionState state = _connection.State;
            if (state != ConnectionState.Closed)
            {
                _connection.Close();
            }

            _reader = null;
        }

        public void Dispose()
        {
            Close();
        }
    }
}
