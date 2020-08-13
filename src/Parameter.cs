using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MTSMonitoring
{
    public class Parameter
    {
        public string name { get; private set; }
        public int id { get; private set; }
        private Dictionary<string, string> parameters;
        private List<Parameter> objects;

        public Parameter()
        {
            name = "";
            id = 0;
            parameters = new Dictionary<string, string>();
            objects = new List<Parameter>();
        }

        public Parameter(int _id)
        {
            if (_id <= 0)
            {
                throw new ArgumentNullException();
            }
            name = "";
            id = _id;
            parameters = new Dictionary<string, string>();
            objects = new List<Parameter>();
        }

        public Parameter(string _name)
        {
            if (_name == "")
            {
                throw new ArgumentNullException();
            }
            name = _name;
            id = 0;
            parameters = new Dictionary<string, string>();
            objects = new List<Parameter>();
        }

        public Parameter(int _id, string _name)
        {
            if (_id <= 0 || _name == "")
            {
                throw new ArgumentNullException();
            }
            name = _name;
            id = _id;
            parameters = new Dictionary<string, string>();
            objects = new List<Parameter>();
        }

        public bool AddParameter(string _key, string _value)
        {
            bool Result;
            if (_key != "" && _value != "")
            {
                parameters.Add(_key, _value);
                Result = true;
            }
            else
            {
                // throw new ArgumentNullException();
                Result = false;
            }

            return Result;
        }

        public bool AddObject(Parameter _object)
        {
            bool Result;
            if(_object != null)
            {
                objects.Add(_object);
                Result = true;
            }
            else
            {
                // throw new ArgumentNullException();
                Result = false;
            }

            return Result;
        }

        public void SetName(string _name)
        {
            if (_name == "")
                throw new ArgumentNullException();

            name = _name;
        }

        public void SetId(int _id)
        {
            if (id <= 0)
                throw new ArgumentNullException();

            id = _id;
        }
    }
}
