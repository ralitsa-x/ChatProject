package com.chat.chat.dtos;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private Integer id;
    private String message;
    private UserDto author;
    private Integer authorId;
    private LocalDateTime messageTime;
    private Integer channelId;
}
