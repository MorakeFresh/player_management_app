package com.java.player.management.controller;

import com.java.player.management.entities.Role;
import com.java.player.management.service.interfaces.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/role/{name}")
    public Role getRoleByName(@PathVariable String name) throws SQLException {
        return roleService.getRoleByName(name);
    }

    @GetMapping
    public List<Role> getAllRoles() throws SQLException {
        return roleService.getAllRoles();
    }

    @PostMapping("/role")
    public boolean createRole(@RequestBody Role role) throws SQLException {
        return roleService.createRole(role);
    }

    @PutMapping("/role")
    public boolean updateRole(@RequestBody Role role) throws SQLException {
        return roleService.updateRole(role);
    }

    @DeleteMapping("/role/{name}")
    public boolean deleteRole(@PathVariable String name) throws SQLException {
        return roleService.deleteRole(name);
    }
}

