package com.chat.chat.controllers;

import com.chat.chat.dtos.ChannelDto;
import com.chat.chat.http.AppResponse;
import com.chat.chat.services.ChannelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class ChannelController {
    private final ChannelService channelService;

    @PostMapping("/channels")
    public ResponseEntity<?> createChannel(@RequestParam Integer userId, @RequestBody ChannelDto channelRequest) {
        try {
            var result = channelService.createChannel(userId, channelRequest);
            return AppResponse.success()
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
    @GetMapping("/users/{userId}/channels")
    public ResponseEntity<?> getUserChannels(@PathVariable Integer userId) {
        try {
            var channels = channelService.getAllUserChannels(userId);
            return AppResponse.success()
                    .withMessage("Channels found!")
                    .withData(channels)
                    .withCode(HttpStatus.OK)
                    .build();
        } catch (Exception e) {
            return AppResponse.error()
                    .withMessage(e.getMessage())
                    .withCode(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }
    @PutMapping("/channels")
    public ResponseEntity<?> renameChannel(@RequestParam Integer userId, @RequestBody ChannelDto channel){
        try{
            channelService.renameChannel(userId,channel.getId(),channel.getName());
            return AppResponse.success()
                    .withMessage("Channel name updated to " + channel.getName())
                    .withCode(HttpStatus.OK)
                    .build();
        } catch (Exception e) {
            return AppResponse.error()
                    .withMessage(e.getMessage())
                    .withCode(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }
    @DeleteMapping("/channels/{id}")
    public ResponseEntity<?> deactivateChannel(@PathVariable Integer id, @RequestParam Integer userId){
        try {
            channelService.deactivateChannel(userId, id);
            return AppResponse.success()
                    .withMessage("Channel deleted!")
                    .withCode(HttpStatus.OK)
                    .build();
        } catch (Exception e) {
            return AppResponse.error()
                    .withMessage(e.getMessage())
                    .withCode(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }
    @PostMapping("/channels/{id}/add")
    public ResponseEntity<?> addGuestToChannel(@PathVariable Integer id, @RequestParam Integer userId, @RequestParam Integer otherUserId) {
        try {
            channelService.addUserToChannel(userId, id, otherUserId);
            return AppResponse.success()
                    .withMessage("User with role 'GUEST' is added to channel!")
                    .withCode(HttpStatus.CREATED)
                    .build();
        } catch (Exception e) {
            return AppResponse.error()
                    .withMessage(e.getMessage())
                    .withCode(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }
    @DeleteMapping("/channels/{id}/remove")
    public ResponseEntity<?> removeUserFromChannel(@PathVariable Integer id, @RequestParam Integer userId, @RequestParam Integer otherUserId) {
        try{
            channelService.removeUserFromChannel(userId, id, otherUserId);
            return AppResponse.success()
                    .withMessage("User is removed from the channel")
                    .withCode(HttpStatus.OK)
                    .build();
        } catch (Exception e){
            return AppResponse.error()
                    .withMessage(e.getMessage())
                    .withCode(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }
    @GetMapping("/channels/{id}/members")
    public ResponseEntity<?> getMembersForChannel(@PathVariable Integer id) {
        try {
            var members = channelService.getMembersForChannel(id);
            return AppResponse.success()
                    .withMessage("Members fetched successfully")
                    .withData(members)
                    .withCode(HttpStatus.OK)
                    .build();
        } catch (Exception e) {
            return AppResponse.error()
                    .withMessage(e.getMessage())
                    .withCode(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }
    @PostMapping("/channels/{id}/make-admin")
    public ResponseEntity<?> giveAdminRights(@PathVariable Integer id, @RequestParam Integer ownerId, @RequestParam Integer otherUserId) {
        try {
            channelService.giveUserAdminRights(ownerId, id, otherUserId);
            return AppResponse.success()
                    .withMessage("User now has ADMIN rights!")
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
