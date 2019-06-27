using System;
using webapp.Interfaces;
using webapp.Modals;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json;

namespace webapp.Implementations
{
    public class TokenAuthenticationService : IAuthenticateService
    {
        private readonly IUserManagementService _userManagementService;
        private readonly TokenManagement _tokenManagement;
        public TokenAuthenticationService(IUserManagementService service, IOptions<TokenManagement> tokenManagement)
        {
            _userManagementService = service;
            _tokenManagement = tokenManagement.Value;
        }
        public bool IsAuthenticated(TokenRequest request, out string token)
        {

            token = string.Empty;
            if (!_userManagementService.IsValidUser(request.Username, request.Password)) return false;

            var user = new UserInfo()
            {
                Name = "Ram Sapkota",
                UserName = request.Username,
                Title = "Software Engineer"
            };
            var userJson = JsonConvert.SerializeObject(user);
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_tokenManagement.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name,userJson)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            token = tokenHandler.WriteToken(securityToken);

            //var claim = new[]
            //{
            //    new Claim(ClaimTypes.UserData, JsonConvert.SerializeObject(user)),
            //    new Claim(ClaimTypes.Role, "Admin"),

            //};
            //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenManagement.Secret));
            //var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //var jwtToken = new JwtSecurityToken(
            //    _tokenManagement.Issuer,
            //    _tokenManagement.Audience,

            //    claim,
            //    expires: DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration),
            //    signingCredentials: credentials
            //);
            //token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return true;

        }

    }
}
