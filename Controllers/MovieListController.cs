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
			? Database.Query("SELECT * FROM MovieList")
			: Database.Query("SELECT * FROM MovieList WHERE userID = @user", new object[]{ user });
		
		// GET api/movielist/{id}
		// GET api/movielist/{id}?user={user}
		[HttpGet("{id}")]
		public object Get(int id, int user = 0) => user == 0
			? Database.Query("SELECT * FROM MovieList WHERE id = @id", new object[]{ id }).FirstOrDefault()
			: Database.Query("SELECT * FROM MovieList WHERE id = @id, userID = @user", new object[]{ user }).FirstOrDefault();

		// POST api/movielist { title, userID }
		[HttpPost]
		public object Create([FromBody]MovieList movieList)
		{
			Database.Query("INSERT INTO MovieList (title, userID) VALUES (@title, @userID)", new object[]{ movieList.title, movieList.userID });
			return Database.Query("SELECT * FROM MovieList WHERE id = LAST_INSERT_ID()").FirstOrDefault();
		}

		// PUT api/movielist/{id} { title }
		[HttpPut("{id}")]
		public object Update(int id, [FromBody]MovieList movieList) =>
			Database.Query("UPDATE MovieList SET title = @title WHERE id = @id", new object[]{ movieList.title, id });

		// DELETE api/movielist/{id}
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			Database.Query("DELETE FROM MovieList WHERE id = @id", new object[]{ id });
			// Database.Query($"DELETE FROM MovieList WHERE id = {id} JOIN MovieListEntry WHERE MovieList.id = MovieListEntry.movieListID");
			// DELETE FROM MovieList movieList WHERE id = 1 INNERJOIN MovieListEntry entry WHERE movieList.id = entry.movieListID
		}
	}
}

public class MovieList
{
    public int id { get; set; }
    public string title { get; set; }
    public int userID { get; set; }
}
