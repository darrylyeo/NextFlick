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
	public class MovieListEntryController : Controller
	{
		private readonly NextFlickMySQL Database;
		
		public MovieListEntryController(NextFlickMySQL Database)
		{
			this.Database = Database;
		}
		
		// GET api/movielistentry/{id}
		[HttpGet("{id}")]
		public object Get(int id) =>
			Database.Query($"SELECT * FROM MovieListEntry WHERE id = {id}");

		// POST api/movielistentry
		[HttpPost]
		public void Post([FromBody]int movieListID, [FromBody]int userID)
		{
			Database.Query($"INSERT INTO MovieListEntry (movieListID, userID) VALUES ({movieListID}, {userID})");
		}

		// DELETE api/movielistentry/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			Database.Query($"DELETE FROM MovieListEntry WHERE id = {id}");
		}
	}
}