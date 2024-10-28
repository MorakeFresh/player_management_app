package com.java.player.management.service.interfaces;

import com.java.player.management.entities.Position;

import java.sql.SQLException;
import java.util.List;

public interface PositionService {
    Position getPositionByName(String name) throws SQLException;
    List<Position> getAllPositions() throws SQLException;
    boolean createPosition(Position position) throws SQLException;
    boolean updatePosition(Position position) throws SQLException;
    boolean deletePosition(String name) throws SQLException;
}

