using AutoMapper;
using cd_app_API.DTOs;
using cd_app_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cd_app_API.Mapper
{
    public class FromDtoProfile : Profile
    {
        public FromDtoProfile()
        {
            CreateMap<RegistrationDto, AppUser>();
            CreateMap<ArtistDto, Artist>();
            CreateMap<AlbumCreateDto, Album>();
            CreateMap<AlbumEditDto, Album>();
            CreateMap<TrackCreateDto, Track>();
            CreateMap<TrackEditDto, Track>();
            CreateMap<CreateArtistDto, Artist>();
        }
    }
}
