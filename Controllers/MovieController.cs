using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace nextflick.Controllers
{
	[Route("api/[controller]")]
	public class MovieController : Controller
	{
		private readonly NextFlickMySQL Database;
		private readonly TheMovieDBAPI Api;
		
		public MovieController(NextFlickMySQL Database, TheMovieDBAPI Api)
		{
			this.Database = Database;
			this.Api = Api;
		}
		
		// GET api/movie/{id}
		[HttpGet("{id}")]
		public object Get(int id) =>
			Database.Query($"SELECT * FROM Movie WHERE id = {id}");

		// POST api/movie
		[HttpPost]
		public void Post([FromBody]int tmdbID)
		{
			var tmdbData = Api.GetMovie(tmdbID);
			var title = tmdbData.GetType();//tmdbData["title"];
			Database.Query($"INSERT INTO Movie (title, tmdbID, tmdbData) VALUES ({title}, {tmdbID}, {tmdbData})");
		}
	}
}