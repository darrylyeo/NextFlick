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
	public class MovieWatchController : Controller
	{
		private readonly NextFlickMySQL Database;
		private readonly TheMovieDBAPI Api;
		
		public MovieWatchController(NextFlickMySQL Database, TheMovieDBAPI Api)
		{
			this.Database = Database;
			this.Api = Api;
		}
		
		// GET api/moviewatch
		// GET api/moviewatch?movieID={movieID}
		// GET api/moviewatch?userID={userID}
		// GET api/moviewatch?movieID={movieID}&userID={userID}
		[HttpGet]
		public object ListOrGet(int movieID, int userID)
		{
			if(movieID > 0 && userID > 0)
				return Database.Query("SELECT * FROM MovieWatch WHERE movieID = @movieID AND userID = @userID", new object[]{ movieID, userID }).FirstOrDefault();
			else if(movieID > 0)
				return Database.Query("SELECT * FROM MovieWatch WHERE movieID = @movieID", new object[]{ movieID });
			else if(userID > 0)
				return Database.Query("SELECT * FROM MovieWatch WHERE userID = @userID", new object[]{ userID });
			else
				return Database.Query("SELECT * FROM MovieWatch");
		}
		
		// GET api/moviewatch/{id}
		[HttpGet("{id}")]
		public object Get(int id) =>
			Database.Query("SELECT * FROM MovieWatch WHERE id = @id", new object[]{ id }).FirstOrDefault();
		
		// PUT api/moviewatch/{id} { title, userID }
		[HttpPut("{id}")]
		public object Update(int id, [FromBody]MovieWatch movieWatchEntry) =>
			Database.Query("UPDATE MovieWatch SET rating = @rating WHERE id = @id", new object[]{ movieWatchEntry.rating, id });

		// POST api/moviewatch { userID, movieID, rating? }
		[HttpPost]
		public object Create([FromBody]MovieWatch movieWatchEntry)
		{
			Database.Query("INSERT INTO MovieWatch (userID, movieID, rating) VALUES (@userID, @movieID, @rating)", new object[]{ movieWatchEntry.userID, movieWatchEntry.movieID, movieWatchEntry.rating });
			return Database.Query("SELECT * FROM MovieWatch WHERE id = LAST_INSERT_ID()");
		}
		
		// DELETE api/moviewatch/{id}
		[HttpDelete("{id}")]
		public object Delete(int id) =>
			Database.Query("DELETE FROM MovieWatch WHERE id = @id", new object[]{ id });
		
		// DELETE api/moviewatch { userID, movieID }
		[HttpDelete]
		public object Delete([FromBody]MovieWatch movieWatchEntry) =>
			Database.Query("DELETE FROM MovieWatch WHERE userID = @userID AND movieID = @movieID", new object[]{ movieWatchEntry.userID, movieWatchEntry.movieID });
	}
}

public class MovieWatch
{
    public int id { get; set; }
    public int userID { get; set; }
    public int movieID { get; set; }
    public int? rating { get; set; }
}