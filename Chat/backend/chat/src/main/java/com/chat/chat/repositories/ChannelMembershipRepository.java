package com.chat.chat.repositories;

import com.chat.chat.entities.ChannelMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChannelMembershipRepository extends JpaRepository<ChannelMembership, Integer> {
    @Query("SELECT cm FROM ChannelMembership cm WHERE cm.user.id = :userId")
    List<ChannelMembership> findByUserId(Integer userId);
    @Query("SELECT cm FROM ChannelMembership cm WHERE cm.user.id = :userId AND cm.role.id = :roleId AND cm.channel.id = :channelId")
    ChannelMembership findByChannelIdAndUserIdAndRoleId(Integer channelId, Integer userId, Integer roleId);
    boolean existsByChannelIdAndUserIdAndRoleId(Integer channelId, Integer userId, Integer roleId);
    boolean existsByChannelIdAndUserId(Integer channelId, Integer userId);
    List<ChannelMembership> findByChannelId(Integer channelId);
}
