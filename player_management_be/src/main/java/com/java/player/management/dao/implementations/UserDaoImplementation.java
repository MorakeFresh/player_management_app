package com.java.player.management.dao.implementations;

import com.java.player.management.dao.interfaces.UserDao;
import com.java.player.management.db.connection.DbConnection;
import com.java.player.management.entities.User;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class UserDaoImplementation implements UserDao {
    private final Connection connection;

    public UserDaoImplementation() throws SQLException {
        this.connection = DbConnection.getConnection();
    }

    @Override
    public User getUserByUsername(String username) throws SQLException {
        String sql = "SELECT * FROM users WHERE username = ?";
        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return new User(rs.getString("username"),
                        rs.getString("password"),
                        rs.getString("email"));
            }
        }
        return null;
    }

    @Override
    public boolean createUser(User user) throws SQLException {
        String sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            ps.setString(3, user.getEmail());
            return ps.executeUpdate() > 0;
        }
    }
}

