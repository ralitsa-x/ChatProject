package com.chat.chat.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChannelDto {
    private Integer id;
    private String name;
    private Boolean isActive;
    private RoleDto role;

    public ChannelDto(String name) {
        this.name = name;
    }
}
