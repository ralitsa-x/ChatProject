package com.chat.chat.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "td_roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "role_name", length = 20, unique = true, nullable = false)
    private String roleName;
}
