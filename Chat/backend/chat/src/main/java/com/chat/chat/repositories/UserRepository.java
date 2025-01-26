package com.chat.chat.repositories;

import com.chat.chat.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.isActive = true")
    User findByEmail(String email);
    List<User> findByEmailContaining(String email);

    @Query("SELECT u FROM User u WHERE u.id = :id AND u.isActive = true")
    User findByIdAndIsActive(int id);

    @Query("SELECT u FROM User u WHERE u.email =:email AND u.password =:password AND u.isActive = true ")
    User findByEmailAndPassword(String email, String password);

}
