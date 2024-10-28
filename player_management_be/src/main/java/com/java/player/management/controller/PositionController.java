package com.java.player.management.controller;

import com.java.player.management.entities.Position;
import com.java.player.management.service.interfaces.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/positions")
public class PositionController {

    private final PositionService positionService;

    @Autowired
    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @GetMapping("/position/{name}")
    public Position getPositionByName(@PathVariable String name) throws SQLException {
        return positionService.getPositionByName(name);
    }

    @GetMapping
    public List<Position> getAllPositions() throws SQLException {
        return positionService.getAllPositions();
    }

    @PostMapping("/position")
    public boolean createPosition(@RequestBody Position position) throws SQLException {
        return positionService.createPosition(position);
    }

    @PutMapping("/position")
    public boolean updatePosition(@RequestBody Position position) throws SQLException {
        return positionService.updatePosition(position);
    }

    @DeleteMapping("/position/{name}")
    public boolean deletePosition(@PathVariable String name) throws SQLException {
        return positionService.deletePosition(name);
    }
}

