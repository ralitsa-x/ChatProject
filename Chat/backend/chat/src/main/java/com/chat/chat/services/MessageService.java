package com.chat.chat.services;

import com.chat.chat.dtos.ChannelDto;
import com.chat.chat.dtos.MessageDto;
import com.chat.chat.entities.Channel;
import com.chat.chat.entities.ChannelMembership;
import com.chat.chat.entities.Message;
import com.chat.chat.entities.User;
import com.chat.chat.repositories.ChannelRepository;
import com.chat.chat.repositories.MessageRepository;
import com.chat.chat.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ChannelRepository channelRepository;
    private final UserService userService;

    public MessageDto createMessage(MessageDto messageDto) {
        var channel = channelRepository.findById(messageDto.getChannelId());
        if (channel == null) {
            throw new IllegalArgumentException("Channel not found");
        }
        var user = userRepository.findByIdAndIsActive(messageDto.getAuthorId());
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        Message message = new Message();
        message.setMessage(messageDto.getMessage());
        message.setMessageTime(LocalDateTime.now());
        message.setUser(user);
        message.setChannel(channel.get());
        messageRepository.save(message);

        var result = this.createMessageDtoFromMessage(message);

        return result;
    }

    public List<MessageDto> getMessagesByChannelId(Integer channelId) {
        List<Message> messages = messageRepository.findByChannelIdOrderByMessageTimeASC(channelId);
        List<MessageDto> result = new ArrayList<>();

        for (Message message : messages) {
            result.add(createMessageDtoFromMessage(message));
        }
        return result;
    }

    //helpers
    private MessageDto createMessageDtoFromMessage(Message message) {
        MessageDto messageDto = new MessageDto();
        messageDto.setId(message.getId());
        messageDto.setMessage(message.getMessage());
        messageDto.setMessageTime(message.getMessageTime());
        messageDto.setChannelId(message.getChannel().getId());
        messageDto.setAuthorId(message.getUser().getId());
        messageDto.setAuthor(userService.getUserDto(message.getUser()));
        return messageDto;
    }
}
