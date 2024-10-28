package com.java.player.management.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Role {

    private String name;
    private String description;

    public Role(String name, String description) {
        this.name = name;
        this.description = description;
    }

    private Role() {}
}
