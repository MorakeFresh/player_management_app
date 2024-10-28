package com.java.player.management.service.implementations;

import com.java.player.management.dao.interfaces.UserDao;
import com.java.player.management.entities.User;
import com.java.player.management.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public class UserServiceImplementation implements UserService {
    private final UserDao userDao;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImplementation(UserDao userDao, BCryptPasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User login(String username, String password)  throws SQLException {
        User user = userDao.getUserByUsername(username);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    @Override
    public boolean register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        return userDao.createUser(user);
    }
}

