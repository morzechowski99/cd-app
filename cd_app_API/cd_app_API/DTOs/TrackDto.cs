using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cd_app_API.DTOs
{
    public class TrackDto
    {
        public int Id { get; set; }
        public int AlbumId { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public string Duration { get; set; }
        public AlbumDto Album { get; set; }
    }
}
