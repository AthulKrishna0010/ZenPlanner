package com.assignmenttracker.service;

import com.assignmenttracker.model.User;
import com.assignmenttracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public ResponseEntity<?> registerUser(User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }
        userRepo.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    public ResponseEntity<?> authenticateUser(User user) {
        Optional<User> found = userRepo.findByEmail(user.getEmail());
        if (found.isPresent() && found.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
    }
}
