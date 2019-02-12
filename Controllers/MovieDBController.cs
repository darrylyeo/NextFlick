using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace nextflick.Controllers
{
	[Route("api/[controller]")]
	public class MovieDBController : Controller
	{
		private readonly TheMovieDBAPI Api;
		
		public MovieDBController(TheMovieDBAPI Api)
		{
			this.Api = Api;
		}
		
		// GET api/moviedb?search
		[HttpGet]
		public object Search(string search) =>
			Api.SearchMovie(search);
		
		// GET api/moviedb/{id}
		[HttpGet("{id}")]
		public object Get(int id) =>
			Api.GetMovie(id);
	}
}