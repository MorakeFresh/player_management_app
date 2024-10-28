package com.java.player.management.service.interfaces;

import com.java.player.management.entities.Player;

import java.sql.SQLException;
import java.util.List;

public interface PlayerService {
    Player getPlayerById(int id) throws SQLException;
    List<Player> getAllPlayers() throws SQLException;
    boolean createPlayer(Player player) throws SQLException;
    boolean updatePlayer(Player player) throws SQLException;
    boolean deletePlayer(int id) throws SQLException;
}