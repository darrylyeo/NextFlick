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
    public class MovieListController : Controller
    {
        private readonly NextFlickMySQL Database;
        
        public MovieListController(NextFlickMySQL Database)
        {
            this.Database = Database;
        }
        
        // GET api/movielist
        [HttpGet]
        public object Get()
        {
            return Database.Query("SELECT * FROM MovieList");
        }
        
        // GET api/movielist/{user}
        [HttpGet("{user}")]
        public object Get(int userID)
        {
            return Database.Query("SELECT * FROM MovieList WHERE userID = " + userID);
            // return Database.Query("SELECT * FROM MovieList WHERE userID = @userID;", new Dictionary<string, object>(){
            //     {"userID", userID}
            // });
        }

        // POST api/movielist
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/movielist/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/movielist/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}