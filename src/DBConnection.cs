using System;
using NLog;
using Npgsql;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Collections.Generic;

namespace MTSMonitoring
{
    public class DBConnection
    {

        private readonly NpgsqlConnection Connection;
        private readonly string ConnectionString;
        private NpgsqlCommand SQLCommand;
        private NpgsqlDataReader SQLData;
        private string DBShema;
        private readonly IConfigurationRoot config;
        private readonly Logger logger;

        /// <summary>
        /// Конструктор создания подключения к базе данных
        /// </summary>
        /// <param name="options">Параметры подключения к базе данных</param>
        public DBConnection()
        {
            // Читаем параметры подключения к СУБД PostgreSQL
            logger = LogManager.GetCurrentClassLogger();
            config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
            string db_host = config.GetSection("PGSQL:DBHost").Value;
            string db_port = config.GetSection("PGSQL:DBPort").Value;
            string db_name = config.GetSection("PGSQL:DBName").Value;
            string db_schema = config.GetSection("PGSQL:DBSchema").Value;
            string db_user = config.GetSection("PGSQL:DBUser").Value;
            string db_pass = config.GetSection("PGSQL:DBPass").Value;

            ConnectionString = $"Server={db_host};Username={db_user};Database={db_name};Port={db_port};Password={db_pass}"; // ;SSLMode=Prefer

            try
            {
                Connection = new NpgsqlConnection(ConnectionString);
            }
            catch (Exception e)
            {
                logger.Error($"Не удалось подключиться к БД [{e.Message}]");
                throw new DataException($"Ошибка при подключении к базе данных: [{e.Message}]");
            }

            SQLCommand = null;
            SQLData = null;
            DBShema = db_schema;
        }

        /// <summary>
        /// Первоначальная настройка базы данных - Создание таблиц
        /// </summary>
        public void InitDB()
        {
            if (Connection != null)
            {
                string query = $"CREATE TABLE IF NOT EXISTS {DBShema}.Materials (Id SERIAL PRIMARY KEY, Name varchar(10) NOT NULL, Partno smallint NOT NULL, Weight real NOT NULL, Volume real NOT NULL);";
                SQLCommand = new NpgsqlCommand(query, Connection);

                try
                {
                    Connection.Open();
                    SQLCommand.ExecuteNonQuery();
                    Connection.Close();
                }
                catch (Exception e)
                {
                    logger.Error($"Неудачнавя инициализация БД: [{e.Message}]");
                    throw new DataException($"Ошибка при инициализации базы данных: [{e.Message}]");
                }
            }
            else
            {
                logger.Error("Неудачнавя инициализация БД");
                throw new DataException($"Не удалось установить подключение к базе данных");
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
                    Connection.Close();
                    Result = true;
                }
                catch (Exception e)
                {
                    Result = false;
                    logger.Error($"Ошибка выполнения запроса: [{e.Message}]");
                }
            }
            else
            {
                Result = false;
            }

            return Result;
        }

        /// <summary>
        /// Добавление наименование материала в справочник
        /// </summary>
        /// <param name="name">Наименование материала</param>
        /// <returns>Номер ID добавленной записи, или -1 в случае ошибки</returns>
        public int AddMaterialToCollection(string name)
        {
            int Result = -1;
            if (name == "" || Connection == null)
            {
                return Result;
            }

            string sql = $"INSERT INTO {DBShema}.material(name) VALUES (\'{name}\') RETURNING id;";
            SQLCommand = new NpgsqlCommand(sql, Connection);

            try
            {
                Connection.Open();
                Result = Int32.Parse(SQLCommand.ExecuteScalar().ToString()); //Выполняем нашу команду.
                Connection.Close();
            }
            catch (Exception e)
            {
                logger.Error($"Ошибка при добавлении материала [{name}] в базу данных: {e.Message}");
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
                string name = material.getName();
                int partno = material.getPartNo();
                double weight = material.getWeight();
                string w = weight.ToString();
                w = w.Replace(',', '.');
                double volume = material.getVolume();
                string v = volume.ToString();
                v = v.Replace(',', '.');

                string query = string.Format("INSERT INTO {0}.Materials (name, partno, weight, volume) VALUES ('{1}', {2}, {3}, {4});",
                    DBShema, name, partno, w, v);

                SQLCommand = new NpgsqlCommand(query, Connection);

                try
                {
                    Connection.Open();
                    SQLCommand.ExecuteNonQuery();
                    Connection.Close();
                    Result = true;
                }
                catch (Exception e)
                {
                    logger.Error("Не удалось добавить новый материал {0}: {1}", material.getName(), e.Message);
                    Result = false;
                }
            } else
            {
                Result = false;
            }

            return Result;
        }


        public bool WriteData(string query)
        {
            bool Result = false;

            try
            {
                NpgsqlCommand command = new NpgsqlCommand(query, Connection);
                Connection.Open();
                command.ExecuteNonQuery();
                Connection.Close();
                Result = true;
            }
            catch (Exception e)
            {
                logger.Error($"Не удалось записать данные в базу данных: [{query}] = {e.Message}");
            }

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
                NpgsqlCommand command = new NpgsqlCommand(query, Connection)
                {
                    CommandTimeout = 20
                };
                NpgsqlDataAdapter da = new NpgsqlDataAdapter(command);
                DataSet ds = new DataSet();
                da.Fill(ds, $"{DBShema}.Material");

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
        public List<Material> GetMaterials(string material)
        {
            List<Material> Result = new List<Material>();

            if (Connection != null)
            {
                string query = $"SELECT * FROM {DBShema}.materials WHERE name='{material}' ORDER BY id ASC;";
                var data = getData(query);


                SQLCommand = new NpgsqlCommand(query, Connection);

                Connection.Open();
                SQLData = SQLCommand.ExecuteReader();

                while (SQLData.Read())
                {
                    Material layer = new Material();

                    long id = SQLData.GetInt64(0);
                    string name = SQLData.GetString(1);
                    int partno = SQLData.GetInt32(2);
                    double weight = SQLData.GetDouble(3);
                    double volume = SQLData.GetDouble(4);

                    layer.setMaterial(id, name, partno, weight, volume);
                    Result.Add(layer);
                }
                Connection.Close();
            }
            else
            {
                Result = null;
            }

            return Result;
        }
    }

}
