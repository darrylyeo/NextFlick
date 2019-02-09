using System;
using System.Collections.Generic;

using System.Data;
using MySql.Data.MySqlClient;

namespace nextflick
{
	public class NextFlickMySQL : IDisposable
	{
		public MySqlConnection Connection;

		public NextFlickMySQL(string connectionString)
		{
			try
			{
				Console.WriteLine("Connecting to MySQL...");
				
				Connection = new MySqlConnection(connectionString);
				Connection.Open();
				
				Console.WriteLine("Connected.");
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.ToString());
			}
		}
		
		public object Query(string sql, Dictionary<string, object> queryParams = null)
		{
			Console.WriteLine(sql);
			Console.WriteLine(queryParams);
			try
			{
				// Substitute parameters
				MySqlCommand command = new MySqlCommand(sql, Connection);
				if(queryParams != null)
				{
					command.CommandType = CommandType.StoredProcedure;
					command.Parameters.Clear();
					foreach (KeyValuePair<string, object> kvp in queryParams){
						command.Parameters.AddWithValue(/*"@" +*/ kvp.Key, kvp.Value);
						Console.WriteLine("@" + kvp.Key);
						Console.WriteLine(kvp.Value.ToString());
					}
				}
				command.Prepare();
				
				// Execute
				MySqlDataReader reader = command.ExecuteReader();
				// command.ExecuteNonQuery();
	
				// Convert to serializable dictionaries
				var items = new List<Dictionary<string, object>>();
				var fields = new List<string>();
				for (var i = 0; i < reader.FieldCount; i++) 
					fields.Add(reader.GetName(i));
			
				while (reader.Read()){ 
					var item = new Dictionary<string, object>();
					foreach (var field in fields) 
						item.Add(field, reader[field]);
					items.Add(item);
				}
				return items;
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.ToString());
				return ex.ToString();
			}
		}

		public void Dispose()
		{
			Connection.Close();
		}
	}
}