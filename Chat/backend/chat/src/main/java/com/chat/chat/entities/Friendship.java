package com.chat.chat.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tc_friendships")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "current_user_id", nullable = false)
    private User currentUser;

    @ManyToOne
    @JoinColumn(name = "other_user_id", nullable = false)
    private User otherUser;

    public Friendship(User currentUser, User otherUser) {
        this.currentUser = currentUser;
        this.otherUser = otherUser;
    }
}
