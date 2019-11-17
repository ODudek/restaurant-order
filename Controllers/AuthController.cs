using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using restaurant_order.Models;
using restaurant_order.Services;

namespace restaurant_order.Controllers {
    [Route ("api/[controller]")]
    public class AuthController : Controller {
        private IUserService _userService;
        public AuthController (IUserService userService) {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost ("authenticate")]
        public IActionResult Authenticate ([FromBody] AuthenticateModel model) {
            var user = _userService.Authenticate (model.login, model.password);

            if (user == null)
                return BadRequest (new { message = "Username or password is incorrect" });

            return Ok (user);
        }

    }
}