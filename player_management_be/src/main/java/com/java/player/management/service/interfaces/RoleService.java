package com.java.player.management.service.interfaces;

import com.java.player.management.entities.Role;

import java.sql.SQLException;
import java.util.List;

public interface RoleService {
    Role getRoleByName(String name) throws SQLException;
    List<Role> getAllRoles() throws SQLException;
    boolean createRole(Role role) throws SQLException;
    boolean updateRole(Role role) throws SQLException;
    boolean deleteRole(String name) throws SQLException;
}
