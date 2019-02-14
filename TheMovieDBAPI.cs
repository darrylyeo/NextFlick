using System;
using System.Collections.Generic;
using System.Data;
using System.Net;

using System.Runtime.Serialization;
using System.Json;

namespace nextflick
{
	public class TheMovieDBAPI : IDisposable
	{
		private const string api = "https://api.themoviedb.org/3";
		private string apiKey = "";
		
		private WebClient webClient = new System.Net.WebClient();
		
		public TheMovieDBAPI(string apiKey)
		{
			this.apiKey = apiKey;
		}
		
		private object Get(string apiPath)
		{
			var join = apiPath.Contains("?") ? "&" : "?";
			var url = $"{api}/{apiPath}{join}api_key={apiKey}";
			Console.WriteLine(url);
			
			var json = webClient.DownloadString(url);
			
			return json;
			
			// Console.WriteLine(json);
			// JsonValue value = JsonValue.Parse(json);
			// Console.WriteLine("Parsed");
			// return value as JsonObject;
		}
		
		public object SearchMovie(string query) =>
			Get($"search/movie?query={query}&region=US&include_adult=false");
		
		public object SearchMovie(string query, int page) =>
			Get($"search/movie?query={query}&page={page}");

		public object GetMovie(int id) =>
			Get($"movie/{id}");

		public void Dispose()
		{
			
		}
	}
}