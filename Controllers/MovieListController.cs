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
	public class MovieListController : Controller
	{
		private readonly NextFlickMySQL Database;
		
		public MovieListController(NextFlickMySQL Database)
		{
			this.Database = Database;
		}
		
		// GET api/movielist?user={user}
		[HttpGet]
		public object Get(int user) => user > 0
			? Database.Query($"SELECT * FROM MovieList WHERE userID = {user}")
			: Database.Query($"SELECT * FROM MovieList");
		
		// GET api/movielist/{id}?user={user}
		[HttpGet("{id}")]
		public object Get(int id, int user) => user > 0
			? Database.Query($"SELECT * FROM MovieList WHERE id = {id}, userID = {user}")
			: Database.Query($"SELECT * FROM MovieList WHERE id = {id}");
			
			// Database.Query(
			// 	"SELECT * FROM MovieList ml WHERE userID = " + userID +
			// 	"UNION" +
			// 	"SELECT * FROM MovieListEntry WHERE movieListID = ml.id"
			// );
			
			// Database.Query("SELECT * FROM MovieList WHERE userID = @userID;", new Dictionary<string, object>(){
			//     {"userID", userID}
			// });

		// POST api/movielist
		[HttpPost]
		public void Post([FromBody]string title, [FromBody]int userID)
		{
			Database.Query($"INSERT INTO MovieList (title, userID) VALUES ({title}, {userID})");
		}

		// PUT api/movielist/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]string title, [FromBody]int userID)
		{
			Database.Query($"UPDATE MovieList SET title = {title}, userID = {userID} WHERE id = {id}");
		}

		// DELETE api/movielist/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			Database.Query($"DELETE FROM MovieList WHERE id = {id}");
		}
	}
}