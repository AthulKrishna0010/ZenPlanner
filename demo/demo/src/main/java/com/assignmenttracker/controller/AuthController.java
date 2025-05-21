package com.assignmenttracker.controller;

import com.assignmenttracker.model.User;
import com.assignmenttracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> login(@RequestBody User user) {
        return userService.authenticateUser(user);
    }
}
