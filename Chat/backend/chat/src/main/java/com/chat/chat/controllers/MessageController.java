package com.chat.chat.controllers;

import com.chat.chat.dtos.MessageDto;
import com.chat.chat.http.AppResponse;
import com.chat.chat.services.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @PostMapping("/messages")
    public ResponseEntity<?> createMessage(@RequestBody MessageDto messageDto) {
        try {
            var result = messageService.createMessage(messageDto);
            return AppResponse.success()
                    .withMessage("Message sent!")
                    .withData(result)
                    .withCode(HttpStatus.CREATED)
                    .build();
        } catch (Exception e) {
            return AppResponse.error()
                    .withMessage(e.getMessage())
                    .withCode(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }
    @GetMapping("/channels/{id}/messages")
    public ResponseEntity<?> getMessages(@PathVariable Integer id) {
        try{
            var result = messageService.getMessagesByChannelId(id);
            return AppResponse.success()
                    .withData(result)
                    .withCode(HttpStatus.OK)
                    .build();
        } catch (Exception e) {
            return AppResponse.error()
                    .withMessage(e.getMessage())
                    .withCode(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }
}
