package com.assignmenttracker.controller;

import com.assignmenttracker.model.Assignment;
import com.assignmenttracker.model.User;
import com.assignmenttracker.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.assignmenttracker.service.AssignmentService;  // Adjust package as needed
import org.springframework.http.ResponseEntity;
import com.assignmenttracker.service.UserService;
import com.assignmenttracker.repository.UserRepository;

import java.util.Optional;
import org.springframework.http.HttpStatus;

import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import java.net.MalformedURLException;
import java.nio.file.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.io.IOException;

import java.util.stream.Stream;



@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "https://zenplanner-1.onrender.com", allowCredentials = "true")

public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private UserService userRepo;

    

    

    // Delete an assignment by ID
    @DeleteMapping("/{id}")
public ResponseEntity<String> deleteById(@PathVariable String id) {
    if (assignmentRepository.existsById(id)) {
        assignmentRepository.deleteById(id);
        return ResponseEntity.ok("Deleted successfully");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Assignment not found");
    }
}





    // Delete all assignments
@DeleteMapping
public void deleteAllAssignments() {
    assignmentRepository.deleteAll();
}

@PutMapping("/{id}")
public ResponseEntity<Assignment> updateAssignment(@PathVariable String id, @RequestBody Assignment updatedAssignment) {
    Optional<Assignment> existingAssignmentOpt = assignmentRepository.findById(id);
    if (!existingAssignmentOpt.isPresent()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    Assignment existingAssignment = existingAssignmentOpt.get();

    // Update fields
    existingAssignment.setTitle(updatedAssignment.getTitle());
    existingAssignment.setSubject(updatedAssignment.getSubject());
    existingAssignment.setDeadline(updatedAssignment.getDeadline());
    
    existingAssignment.setStatus(updatedAssignment.getStatus());
    

    Assignment savedAssignment = assignmentRepository.save(existingAssignment);
    return ResponseEntity.ok(savedAssignment);
}

@PostMapping("/duplicate")
public ResponseEntity<List<Assignment>> createAssignment(@RequestBody Assignment assignment) {
    List<User> students = userRepo.getAllUsers(); // Assuming this method fetches all students
    List<Assignment> assignments = students.stream()
        .map(student -> {
            Assignment newAssignment = new Assignment();
            newAssignment.setTitle(assignment.getTitle());
            newAssignment.setSubject(assignment.getSubject());
            newAssignment.setDeadline(assignment.getDeadline());
            newAssignment.setStatus(assignment.getStatus());
            newAssignment.setStudentId(student.getId()); // Assign unique studentId
            newAssignment.setStudentName(student.getName());
            return newAssignment;
        })
        .collect(Collectors.toList());

    List<Assignment> savedAssignments = assignmentRepository.saveAll(assignments);
    return ResponseEntity.ok(savedAssignments);
}

@GetMapping("/duplicate")
public ResponseEntity<List<Assignment>> getAllDuplicatedAssignments() {
    List<Assignment> assignments = assignmentRepository.findAll(); // Fetch all assignments
    return ResponseEntity.ok(assignments);
}

@GetMapping("/duplicate/{id}")
public ResponseEntity<List<Assignment>> getAssignmentsByStudentId(@PathVariable String id) {
    List<Assignment> assignments = assignmentRepository.findByStudentId(id); // Fetch by student ID
    if (assignments.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
    }
    return ResponseEntity.ok(assignments);
}


}





