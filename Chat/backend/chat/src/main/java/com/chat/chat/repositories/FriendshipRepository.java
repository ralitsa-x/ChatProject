package com.chat.chat.repositories;

import com.chat.chat.entities.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {
    @Query("SELECT f FROM Friendship f WHERE (f.currentUser.id = :userId2 AND f.otherUser.id = :userId1) ")
    Friendship findExistingFriendship(Integer userId1, Integer userId2);
    @Query("SELECT f FROM Friendship f WHERE (f.otherUser.id = :userId OR f.currentUser.id =:userId)")
    List<Friendship> getAllFriendshipsById(Integer userId);
}
