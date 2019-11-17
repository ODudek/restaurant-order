using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using restaurant_order.Entities;
using restaurant_order.Helpers;
using restaurant_order.Models;
public class AuthResponse {
    public string token { get; set; }
    public bool success { get; set; }

}

namespace restaurant_order.Services {
    public interface IUserService {
        AuthResponse Authenticate (string login, string password);
    }

    public class UserService : IUserService {

        private readonly AppSettings _appSettings;
        private readonly UserContext _ctx;
        public UserService (IOptions<AppSettings> appSettings, UserContext ctx) {
            _appSettings = appSettings.Value;
            _ctx = ctx;
        }

        public AuthResponse Authenticate (string login, string password) {
            var user = _ctx.Users.SingleOrDefault (x => x.login == login && x.password == password);

            // return null if user not found
            if (user == null)
                return new AuthResponse {
                    token = "",
                    success = false
                };

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler ();
            var key = Encoding.ASCII.GetBytes (_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity (new Claim[] {
                new Claim (ClaimTypes.Name, user.id.ToString ()),
                }),
                Expires = DateTime.UtcNow.AddDays (7),
                SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken (tokenDescriptor);
            return new AuthResponse {
                token = tokenHandler.WriteToken (token),
                    success = true
            };
        }
    }
}