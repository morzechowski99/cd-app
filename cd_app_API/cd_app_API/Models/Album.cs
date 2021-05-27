using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cd_app_API.Models
{
    public class Album
    {
        public Album()
        {
            Tracks = new HashSet<Track>();
            AlbumArtists = new HashSet<AlbumArtist>();
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Version { get; set; }
        public int Year { get; set; }
        public virtual ICollection<Track> Tracks { get; set; }
        public virtual ICollection<AlbumArtist> AlbumArtists { get; set; }
    }
}
