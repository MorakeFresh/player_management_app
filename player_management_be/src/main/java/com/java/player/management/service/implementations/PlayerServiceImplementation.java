package com.java.player.management.service.implementations;

import java.sql.SQLException;
import java.util.List;

import com.java.player.management.dao.interfaces.PlayerDao;
import com.java.player.management.entities.Player;
import com.java.player.management.service.interfaces.PlayerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerServiceImplementation implements PlayerService {

    private final PlayerDao playerDao;
    private final Logger logger = LoggerFactory.getLogger(PlayerServiceImplementation.class);

    @Autowired
    public PlayerServiceImplementation(PlayerDao playerDao) {
        this.playerDao = playerDao;
    }

    @Override
    public Player getPlayerById(int id) throws SQLException {
        try {
            return playerDao.getPlayerById(id);
        } catch (SQLException e) {
            logger.error("Error getting player by ID: " + id, e);
            throw e;
        }
    }

    @Override
    public List<Player> getAllPlayers() throws SQLException {
        try {
            return playerDao.getAllPlayers();
        } catch (SQLException e) {
            logger.error("Error getting all players", e);
            throw e;
        }
    }

    @Override
    public boolean createPlayer(Player player) throws SQLException {
        try {
            return playerDao.addPlayer(player);
        } catch (SQLException e) {
            logger.error("Error creating player: " + player.getName(), e);
            throw e;
        }
    }

    @Override
    public boolean updatePlayer(Player player) throws SQLException {
        try {
            return playerDao.updatePlayer(player);
        } catch (SQLException e) {
            logger.error("Error updating player: " + player.getName(), e);
            throw e;
        }
    }

    @Override
    public boolean deletePlayer(int id) throws SQLException {
        try {
            return playerDao.deletePlayer(id);
        } catch (SQLException e) {
            logger.error("Error deleting player with ID: " + id, e);
            throw e;
        }
    }
}

