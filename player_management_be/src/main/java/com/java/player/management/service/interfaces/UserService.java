package com.java.player.management.service.interfaces;

import com.java.player.management.entities.User;


public interface UserService {
    User login(String username, String password);
    boolean register(User user);
}

