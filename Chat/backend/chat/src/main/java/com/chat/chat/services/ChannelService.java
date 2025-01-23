package com.chat.chat.services;

import com.chat.chat.dtos.ChannelDto;
import com.chat.chat.dtos.ChannelMembershipDto;
import com.chat.chat.dtos.RoleDto;
import com.chat.chat.entities.Channel;
import com.chat.chat.entities.ChannelMembership;
import com.chat.chat.entities.Role;
import com.chat.chat.entities.User;
import com.chat.chat.repositories.ChannelMembershipRepository;
import com.chat.chat.repositories.ChannelRepository;
import com.chat.chat.repositories.RoleRepository;
import com.chat.chat.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ChannelService {
    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ChannelMembershipRepository channelMembershipRepository;
    private final UserService userService;


    public ChannelDto createChannel(Integer userId, ChannelDto channelDto) {
        User user = userRepository.findByIdAndIsActive(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found. Might be deactivated as well.");
        }
        var ch = new Channel();
        ch.setName(channelDto.getName());
        ch.setIsActive(true);
        ch.setCreatedTime(LocalDateTime.now());
        ch.setLastModifiedTime(LocalDateTime.now());
        channelRepository.save(ch);

        Role ownerRole = roleRepository.findByRoleName("OWNER");
        if(ownerRole == null) {
            throw new IllegalArgumentException("Role not found");
        }

        var member = new ChannelMembership();
        member.setChannel(ch);
        member.setUser(user);
        member.setRole(ownerRole);
        channelMembershipRepository.save(member);

        return createChannelDtoFromChannel(ch,createRoleDtoFromRole(ownerRole));
    }

    public List<ChannelDto> getAllUserChannels(Integer userId) {
        User user = userRepository.findByIdAndIsActive(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found. Might be deactivated as well.");
        }
        List<ChannelMembership> memberships = channelMembershipRepository.findByUserId(userId);
        List<ChannelDto> result = new ArrayList<>();

        for (ChannelMembership membership : memberships){
            Channel channel = membership.getChannel();
            if (channel.getIsActive()) {
                result.add(createChannelDtoFromChannel(channel,createRoleDtoFromRole(membership.getRole())));
            }
        }

        return result;
    }
    public ChannelDto renameChannel(Integer userId, Integer channelId, String newName) {
        Channel ch = channelRepository.findChannelById(channelId);
        if (ch == null) {
            throw new IllegalArgumentException("Channel not found.");
        }
        Role ownerRole = roleRepository.findByRoleName("OWNER");
        if (ownerRole == null) {
            throw new IllegalArgumentException("Role not found");
        }
        var isOwner = channelMembershipRepository.existsByChannelIdAndUserIdAndRoleId(channelId, userId, ownerRole.getId());
        if (!isOwner) {
            throw new IllegalArgumentException("User is not the owner of this channel.");
        }
        if (newName == null || newName.trim().isEmpty()) {
            throw new IllegalArgumentException("Channel name cannot be empty");
        }

        ch.setName(newName.trim());
        ch.setLastModifiedTime(LocalDateTime.now());
        channelRepository.save(ch);
        return createChannelDtoFromChannel(ch,createRoleDtoFromRole(ownerRole));
    }
    public ChannelDto deactivateChannel(Integer userId, Integer channelId) {
        Channel ch = channelRepository.findChannelById(channelId);
        if (ch == null) {
            throw new IllegalArgumentException("Channel not found.");
        }
        Role ownerRole = roleRepository.findByRoleName("OWNER");
        if (ownerRole == null) {
            throw new IllegalArgumentException("Role not found");
        }
        var isOwner = channelMembershipRepository.existsByChannelIdAndUserIdAndRoleId(channelId, userId, ownerRole.getId());
        if (!isOwner) {
            throw new IllegalArgumentException("User is not the owner of this channel.");
        }
        ch.setIsActive(false);
        ch.setLastModifiedTime(LocalDateTime.now());
        channelRepository.save(ch);
        return createChannelDtoFromChannel(ch,createRoleDtoFromRole(ownerRole));
    }
    public ChannelMembershipDto addUserToChannel(Integer userId, Integer channelId, Integer otherUserId) {
        Channel ch = channelRepository.findChannelById(channelId);
        if (ch == null) {
            throw new IllegalArgumentException("Channel not found.");
        }
        Role ownerRole = roleRepository.findByRoleName("OWNER");
        if (ownerRole == null) {
            throw new IllegalArgumentException("Role 'OWNER' not found");
        }
        Role adminRole = roleRepository.findByRoleName("ADMIN");
        if (adminRole == null) {
            throw new IllegalArgumentException("Role 'ADMIN' not found");
        }
        var hasOwnerRights = channelMembershipRepository.existsByChannelIdAndUserIdAndRoleId(channelId, userId, ownerRole.getId());
        var hasAdminRights = channelMembershipRepository.existsByChannelIdAndUserIdAndRoleId(channelId, userId, adminRole.getId());

        if (!(hasOwnerRights || hasAdminRights)) {
            throw new IllegalArgumentException("Only the channel owner or admin has the permissions to add guests to this channel!");
        }
        User guest = userRepository.findByIdAndIsActive(otherUserId);
        if (guest == null) {
            throw new IllegalArgumentException("User not found. Might also be deactivated.");
        }
        var existingMember = channelMembershipRepository.existsByChannelIdAndUserId(channelId, otherUserId);
        if (existingMember){
            throw new IllegalArgumentException("User is already in this channel.");
        }
        Role guestRole = roleRepository.findByRoleName("GUEST");
        if (guestRole == null) {
            throw new IllegalArgumentException("Role 'GUEST' not found");
        }
        ChannelMembership membership = new ChannelMembership();
        membership.setChannel(ch);
        membership.setUser(guest);
        membership.setRole(guestRole);
        channelMembershipRepository.save(membership);

        return createChannelMembershipDtoFromChannelMembership(membership);
    }
    public void removeUserFromChannel(Integer userId, Integer channelId, Integer otherUserId) {
        var ch = channelRepository.findChannelById(channelId);
        if (ch == null) {
            throw new IllegalArgumentException("Channel not found.");
        }
        Role ownerRole = roleRepository.findByRoleName("OWNER");
        if (ownerRole == null) {
            throw new IllegalArgumentException("Role 'OWNER' not found");
        }
        var isOwner = channelMembershipRepository.existsByChannelIdAndUserIdAndRoleId(channelId, userId, ownerRole.getId());
        if (!isOwner) {
            throw new IllegalArgumentException("User is not the owner of this channel.");
        }
        Role guestRole = roleRepository.findByRoleName("GUEST");
        if (guestRole == null) {
            throw new IllegalArgumentException("Role 'GUEST' not found");
        }
        var guestMember = channelMembershipRepository.existsByChannelIdAndUserIdAndRoleId(channelId, userId, guestRole.getId());
        if (!guestMember) {
            throw new IllegalArgumentException("User is not in this channel or it's not a guest to the channel.");
        }
        ChannelMembership membership = channelMembershipRepository.findByChannelIdAndUserIdAndRoleId(channelId, userId, guestRole.getId());
        channelMembershipRepository.delete(membership);

    }
    public List<ChannelMembershipDto> getMembersForChannel(Integer channelId) {
        Channel ch = channelRepository.findChannelById(channelId);
        if(ch == null){
            throw new IllegalArgumentException("Channel not found.");
        }
        List<ChannelMembership> memberships = channelMembershipRepository.findByChannelId(channelId);
        List<ChannelMembershipDto> result = new ArrayList<>();

        for (ChannelMembership membership : memberships){
            Channel channel = membership.getChannel();
            if (channel.getIsActive()) {
                result.add(createChannelMembershipDtoFromChannelMembership(membership));
            }
        }
        return result;
    }
    public void giveUserAdminRights(Integer ownerId, Integer channelId,Integer otherUserId){
        Channel ch = channelRepository.findChannelById(channelId);
        if (ch == null) {
            throw new IllegalArgumentException("Channel not found.");
        }
        Role ownerRole = roleRepository.findByRoleName("OWNER");
        if (ownerRole == null) {
            throw new IllegalArgumentException("Role 'OWNER' not found");
        }
        boolean isOwner = channelMembershipRepository.existsByChannelIdAndUserIdAndRoleId(channelId, ownerId, ownerRole.getId());
        if (!isOwner) {
            throw new IllegalArgumentException("User is not the owner of this channel and cannot give Admin rights.");
        }
        Role guestRole = roleRepository.findByRoleName("GUEST");
        if (guestRole == null) {
            throw new IllegalArgumentException("Role 'GUEST' not found");
        }
        var existingMembership = channelMembershipRepository.findByChannelIdAndUserIdAndRoleId(channelId, otherUserId, guestRole.getId());

        var isPromotingOwner = channelMembershipRepository.existsByChannelIdAndUserIdAndRoleId(channelId, otherUserId, ownerRole.getId());
        if (isPromotingOwner) {
            throw new IllegalArgumentException("Cannot change the role of OWNER");
        }
        Role adminRole = roleRepository.findByRoleName("ADMIN");
        if (adminRole == null) {
            throw new IllegalArgumentException("Role 'ADMIN' not found");
        }
        existingMembership.setRole(adminRole);
        channelMembershipRepository.save(existingMembership);
    }

    //helpers
    public ChannelDto createChannelDtoFromChannel(Channel channel) {
        ChannelDto channelDto = new ChannelDto();
        channelDto.setId(channel.getId());
        channelDto.setName(channel.getName());
        channelDto.setIsActive(channel.getIsActive());
        return channelDto;
    }

    public ChannelDto createChannelDtoFromChannel(Channel channel, RoleDto roleDto) {
        ChannelDto channelDto = new ChannelDto();
        channelDto.setId(channel.getId());
        channelDto.setName(channel.getName());
        channelDto.setIsActive(channel.getIsActive());
        channelDto.setRole(roleDto);
        return channelDto;
    }
    public RoleDto createRoleDtoFromRole(Role role){
        RoleDto roleDto = new RoleDto();
        roleDto.setId(role.getId());
        roleDto.setRoleName(role.getRoleName());
        return roleDto;
    }
    private ChannelMembershipDto createChannelMembershipDtoFromChannelMembership(ChannelMembership channelMembership) {
        ChannelMembershipDto dto = new ChannelMembershipDto();
        dto.setChannel(createChannelDtoFromChannel(channelMembership.getChannel()));
        dto.setUser(userService.getUserDto(channelMembership.getUser()));
        dto.setRole(createRoleDtoFromRole(channelMembership.getRole()));
        return dto;
    }

}
