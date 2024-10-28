package com.java.player.management.service.implementations;

import java.sql.SQLException;
import java.util.List;

import com.java.player.management.dao.interfaces.RoleDao;
import com.java.player.management.entities.Role;
import com.java.player.management.service.interfaces.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImplementation implements RoleService {

    private final RoleDao roleDao;
    private final Logger logger = LoggerFactory.getLogger(RoleServiceImplementation.class);

    @Autowired
    public RoleServiceImplementation(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public Role getRoleByName(String name) throws SQLException {
        try {
            return roleDao.getRoleByName(name);
        } catch (SQLException e) {
            logger.error("Error getting role by name: " + name, e);
            throw e;
        }
    }

    @Override
    public List<Role> getAllRoles() throws SQLException {
        try {
            return roleDao.getAllRoles();
        } catch (SQLException e) {
            logger.error("Error getting all roles", e);
            throw e;
        }
    }

    @Override
    public boolean createRole(Role role) throws SQLException {
        try {
            // Optional: add business logic before saving the role
            return roleDao.addRole(role);
        } catch (SQLException e) {
            logger.error("Error creating role: " + role.getName(), e);
            throw e;
        }
    }

    @Override
    public boolean updateRole(Role role) throws SQLException {
        try {
            // Optional: add business logic before updating the role
            return roleDao.updateRole(role);
        } catch (SQLException e) {
            logger.error("Error updating role: " + role.getName(), e);
            throw e;
        }
    }

    @Override
    public boolean deleteRole(String name) throws SQLException {
        try {
            return roleDao.deleteRole(name);
        } catch (SQLException e) {
            logger.error("Error deleting role: " + name, e);
            throw e;
        }
    }
}

