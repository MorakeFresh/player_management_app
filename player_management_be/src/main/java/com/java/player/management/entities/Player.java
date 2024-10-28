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
public class Player {

    private int id;
    private String name;
    private int shirtNumber;
    private List<Position> positions;

    public Player(int id, String name, int shirtNumber, List<Position> positions) {
        this.id = id;
        this.name = name;
        this.shirtNumber = shirtNumber;
        this.positions = positions;
    }

    private Player() {}
}
