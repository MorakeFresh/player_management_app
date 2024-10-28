package com.java.player.management.dao.implementations;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.java.player.management.dao.interfaces.PositionDao;
import com.java.player.management.db.connection.DbConnection;
import com.java.player.management.entities.Position;
import com.java.player.management.entities.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class PositionDaoImplementation implements PositionDao {

    private final Connection connection;
    private final Logger logger = LoggerFactory.getLogger(PositionDaoImplementation.class);
    private ResultSet rs;

    public PositionDaoImplementation() throws SQLException {
        this.connection = DbConnection.getConnection();
    }

    @Override
    public Position getPositionByName(String name) throws SQLException {
        String query = "SELECT * FROM positions WHERE name = ?";
        Position position = null;
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, name);
            rs = ps.executeQuery();
            if (rs.next()) {
                position = extractPositionFromResultSet(rs);
            }
        } catch (SQLException e) {
            logger.error("Error fetching position by name", e);
            throw e;
        }
        return position;
    }

    @Override
    public List<Position> getAllPositions() throws SQLException {
        String query = "SELECT * FROM positions";
        List<Position> positions = new ArrayList<>();
        try (Statement stmt = connection.createStatement()) {
            rs = stmt.executeQuery(query);
            while (rs.next()) {
                positions.add(extractPositionFromResultSet(rs));
            }
        } catch (SQLException e) {
            logger.error("Error fetching all positions", e);
            throw e;
        }
        return positions;
    }

    @Override
    public boolean addPosition(Position position) throws SQLException {
        String query = "INSERT INTO positions (name, description) VALUES (?, ?)";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, position.getName());
            ps.setString(2, position.getDescription());
            int rowsInserted = ps.executeUpdate();
            return rowsInserted > 0;
        } catch (SQLException e) {
            logger.error("Error adding position", e);
            throw e;
        }
    }

    @Override
    public boolean updatePosition(Position position) throws SQLException {
        String query = "UPDATE positions SET description = ? WHERE name = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, position.getDescription());
            ps.setString(2, position.getName());
            int rowsUpdated = ps.executeUpdate();
            return rowsUpdated > 0;
        } catch (SQLException e) {
            logger.error("Error updating position", e);
            throw e;
        }
    }

    @Override
    public boolean deletePosition(String name) throws SQLException {
        String query = "DELETE FROM positions WHERE name = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, name);
            int rowsDeleted = ps.executeUpdate();
            return rowsDeleted > 0;
        } catch (SQLException e) {
            logger.error("Error deleting position", e);
            throw e;
        }
    }

    private Position extractPositionFromResultSet(ResultSet rs) throws SQLException {
        String name = rs.getString("name");
        String description = rs.getString("description");
        List<Role> roles = new ArrayList<>();
        return new Position(name, description, roles);
    }
}

