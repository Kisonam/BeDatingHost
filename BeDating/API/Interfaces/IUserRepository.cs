using System;
using API.DTOs;
using API.Entities;
using API.Helpers;
using AutoMapper;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser?> GetByIdAsync(int id);
    Task<AppUser?> GetUserByUsernameAsynk(string username);
    Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
    Task<MemberDto?> GetMemberAsync(string username);
}
