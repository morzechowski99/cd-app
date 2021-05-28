using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cd_app_API.DTOs
{
    public class AlbumCreateDto
    {
        public string Title { get; set; }
        public string Version { get; set; }
        public int Year { get; set; }
        public List<TrackCreateDto> Tracks { get; set; }
        public List<int> ArtistsIds { get; set; }
    }
}
