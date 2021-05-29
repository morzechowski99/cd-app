using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cd_app_API.DTOs
{
    public class AlbumEditDto
    {
        public string Title { get; set; }
        public string Version { get; set; }
        public int Year { get; set; }
        public List<TrackEditDto> Tracks { get; set; }
        public List<int> ArtistsIds { get; set; }
    }
}
