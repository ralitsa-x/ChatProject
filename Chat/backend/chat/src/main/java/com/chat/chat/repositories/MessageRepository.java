package com.chat.chat.repositories;

import com.chat.chat.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    @Query("SELECT m from Message m WHERE m.channel.id = :channelId ORDER BY m.messageTime ASC")
    List<Message> findByChannelIdOrderByMessageTimeASC(int channelId);
}
