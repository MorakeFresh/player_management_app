package com.java.player.management.controller;

import com.java.player.management.entities.User;
import com.java.player.management.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user/login")
    public User login(@RequestBody User loginRequest) {
        return userService.login(loginRequest.getUsername(), loginRequest.getPassword());
    }

    @PostMapping("/user/register")
    public boolean register(@RequestBody User user) {
        return userService.register(user);
    }
}
