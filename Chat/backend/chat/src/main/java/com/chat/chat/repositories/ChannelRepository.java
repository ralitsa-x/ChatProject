package com.chat.chat.repositories;

import com.chat.chat.entities.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ChannelRepository extends JpaRepository<Channel, Integer> {
    @Query("SELECT c FROM Channel c WHERE c.id=:id")
    Channel findChannelById(int id);
}
