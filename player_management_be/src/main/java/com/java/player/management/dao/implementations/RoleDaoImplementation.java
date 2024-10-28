package com.java.player.management.dao.implementations;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.java.player.management.dao.interfaces.RoleDao;
import com.java.player.management.db.connection.DbConnection;
import com.java.player.management.entities.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class RoleDaoImplementation implements RoleDao {

    private final Connection connection;
    private final Logger logger = LoggerFactory.getLogger(RoleDaoImplementation.class);
    private ResultSet rs;

    public RoleDaoImplementation() throws SQLException {
        this.connection = DbConnection.getConnection();
    }

    @Override
    public Role getRoleByName(String name) throws SQLException {
        String query = "SELECT * FROM roles WHERE name = ?";
        Role role = null;
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, name);
            rs = ps.executeQuery();
            if (rs.next()) {
                role = extractRoleFromResultSet(rs);
            }
        } catch (SQLException e) {
            logger.error("Error fetching role by name", e);
            throw e;
        }
        return role;
    }

    @Override
    public List<Role> getAllRoles() throws SQLException {
        String query = "SELECT * FROM roles";
        List<Role> roles = new ArrayList<>();
        try (Statement stmt = connection.createStatement()) {
            rs = stmt.executeQuery(query);
            while (rs.next()) {
                roles.add(extractRoleFromResultSet(rs));
            }
        } catch (SQLException e) {
            logger.error("Error fetching all roles", e);
            throw e;
        }
        return roles;
    }

    @Override
    public boolean addRole(Role role) throws SQLException {
        String query = "INSERT INTO roles (name, description) VALUES (?, ?)";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, role.getName());
            ps.setString(2, role.getDescription());
            int rowsInserted = ps.executeUpdate();
            return rowsInserted > 0;
        } catch (SQLException e) {
            logger.error("Error adding role", e);
            throw e;
        }
    }

    @Override
    public boolean updateRole(Role role) throws SQLException {
        String query = "UPDATE roles SET description = ? WHERE name = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, role.getDescription());
            ps.setString(2, role.getName());
            int rowsUpdated = ps.executeUpdate();
            return rowsUpdated > 0;
        } catch (SQLException e) {
            logger.error("Error updating role", e);
            throw e;
        }
    }

    @Override
    public boolean deleteRole(String name) throws SQLException {
        String query = "DELETE FROM roles WHERE name = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, name);
            int rowsDeleted = ps.executeUpdate();
            return rowsDeleted > 0;
        } catch (SQLException e) {
            logger.error("Error deleting role", e);
            throw e;
        }
    }

    private Role extractRoleFromResultSet(ResultSet rs) throws SQLException {
        String name = rs.getString("name");
        String description = rs.getString("description");
        return new Role(name, description);
    }
}
