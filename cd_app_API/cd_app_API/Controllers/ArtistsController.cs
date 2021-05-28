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
    [Route("artists")]
    public class ArtistsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public ArtistsController(IMapper mapper, ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetArtists()
        {
            try
            {
                var artists = await _context.Artists
                    .Include(a => a.AlbumArtists)
                    .ThenInclude(aa => aa.Album)
                    .ToListAsync();

                List<ArtistDto> artistDtos = new List<ArtistDto>();

                foreach (var artist in artists)
                {
                    var artistDto = _mapper.Map<ArtistDto>(artist);
                    artistDto.Albums = new List<AlbumDto>();
                    foreach (var albumArtist in artist.AlbumArtists)
                    {
                        var album = _mapper.Map<AlbumDto>(albumArtist.Album);
                        artistDto.Albums.Add(album);
                    }
                    artistDtos.Add(artistDto);
                }

                return Ok(artistDtos);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
