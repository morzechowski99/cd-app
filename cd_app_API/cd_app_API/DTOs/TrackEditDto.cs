﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cd_app_API.DTOs
{
    public class TrackEditDto
    {
        
            public int Id { get; set; }
            public string Title { get; set; }
            public int Year { get; set; }
            public string Duration { get; set; }
        
    }
}
