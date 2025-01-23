package com.chat.chat.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FriendshipDto {
    private int id;
    private UserDto currentUser;
    private UserDto otherUser;
}
