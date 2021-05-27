using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cd_app_API.DTOs
{
    public class ArtistDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Gender { get; set; }
        public string MusicCategory { get; set; }
        public List<AlbumDto> Albums { get; set; }
    }
}
