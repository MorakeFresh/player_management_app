package com.java.player.management.dao.interfaces;

import com.java.player.management.entities.Role;

import java.sql.SQLException;
import java.util.List;


public interface RoleDao {
    Role getRoleByName(String name) throws SQLException;
    List<Role> getAllRoles() throws SQLException;
    boolean addRole(Role role) throws SQLException;
    boolean updateRole(Role role) throws SQLException;
    boolean deleteRole(String name) throws SQLException;
}

