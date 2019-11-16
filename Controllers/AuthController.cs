using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using restaurant_order.Models;

interface ILoginResponse {
    bool success { get; set; }
}

public interface loginValue {
    string login { get; set; }
    string password { get; set; }
}

namespace restaurant_order.Controllers {
    [Route ("api/[controller]")]
    public class AuthController : Controller {
        UserContext _ctx;
        public AuthController (UserContext ctx) {
            _ctx = ctx;
        }

        [HttpPost ("[action]")]
        public loginResponse login (loginValue body) {
            User findUser = _ctx.Users.SingleOrDefault (user => user.login == body.login && user.password == body.password);
            if (findUser) {
                return new loginResponse {
                    success = true
                };
            } else {
                return new loginResponse {
                    success = false
                };
            }
        }

        public class loginResponse : ILoginResponse {
            public bool success { get; set; }
        }

    }
}