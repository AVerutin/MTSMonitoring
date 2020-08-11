using System;
using static MTSMonitoring.MTLogger;
using Npgsql;

namespace MTSMonitoring
{
    public class DBConnection
    {

        private NpgsqlConnection Connection;
        private string ConnectionString;
        private NpgsqlCommand SQLCommand;
        private NpgsqlDataReader SQLData;

        public DBConnection(DBConnectionOptions options)
        {
            ConnectionString = $"Server={options.DBHost};Username={options.DBUser};Database={options.DBName};Port={options.DBPort};Password={options.DBPass}"; // ;SSLMode=Prefer
            Connection = null;
            SQLCommand = null;
            SQLData = null;
        }

        public bool Connect()
        {
            bool Result;
            try
            {
                Connection = new NpgsqlConnection(ConnectionString);
                Connection.Open();

                Result = true;
            }
            catch
            {
                Logger.Error($"Не удалось подключиться к базе данных: [{ConnectionString}]");
                Result = false;
            }

            return Result;
        }

        /// <summary>
        /// Временно
        /// </summary>
        public bool ExequteQuery(string query)
        {
            bool Result;

            if (Connection != null)
            {
                SQLCommand = new NpgsqlCommand(query, Connection);

                try
                {
                    SQLCommand.ExecuteNonQuery();
                    Result = true;
                }
                catch (Exception e)
                {
                    Result = false;
                    Logger.Error($"Ошибка выполнения запроса: [{e.Message}]");
                }
            }
            else
            {
                Result = false;
            }

            return Result;
        }

        public Material ReadData()
        {
            Material Result = new Material();

            if (Connection != null)
            {
                string query = "SELECT * FROM Material ORDER BY id LIMIT 1;";
                SQLCommand = new NpgsqlCommand(query, Connection);

                SQLData = SQLCommand.ExecuteReader();
                while (SQLData.Read())
                {
                    long id = SQLData.GetInt64(0);
                    string name = SQLData.GetString(1);
                    int partno = SQLData.GetInt32(2);
                    double weight = SQLData.GetDouble(3);

                    Result.setMaterial(id, name, partno, weight);
                }
            }
            else
            {
                Result = null;
            }

            return Result;
        }

        public void AddMaterial()
        {

        }
    }
}
