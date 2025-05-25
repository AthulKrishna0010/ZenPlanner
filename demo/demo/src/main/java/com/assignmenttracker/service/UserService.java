package com.assignmenttracker.service;

import com.assignmenttracker.model.User;
import com.assignmenttracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public ResponseEntity<?> deleteAllUsers() {
        userRepo.deleteAll();
        return ResponseEntity.ok("All users have been deleted.");
    }

    public ResponseEntity<?> registerUser(User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }

        // TODO: Hash the password before saving
        userRepo.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    public ResponseEntity<?> authenticateUser(User user) {
        Optional<User> found = userRepo.findByEmail(user.getEmail());

        if (found.isPresent() && found.get().getPassword().equals(user.getPassword())) {
            User existingUser = found.get();
            UserDTO userDTO = new UserDTO(
                    existingUser.getId(),
                    existingUser.getName(),
                    existingUser.getEmail(),
                    existingUser.getRole()
            );
            return ResponseEntity.ok(userDTO);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
    }

    // DTO to send user data without password
    static class UserDTO {
        public String id;
        public String name;
        public String email;
        public String role;

        public UserDTO(String id, String name, String email, String role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
        }
    }
}
