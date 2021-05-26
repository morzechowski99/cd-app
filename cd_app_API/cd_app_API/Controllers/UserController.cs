using AutoMapper;
using cd_app_API.Data;
using cd_app_API.DTOs;
using cd_app_API.Interfaces;
using cd_app_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cd_app_API.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAuthService _auth;
        

        public UserController(ApplicationDbContext context, IMapper mapper, IAuthService auth)
        {
            _context = context;
            _mapper = mapper;
            _auth = auth;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegistrationDto registrationDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                if (await checkMail(registrationDto.Email))
                    return BadRequest("emailAlreadyExists");
                
                if (await checkLogin(registrationDto.Login))
                    return BadRequest("loginAlreadyExists");

                AppUser user = _mapper.Map<AppUser>(registrationDto);
                user.VerificationToken = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
                user.PasswordHashed = _auth.HashPassword(registrationDto.Password);
                _context.Add(user);

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
            }
        }

        private async Task<bool> checkLogin(string login)
        {
            var user = await _context.Users.Where(user => user.Login == login).FirstOrDefaultAsync();
            return user == null ? false : true;
        }

        private async Task<bool> checkMail(string mail)
        {
            var user = await _context.Users.Where(user => user.Email == mail).FirstOrDefaultAsync();
            return user == null ? false : true;
        }
    }
}
