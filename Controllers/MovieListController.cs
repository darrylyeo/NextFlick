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
		
		// GET api/movielist
		// GET api/movielist?user={user}
		[HttpGet]
		public object List(int user) => user == 0
			? Database.Query($"SELECT * FROM MovieList")
			: Database.Query($"SELECT * FROM MovieList WHERE userID = {user}");
		
		// GET api/movielist/{id}
		// GET api/movielist/{id}?user={user}
		[HttpGet("{id}")]
		public object Get(int id, int user = 0) => user == 0
			? Database.Query($"SELECT * FROM MovieList WHERE id = {id}").FirstOrDefault()
			: Database.Query($"SELECT * FROM MovieList WHERE id = {id}, userID = {user}").FirstOrDefault();
			
			// Database.Query(
			// 	"SELECT * FROM MovieList ml WHERE userID = " + userID +
			// 	"UNION" +
			// 	"SELECT * FROM MovieListEntry WHERE movieListID = ml.id"
			// );
			
			// Database.Query("SELECT * FROM MovieList WHERE userID = @userID;", new Dictionary<string, object>(){
			//     {"userID", userID}
			// });

		// POST api/movielist { title, userID }
		[HttpPost]
		public void Post([FromBody]string title, [FromBody]int userID) =>
			Database.Query($"INSERT INTO MovieList (title, userID) VALUES ({title}, {userID})");
		
		// public HttpResponseMessage Post([FromBody]string title, [FromBody]int userID) =>
		// 	Database.Query($"INSERT INTO MovieList (title, userID) VALUES ({title}, {userID})");
		// 	Request.CreateResponse<Contact>(System.Net.HttpStatusCode.Created, contact)

		// PUT api/movielist/{id} { title, userID }
		[HttpPut("{id}")]
		public void Update(int id, [FromBody]string title, [FromBody]int userID)
		{
			Database.Query($"UPDATE MovieList SET title = {title}, userID = {userID} WHERE id = {id}");
		}

		// DELETE api/movielist/{id}
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			Database.Query($"DELETE FROM MovieList WHERE id = {id}");
		}
	}
}