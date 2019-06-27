using Dapper;
using rs.data;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace sc.data
{
    public class DbContextt : AppConfiguration
    {
        private readonly string _connString;

        public DbContextt(string connStringName)
        {
            _connString = ConnectionString;
        }

        private IDbConnection OpenConnection()
        {
            return new SqlConnection(_connString);
        }

        #region synchronous methods

        public IEnumerable<T> ExecuteAsList<T>(string query, Parameters p = null)
        {
            using (IDbConnection con = OpenConnection())
            {
                return con.Query<T>(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
            }
        }

        public T ExecuteAsObject<T>(string query, Parameters p = null)
        {
            using (IDbConnection con = OpenConnection())
            {
                return con.QuerySingleOrDefault<T>(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
            }
        }

        public int ExecuteNonQuery(string query, Parameters p = null)
        {
            using (IDbConnection con = OpenConnection())
            {
                return con.Execute(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
            }
        }

        public DbResult ExecuteDbResult(string query, Parameters p = null)
        {
            p.Params.Add("@IsDbSuccess", dbType: DbType.Boolean, direction: ParameterDirection.Output);
            p.Params.Add("@DbMessage", dbType: DbType.String, size: 256, direction: ParameterDirection.Output);

            using (IDbConnection con = OpenConnection())
            {
                con.Execute(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
                return new DbResult
                {
                    IsDbSuccess = p.Get<bool>("@IsDbSuccess"),
                    DbMessage = p.Get<string>("@DbResult")
                };
            }
        }

        public DapperDataReader ExecuteMultiple(string query, Parameters p = null)
        {
            IDbConnection con = OpenConnection();
            SqlMapper.GridReader reader = con.QueryMultiple(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);

            return new DapperDataReader
            {
                Reader = reader,
                Connection = con
            };
        }

        #endregion

        #region asynchronous methods

        public async Task<IEnumerable<T>> ExecuteAsListAsync<T>(string query, Parameters p = null)
        {
            using (IDbConnection con = OpenConnection())
            {
                return await con.QueryAsync<T>(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<T> ExecuteAsObjectAsync<T>(string query, Parameters p = null)
        {
            using (IDbConnection con = OpenConnection())
            {
                return await con.QuerySingleOrDefaultAsync<T>(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<int> ExecuteNonQueryAsync(string query, Parameters p = null)
        {
            using (IDbConnection con = OpenConnection())
            {
                return await con.ExecuteAsync(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<DbResult> ExecuteDbResultAsync(string query, Parameters p = null)
        {
            p.Params.Add("@IsDbSuccess", dbType: DbType.Boolean, direction: ParameterDirection.Output);
            p.Params.Add("@DbMessage", dbType: DbType.String, size: 256, direction: ParameterDirection.Output);
            p.Params.Add("@ReturnId", dbType: DbType.String, size: 10, direction: ParameterDirection.Output);

            using (IDbConnection con = OpenConnection())
            {
                await con.ExecuteAsync(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);
                return new DbResult
                {
                    IsDbSuccess = p.Get<bool>("@IsDbSuccess"),
                    DbMessage = p.Get<string>("@DbMessage"),
                    ReturnId = p.Get<string>("@ReturnId")
                };
            }
        }

        public async Task<DapperDataReader> ExecuteMultipleAsync(string query, Parameters p = null)
        {
            IDbConnection con = OpenConnection();
            SqlMapper.GridReader reader = await con.QueryMultipleAsync(query, p == null ? null : p.Params, commandType: CommandType.StoredProcedure);

            return new DapperDataReader
            {
                Reader = reader,
                Connection = con
            };
        }

        #endregion
    }
}
