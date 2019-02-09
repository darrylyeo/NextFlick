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
		public object Get()
		{
			return Database.Query("SELECT * FROM User");
		}
		
		// GET api/user/{userID}
		[HttpGet("{userID}")]
		public object Get(int userID)
		{
			return Database.Query("SELECT * FROM User WHERE userID = " + userID);
			// return Database.Query("SELECT * FROM User WHERE userID = @userID;", new Dictionary<string, object>(){
			//     {"userID", userID}
			// });
		}

		// POST api/user
		[HttpPost]
		public void Post([FromBody]string value)
		{
			//return Database.Query("INSERT INTO User WHERE userID = " + userID);
		}

		// PUT api/user/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody]string value)
		{
		}

		// DELETE api/user/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}