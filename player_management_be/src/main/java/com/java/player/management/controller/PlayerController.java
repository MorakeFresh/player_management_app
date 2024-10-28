package com.java.player.management.controller;

import com.java.player.management.entities.Player;
import com.java.player.management.service.interfaces.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/players")
@CrossOrigin
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/player/{id}")
    public Player getPlayerById(@PathVariable int id) throws SQLException {
        return playerService.getPlayerById(id);
    }

    @GetMapping
    public List<Player> getAllPlayers() throws SQLException {
        return playerService.getAllPlayers();
    }

    @PostMapping
    public boolean createPlayer(@RequestBody Player player) throws SQLException {
        return playerService.createPlayer(player);
    }

    @PutMapping("/player")
    public boolean updatePlayer(@RequestBody Player player) throws SQLException {
        return playerService.updatePlayer(player);
    }

    @DeleteMapping("/player/{id}")
    public boolean deletePlayer(@PathVariable int id) throws SQLException {
        return playerService.deletePlayer(id);
    }
}

