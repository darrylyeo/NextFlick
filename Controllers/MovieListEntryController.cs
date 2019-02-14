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
		
		// GET api/movielistentry?movieListID={movieListID}
		[HttpGet()]
		public object List(int movieListID) =>
			Database.Query("SELECT * FROM MovieListEntry WHERE movieListID = @movieListID", new object[]{ movieListID });
		
		// GET api/movielistentry/{id}
		[HttpGet("{id}")]
		public object Get(int id) =>
			Database.Query("SELECT * FROM MovieListEntry WHERE id = @id", new object[]{ id }).FirstOrDefault();

		// POST api/movielistentry { movieListID, movieID }
		[HttpPost]
		public object Create([FromBody]MovieListEntry movieListEntry) =>
			Database.Query("INSERT INTO MovieListEntry (movieListID, movieID) VALUES (@movieListID, @movieID)", new object[]{ movieListEntry.movieListID, movieListEntry.movieID });

		// PUT api/movielistentry/{id} { movieListID }
		// [HttpPut]
		// public void Update(int id, [FromBody]int movieListID)
		// {
		// 	Database.Query($"UPDATE MovieList SET movieListID = movieListID WHERE id = {id})");
		// }
		[HttpPut]
		public object Update(int id, [FromBody]MovieListEntry movieListEntry) =>
			Database.Query("UPDATE MovieListEntry SET movieListID = @movieListID WHERE id = @id)", new object[]{ movieListEntry.movieListID, movieListEntry.id });
			// return new HttpResponseMessage(HttpStMovieListEntryatusCode.NotModified);
		    // return request.CreateResponse(HttpStatusCode.OK, user);

		// DELETE api/movielistentry/{id}
		[HttpDelete("{id}")]
		public object Delete(int id) =>
			Database.Query("DELETE FROM MovieListEntry WHERE id = @id", new object[]{ id });
	}
}

public class MovieListEntry
{
    public int id { get; set; }
    public int movieListID { get; set; }
    public int movieID { get; set; }
}