using AutoMapper;
using cd_app_API.Data;
using cd_app_API.DTOs;
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
    [Route("albums")]
    public class AlbumController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public AlbumController(IMapper mapper, ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAlbums()
        {
            try
            {
                var albums = await _context.Albums
                    .Include(a => a.Tracks)
                    .Include(a => a.AlbumArtists)
                    .ThenInclude(aa => aa.Artist)
                    .ToListAsync();

                List<AlbumDto> albumDtos= new List<AlbumDto>();

                foreach(var album in albums)
                {
                    var albumDto = _mapper.Map<AlbumDto>(album);
                    albumDto.Artists = new List<ArtistDto>();
                    foreach(var albumArtist in album.AlbumArtists)
                    {
                        var artist = _mapper.Map<ArtistDto>(albumArtist.Artist);
                        albumDto.Artists.Add(artist);
                    }
                    albumDtos.Add(albumDto);
                }

                return Ok(albumDtos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
