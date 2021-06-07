using AutoMapper;
using cd_app_API.Data;
using cd_app_API.DTOs;
using cd_app_API.Models;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
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
                    if (artist.AlbumArtists.Count == 0)
                        artistDto.Deletable = true;
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


        [HttpDelete]
        public async Task<IActionResult> DeleteArtist(int? id)
        {
            try
            {
                if (id == null)
                    return BadRequest();

                var artist = await _context.Artists
                    .Include(a => a.AlbumArtists)
                    .Where(a => a.Id == id)
                    .FirstOrDefaultAsync();

                if (artist == null)
                    return NotFound();

                if (artist.AlbumArtists.Count > 0)
                    return BadRequest("Artist have albums");

                _context.Remove(artist);

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateArtistDto artistDto)
        {
            try
            {
                if (artistDto == null)
                    return BadRequest();

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var artistDb = _mapper.Map<Artist>(artistDto);

                _context.Add(artistDb);

                await _context.SaveChangesAsync();

                return Ok();

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditAlbum(int? id, CreateArtistDto artistDto)
        {
            try
            {
                if (artistDto == null || id == null)
                    return BadRequest();

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var artistDb = await _context.Artists
                    .Where(a => a.Id == id)
                    .FirstOrDefaultAsync();

                artistDb = _mapper.Map(artistDto, artistDb);

                _context.Update(artistDb);

                await _context.SaveChangesAsync();

                return Ok();

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
