package com.java.player.management.dao.interfaces;

import com.java.player.management.entities.User;

import java.sql.SQLException;

public interface UserDao {
    User getUserByUsername(String username) throws SQLException;
    boolean createUser(User user) throws SQLException;
}


