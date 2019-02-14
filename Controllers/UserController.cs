using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace nextflick.Controllers
{
	[Route("api/[controller]")]
	public class UserController : Controller
	{
		private readonly NextFlickMySQL Database;
		
		public UserController(NextFlickMySQL Database)
		{
			this.Database = Database;
		}
		
		// GET api/user
		[HttpGet]
		public object List() =>
			Database.Query("SELECT * FROM User");
		
		// GET api/user/{id}
		[HttpGet("{id}")]
		public object Get(int id) =>
			Database.Query("SELECT * FROM User WHERE id = " + id).FirstOrDefault();

		// POST api/user { name }
		[HttpPost]
		public object Create([FromBody]User user) =>
			Database.Query("INSERT INTO User (name) VALUES (@name)", new object[]{ user.name });

		// PUT api/user/{id} { title, userID }
		[HttpPut("{id}")]
		public object Put(int id, [FromBody]User user) =>
			Database.Query("UPDATE User SET name = @name WHERE id = @id", new object[]{ user.name, id });

		// DELETE api/user/{id}
		[HttpDelete("{id}")]
		public void Delete(int id) =>
			Database.Query("DELETE FROM User WHERE id = @id", new object[]{ id });
	}
}

public class User
{
    public int id { get; set; }
    public string name { get; set; }
}