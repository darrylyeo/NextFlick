using System;
using System.Collections.Generic;

using System.Data;
using MySql.Data.MySqlClient;

using System.Text.RegularExpressions;

namespace nextflick
{
	public class NextFlickMySQL : IDisposable
	{
		public MySqlConnection Connection;

		public NextFlickMySQL(string connectionString)
		{
			try
			{
				// Console.WriteLine("Connecting to MySQL...");
				
				Connection = new MySqlConnection(connectionString);
				Connection.Open();
				
				// Console.WriteLine("Connected.");
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.ToString());
			}
		}
		
		// public List<Dictionary<string, object>> Query(string sql, Dictionary<string, object> paramValues = null)
		public List<Dictionary<string, object>> Query(string sql, object[] paramValues = null)
		{
			var items = new List<Dictionary<string, object>>();
			
			Console.WriteLine(DateTime.Now + " | " + sql + (paramValues == null ? "" : " | " + string.Join(", ", paramValues)));
			try
			{
				// Substitute parameters
				MySqlCommand command = new MySqlCommand(sql, Connection);
				if(paramValues != null)
				{
					MatchCollection parameters = new Regex(@"(@\w+)").Matches(sql);
					for(int i = 0; i < parameters.Count; i++)
					{
						command.Parameters.AddWithValue(parameters[i].Value, paramValues[i]);
					}
					
					/*foreach (KeyValuePair<string, object> kvp in paramValues){
						command.Parameters.AddWithValue("@" + kvp.Key, kvp.Value);
					}*/
				}
				
				// Execute
				using(MySqlDataReader reader = command.ExecuteReader())
				{
					// Convert to serializable dictionaries
					var fields = new List<string>();
					for (var i = 0; i < reader.FieldCount; i++) 
						fields.Add(reader.GetName(i));
				
					while (reader.Read()){ 
						var item = new Dictionary<string, object>();
						foreach (var field in fields) 
							item.Add(field, reader[field]);
						items.Add(item);
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.ToString());
				// return ex.ToString();
			}
			return items;
		}

		public void Dispose()
		{
			Connection.Close();
		}
	}
}