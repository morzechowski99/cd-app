﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cd_app_API.Models
{
    public class AlbumArtist
    {
        public int Id { get; set; }
        public int ArtistId { get; set; }
        public int AlbumId { get; set; }
        public virtual Artist Artist { get; set; }
        public virtual Album Album { get; set; }
    }
}
