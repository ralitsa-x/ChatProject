package com.chat.chat.repositories;

import com.chat.chat.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.email = :email")
    User findByEmail(String email);
    List<User> findByEmailContaining(String email);

    @Query("SELECT u FROM User u WHERE u.id = :id AND u.isActive = true")
    User findByIdAndIsActive(int id);
}
