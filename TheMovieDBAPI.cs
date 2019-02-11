using System;
using System.Collections.Generic;
using System.Data;
using System.Net;

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
			try
			{
				var join = apiPath.Contains("?") ? "&" : "?";
				var url = $"{api}/{apiPath}{join}api_key={apiKey}";
				Console.WriteLine(url);
				return webClient.DownloadString(url);
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.ToString());
				return ex;
			}
		}
		
		public object SearchMovie(string query) =>
			Get($"search/movie?query={query}");

		public object GetMovie(int id) =>
			Get($"movie/{id}");

		public void Dispose()
		{
			
		}
	}
}