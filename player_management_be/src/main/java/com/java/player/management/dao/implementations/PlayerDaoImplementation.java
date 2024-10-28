package com.java.player.management.dao.implementations;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.java.player.management.dao.interfaces.PlayerDao;
import com.java.player.management.db.connection.DbConnection;
import com.java.player.management.entities.Player;
import com.java.player.management.entities.Position;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class PlayerDaoImplementation implements PlayerDao {

    private final Connection connection;
    private final Logger logger = LoggerFactory.getLogger(PlayerDaoImplementation.class);
    private ResultSet rs;

    public PlayerDaoImplementation() throws SQLException {
        this.connection = DbConnection.getConnection();
    }

    @Override
    public Player getPlayerById(int id) throws SQLException {
        String query = "SELECT * FROM players WHERE id = ?";
        Player player = null;
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, id);
            rs = ps.executeQuery();
            if (rs.next()) {
                player = extractPlayerFromResultSet(rs);
            }
        } catch (SQLException e) {
            logger.error("Error fetching player by ID", e);
            throw e;
        }
        return player;
    }

    @Override
    public List<Player> getAllPlayers() throws SQLException {
        String query = "SELECT * FROM players";
        List<Player> players = new ArrayList<>();
        try (Statement stmt = connection.createStatement()) {
            rs = stmt.executeQuery(query);
            while (rs.next()) {
                players.add(extractPlayerFromResultSet(rs));
            }
        } catch (SQLException e) {
            logger.error("Error fetching all players", e);
            throw e;
        }
        return players;
    }

    @Override
    public boolean addPlayer(Player player) throws SQLException {
        String query = "INSERT INTO players (id, name, shirt_number) VALUES (?, ?, ?)";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, player.getId());
            ps.setString(2, player.getName());
            ps.setInt(3, player.getShirtNumber());
            int rowsInserted = ps.executeUpdate();
            return rowsInserted > 0;
        } catch (SQLException e) {
            logger.error("Error adding player", e);
            throw e;
        }
    }

    @Override
    public boolean updatePlayer(Player player) throws SQLException {
        String query = "UPDATE players SET name = ?, shirt_number = ? WHERE id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, player.getName());
            ps.setInt(2, player.getShirtNumber());
            ps.setInt(3, player.getId());
            int rowsUpdated = ps.executeUpdate();
            return rowsUpdated > 0;
        } catch (SQLException e) {
            logger.error("Error updating player", e);
            throw e;
        }
    }

    @Override
    public boolean deletePlayer(int id) throws SQLException {
        String query = "DELETE FROM players WHERE id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, id);
            int rowsDeleted = ps.executeUpdate();
            return rowsDeleted > 0;
        } catch (SQLException e) {
            logger.error("Error deleting player", e);
            throw e;
        }
    }

    private Player extractPlayerFromResultSet(ResultSet rs) throws SQLException {
        int id = rs.getInt("id");
        String name = rs.getString("name");
        int shirtNumber = rs.getInt("shirt_number");
        List<Position> positions = new ArrayList<>();
        return new Player(id, name, shirtNumber, positions);
    }
}

