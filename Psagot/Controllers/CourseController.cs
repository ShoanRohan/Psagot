using BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private ICourseBL _courseBL;

        public CourseController(ICourseBL courseBL)
        {
            _courseBL = courseBL;
        }

        // GET: api/<CourseController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CourseController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CourseController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CourseController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CourseController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteCourse([FromBody]int id) 
        {
            try
            {
                bool isDelete = await _courseBL.DeleteCourse(id);
                return isDelete;
            }
            catch (Exception ex) { return StatusCode(500, ex.Message); }
        }
    }
}
