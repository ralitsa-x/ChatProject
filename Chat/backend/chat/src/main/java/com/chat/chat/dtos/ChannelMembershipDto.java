package com.chat.chat.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChannelMembershipDto {
    private ChannelDto channel;
    private UserDto user;
    private RoleDto role;
}
