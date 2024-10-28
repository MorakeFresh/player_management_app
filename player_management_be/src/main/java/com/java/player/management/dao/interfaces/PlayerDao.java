package com.java.player.management.dao.interfaces;

import com.java.player.management.entities.Player;

import java.sql.SQLException;
import java.util.List;

public interface PlayerDao {
    Player getPlayerById(int id) throws SQLException;
    List<Player> getAllPlayers() throws SQLException;
    boolean addPlayer(Player player) throws SQLException;
    boolean updatePlayer(Player player) throws SQLException;
    boolean deletePlayer(int id) throws SQLException;
}
