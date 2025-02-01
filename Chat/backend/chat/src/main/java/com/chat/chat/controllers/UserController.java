package com.chat.chat.controllers;


import com.chat.chat.entities.User;
import com.chat.chat.http.AppResponse;
import com.chat.chat.services.FriendshipService;
import com.chat.chat.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final FriendshipService friendshipService;

    @PostMapping("/register")
    public ResponseEntity<?> create(@RequestBody User user) {
        try {
            var result = userService.createUser(user);
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
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try{
            var result = userService.findByEmail(user.getEmail());
            return AppResponse.success()
                    .withMessage("logged!")
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
    @GetMapping("/users")
    public ResponseEntity<?> getUsers(@RequestParam(name = "search", required = false) String search) {
        var result = userService.findUser(search);
        return AppResponse.success()
                .withData(result)
                .withCode(HttpStatus.OK)
                .build();
    }
    @PostMapping("/add-friend")
    public ResponseEntity<?> addFriend(@RequestParam Integer currentUserId, @RequestParam Integer otherUserId){
        try{
            var result = friendshipService.addFriendship(currentUserId, otherUserId);
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
    @GetMapping("/friends")
    public ResponseEntity<?> getAllFriendships(@RequestParam Integer id) {
        try{
            var result = friendshipService.getAllFriendships(id);
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
}
