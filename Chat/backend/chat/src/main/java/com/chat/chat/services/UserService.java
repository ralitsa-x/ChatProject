package com.chat.chat.services;

import com.chat.chat.dtos.UserDto;
import com.chat.chat.entities.User;
import com.chat.chat.repositories.UserRepository;
import lombok.*;
import org.springframework.stereotype.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;


    public UserDto createUser(User user){
        if(userRepository.findByEmail(user.getEmail()) != null){
            throw new IllegalArgumentException("Email already exists");
        }
        user.setIsActive(true);
        user.setUsername(user.getEmail());
        user.setCreatedTime(LocalDateTime.now());
        user.setLastModifiedTime(LocalDateTime.now());
        this.userRepository.save(user);

        return getUserDto(user);
    }
    public UserDto findByEmail(String email){
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new IllegalArgumentException("Email not found");
        }
        return getUserDto(user);
    }
    public UserDto findByEmailAndPassword(String email, String password){
        User user = userRepository.findByEmailAndPassword(email, password);
        if(user == null){
            throw new IllegalArgumentException("Email not found");
        }
        return getUserDto(user);
    }
    public List<UserDto> findUser(String email){
        List<UserDto> result = new ArrayList<>();

        if (email != null && !email.isEmpty()) {
            List<User> users = userRepository.findByEmailContaining(email);


            for(User user : users){
                result.add(getUserDto(user));
            }
        } else {
            List<User> users = userRepository.findAll();
            for(User user : users){
                result.add(getUserDto(user));
            }

        }
        return result;
    }

    public UserDto getUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setIsActive(user.getIsActive());
        return userDto;
    }

}
