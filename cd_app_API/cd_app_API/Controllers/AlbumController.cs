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
    [Route("albums")]
    [Authorize]
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

        [HttpPost]
        public async Task<IActionResult> Create(AlbumCreateDto albumDto)
        {
            try
            {
                if (albumDto == null)
                    return BadRequest();

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var albumDb = _mapper.Map<Album>(albumDto);

                _context.Add(albumDb);

                foreach(var artist in albumDto.ArtistsIds)
                {
                    AlbumArtist albumArtist = new AlbumArtist() { Album = albumDb, ArtistId = artist };
                    _context.Add(albumArtist);
                }

                await _context.SaveChangesAsync();

                return Ok();

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAlbum(int? id)
        {
            try
            {
                if (id == null)
                    return BadRequest();

                var album = await _context.Albums
                    .Include(a => a.AlbumArtists)
                    .Include(a => a.Tracks)
                    .Where(a => a.Id == id)
                    .FirstOrDefaultAsync();

                if (album == null)
                    return NotFound();

                foreach (var albumArtist in album.AlbumArtists)
                {
                    _context.Remove(albumArtist);
                }

                foreach (var track in album.Tracks)
                {
                    _context.Remove(track);
                }

                _context.Remove(album);

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditAlbum(int? id, AlbumEditDto albumDto)
        {
            try
            {
                if (albumDto == null || id ==null)
                    return BadRequest();

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var albumDb = await _context.Albums
                    .Include(a => a.AlbumArtists)
                    .Include(a => a.Tracks)
                    .Where(a => a.Id == id)
                    .FirstOrDefaultAsync();

                albumDb = _mapper.Map(albumDto,albumDb);

                _context.Update(albumDb);

                foreach (var albumArtist in albumDb.AlbumArtists)
                {
                    if(!albumDto.ArtistsIds.Contains(albumArtist.ArtistId))
                    {
                        _context.Remove(albumArtist);
                    }
                }

                foreach (var artist in albumDto.ArtistsIds)
                {
                    if (albumDb.AlbumArtists.FirstOrDefault(aa => aa.ArtistId == artist) == null)
                    {
                        AlbumArtist albumArtist = new AlbumArtist() { Album = albumDb, ArtistId = artist };
                        _context.Add(albumArtist);
                    }
                }

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
