using System;
using static MTSMonitoring.MTLogger;
using Npgsql;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace MTSMonitoring
{
    public class DBConnection
    {

        private NpgsqlConnection Connection;
        private string ConnectionString;
        private NpgsqlCommand SQLCommand;
        private NpgsqlDataReader SQLData;

        /// <summary>
        /// Конструктор создания подключения к базе данных
        /// </summary>
        /// <param name="options">Параметры подключения к базе данных</param>
        public DBConnection(DBConnectionOptions options)
        {
            ConnectionString = $"Server={options.DBHost};Username={options.DBUser};Database={options.DBName};Port={options.DBPort};Password={options.DBPass}"; // ;SSLMode=Prefer

            try
            {
                Connection = new NpgsqlConnection(ConnectionString);
            }
            catch (Exception e)
            {
                Logger.Error($"Не удалось подключиться к БД [{e.Message}]");
            }

            SQLCommand = null;
            SQLData = null;
        }

        /// <summary>
        /// Первоначальная настройка базы данных - Создание таблиц
        /// </summary>
        public void InitDB()
        {
            if (Connection != null)
            {
                string query = "CREATE TABLE IF NOT EXISTS Material (Id SERIAL PRIMARY KEY, Name varchar(10) NOT NULL, Partno smallint NOT NULL, Weight real NOT NULL, Volume real NOT NULL);";
                SQLCommand = new NpgsqlCommand(query, Connection);

                try
                {
                    Connection.Open();
                    SQLCommand.ExecuteNonQuery();
                    Connection.Close();
                }
                catch (Exception e)
                {
                    Logger.Error($"Неудачнавя инициализация БД: [{e.Message}]");
                }
            }
            else
            {
                Logger.Error("Неудачнавя инициализация БД");
            }
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
                    Connection.Open();
                    SQLCommand.ExecuteNonQuery();
                    Result = true;
                    Connection.Close();
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

        /// <summary>
        /// Добавить новый материал в таблицу БД
        /// </summary>
        /// <param name="material">Экземпляр объекта Material</param>
        /// <returns>Результат добавления материала в таблицу (true - успех)</returns>
        public bool AddMaterial(Material material)
        {
            bool Result;

            if (Connection != null)
            {
                long id = material.getId();
                string name = material.getName();
                int partno = material.getPartNo();
                double weight = material.getWeight();
                string w = weight.ToString();
                w = w.Replace(',', '.');

                // string query = string.Format("INSERT INTO Material (id, name, partno, weight) VALUES ({0}, '{1}', {2}, {3});", 
                //     id, name, partno, w);

                string query = string.Format("INSERT INTO Material (name, partno, weight) VALUES ('{0}', {1}, {2});",
                    name, partno, w);

                SQLCommand = new NpgsqlCommand(query, Connection);

                try
                {
                    Connection.Open();
                    SQLCommand.ExecuteNonQuery();
                    Result = true;
                    Connection.Close();
                }
                catch (Exception e)
                {
                    Logger.Error("Не удалось добавить новый материал {0}: {1}", material.getName(), e.Message);
                    Result = false;
                }
            } else
            {
                Result = false;
            }

            return Result;
        }


        private bool writeData(string query)
        {
            bool Result = false;

            return Result;
        }

        /// <summary>
        /// Получить таблицу из БД по переданному SQL-запросу
        /// </summary>
        /// <param name="query">SQL-запрос к БД</param>
        /// <returns>Массив object[] представленный набором строк таблицы</returns>
        private object[] getData(string query)
        {
            object[] _table = null;

            if (Connection != null)
            {
                NpgsqlCommand command = new NpgsqlCommand(query, Connection);
                command.CommandTimeout = 20;
                NpgsqlDataAdapter da = new NpgsqlDataAdapter(command);
                DataSet ds = new DataSet();
                da.Fill(ds, "Material");

                // Перебор таблиц из результирующего набора
                foreach (DataTable table in ds.Tables)
                {
                    _table = new object[table.Rows.Count];
                    int __row = 0;

                    // Перебор строк в таблице
                    foreach (DataRow row in table.Rows)
                    {
                        var cells = row.ItemArray;
                        _table[__row++] = cells;
                    }
                }
            }

            return _table;
        }

       /// <summary>
       /// Получить материал из таблицы БД
       /// </summary>
       /// <returns>Экземпляр класса Material</returns>
        public Material ReadData()
        {
            Material Result = new Material();
            Connection.Open();

            if (Connection != null)
            {
                string query = "SELECT * FROM Material ORDER BY id ASC;";
                var data = getData(query);


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

            Connection.Close();

            return Result;
        }
    }

}
