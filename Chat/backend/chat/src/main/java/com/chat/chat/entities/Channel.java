package com.chat.chat.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "td_channels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Channel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_time", nullable = false)
    private LocalDateTime createdTime;

    @Column(name = "last_modified", nullable = false)
    private LocalDateTime lastModifiedTime;

}
