package com.java.player.management.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Position {

    private String name;
    private String description;
    private List<Role> roles;

    public Position(String name, String description, List<Role> roles) {
        this.name = name;
        this.description = description;
        this.roles = roles;
    }

    private Position() {}
}
