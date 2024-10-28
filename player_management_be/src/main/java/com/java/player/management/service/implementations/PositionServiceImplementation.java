package com.java.player.management.service.implementations;

import java.sql.SQLException;
import java.util.List;

import com.java.player.management.dao.interfaces.PositionDao;
import com.java.player.management.entities.Position;
import com.java.player.management.service.interfaces.PositionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PositionServiceImplementation implements PositionService {

    private final PositionDao positionDao;
    private final Logger logger = LoggerFactory.getLogger(PositionServiceImplementation.class);

    @Autowired
    public PositionServiceImplementation(PositionDao positionDao) {
        this.positionDao = positionDao;
    }

    @Override
    public Position getPositionByName(String name) throws SQLException {
        try {
            return positionDao.getPositionByName(name);
        } catch (SQLException e) {
            logger.error("Error getting position by name: " + name, e);
            throw e;
        }
    }

    @Override
    public List<Position> getAllPositions() throws SQLException {
        try {
            return positionDao.getAllPositions();
        } catch (SQLException e) {
            logger.error("Error getting all positions", e);
            throw e;
        }
    }

    @Override
    public boolean createPosition(Position position) throws SQLException {
        try {
            return positionDao.addPosition(position);
        } catch (SQLException e) {
            logger.error("Error creating position: " + position.getName(), e);
            throw e;
        }
    }

    @Override
    public boolean updatePosition(Position position) throws SQLException {
        try {
            return positionDao.updatePosition(position);
        } catch (SQLException e) {
            logger.error("Error updating position: " + position.getName(), e);
            throw e;
        }
    }

    @Override
    public boolean deletePosition(String name) throws SQLException {
        try {
            return positionDao.deletePosition(name);
        } catch (SQLException e) {
            logger.error("Error deleting position with name: " + name, e);
            throw e;
        }
    }
}

