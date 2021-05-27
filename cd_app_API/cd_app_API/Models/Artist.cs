using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cd_app_API.Models
{
    public class Artist
    {
        public Artist()
        {
            AlbumArtists = new HashSet<AlbumArtist>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Gender { get; set; }
        public string MusicCategory { get; set; }
        public virtual ICollection<AlbumArtist> AlbumArtists { get; set; }
    }
}
