using AutoMapper;
using cd_app_API.DTOs;
using cd_app_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cd_app_API.Mapper
{
    public class ToDtoProfile : Profile
    {
        public ToDtoProfile()
        {
            CreateMap<Artist, ArtistDto>();
            CreateMap<Album, AlbumDto>();
            CreateMap<Track, TrackDto>();
        }
    }
}
