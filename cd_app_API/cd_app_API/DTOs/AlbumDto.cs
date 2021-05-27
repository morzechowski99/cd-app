using cd_app_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cd_app_API.DTOs
{
    public class AlbumDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Version { get; set; }
        public int Year { get; set; }
        public List<TrackDto> Tracks { get; set; }
        public List<ArtistDto> Artists { get; set; }
    }
}
