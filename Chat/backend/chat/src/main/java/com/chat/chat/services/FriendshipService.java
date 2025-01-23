package com.chat.chat.services;

import com.chat.chat.dtos.FriendshipDto;
import com.chat.chat.dtos.UserDto;
import com.chat.chat.entities.Channel;
import com.chat.chat.entities.Friendship;
import com.chat.chat.entities.User;
import com.chat.chat.repositories.FriendshipRepository;
import com.chat.chat.repositories.UserRepository;
import lombok.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FriendshipService {
    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    public FriendshipDto addFriendship(Integer currentUserId, Integer otherUserId) {
        if(friendshipRepository.findExistingFriendship(currentUserId,otherUserId) != null) {
            throw new IllegalArgumentException("You are already friend");
        }
        User currentUserEntity = userRepository.findByIdAndIsActive(currentUserId);
        if(currentUserEntity == null) {
            throw new IllegalArgumentException("User not found. Might also be inactive.");
        }
        User otherUserEntity = userRepository.findByIdAndIsActive(otherUserId);
        if(otherUserEntity == null) {
            throw new IllegalArgumentException("User not found. Might also be inactive.");
        }


        var result = new Friendship(currentUserEntity,otherUserEntity);
        friendshipRepository.save(result);

        return createFriendshipDtoFromFriendship(result);

    }
    public FriendshipDto createFriendshipDtoFromFriendship(Friendship friendship) {
        return new FriendshipDto(
                friendship.getId(),
                new UserDto(
                        friendship.getCurrentUser().getId(),
                        friendship.getCurrentUser().getEmail(),
                        friendship.getCurrentUser().getIsActive()
                ),
                new UserDto(
                        friendship.getOtherUser().getId(),
                        friendship.getOtherUser().getEmail(),
                        friendship.getOtherUser().getIsActive()
                )
        );
    }
}
