using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }


        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails{Title="Very Bad"});
        }


        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }


        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "Suru holo");
            ModelState.AddModelError("Problem2", "Sesh holo");

            return ValidationProblem();
        }


        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("Server burned");
        }
    }
}