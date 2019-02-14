using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;

using System.Runtime.Serialization;
using System.Json;

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
			Database.Query("SELECT * FROM Movie WHERE id = @id", new object[]{ id }).FirstOrDefault();
		
		// public object Get(int id)
		// {
		// 	var movie = Database.Query("SELECT * FROM Movie WHERE id = @id", new object[]{ id }).FirstOrDefault();
		// 	// Console.WriteLine((string)movie["tmdbData"]);
		// 	JsonObject value = JsonValue.Parse((string)movie["tmdbData"]) as JsonObject;
		// 	// Console.WriteLine((string)value);
		// 	return value;
		// 	// return movie;
		// }
		
		// GET api/movie?tmdbID={tmdbID}
		[HttpGet]
		public object GetByTMDBID(int tmdbID) =>
			Database.Query("SELECT * FROM Movie WHERE tmdbID = @tmdbID", new object[]{ tmdbID }).FirstOrDefault();

		// POST api/movie
		[HttpPost]
		public object Create([FromBody]Movie movie)
		{
			int tmdbID = movie.tmdbID;
			var tmdbData = JsonValue.Parse((string) Api.GetMovie(tmdbID)) as JsonObject;
			var title = (string) tmdbData["title"];
			Database.Query("INSERT INTO Movie (title, tmdbID, tmdbData) VALUES (@title, @tmdbID, @tmdbData)", new object[]{ title, tmdbID, tmdbData });
			return Database.Query("SELECT * FROM Movie WHERE id = LAST_INSERT_ID()");
		}
	}
}

public class Movie
{
    public int id { get; set; }
    public string title { get; set; }
    public int tmdbID { get; set; }
}