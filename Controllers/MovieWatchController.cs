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
		// GET api/moviewatch?user={user}
		[HttpGet]
		public object List(int user) => user == 0
			? Database.Query($"SELECT * FROM MovieWatch")
			: Database.Query($"SELECT * FROM MovieWatch WHERE userID = {user}");
		
		// GET api/moviewatch/{id}
		[HttpGet("{id}")]
		public object Get(int id) =>
			Database.Query($"SELECT * FROM MovieWatch WHERE id = {id}").FirstOrDefault();
		
		// PUT api/moviewatch/{id} { title, userID }
		[HttpPut("{id}")]
		public void Update(int id, [FromBody]int rating)
		{
			Database.Query($"UPDATE MovieWatch SET rating = {rating} WHERE id = {id}");
		}

		// POST api/moviewatch { userID, movieID }
		[HttpPost]
		public void Post([FromBody]int userID, [FromBody]int movieID)
		{
			Database.Query($"INSERT INTO MovieWatch (userID, movieID) VALUES ({userID}, {movieID})");
		}
		
		// POST api/moviewatch { userID, movieID, rating }
		[HttpPost]
		public void Post([FromBody]int userID, [FromBody]int movieID, [FromBody]int rating)
		{
			Database.Query($"INSERT INTO MovieWatch (userID, movieID, rating) VALUES ({userID}, {movieID}, {rating})");
		}
	}
}