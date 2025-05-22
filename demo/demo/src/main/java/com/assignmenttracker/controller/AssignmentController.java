package com.assignmenttracker.controller;

import com.assignmenttracker.model.Assignment;
import com.assignmenttracker.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.assignmenttracker.service.AssignmentService;  // Adjust package as needed
import org.springframework.http.ResponseEntity;


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
@CrossOrigin(origins = "*") // allows frontend like React to access this API
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AssignmentService assignmentService;

    // Add a new assignment
    @PostMapping
    public Assignment createAssignment(@RequestBody Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    // Get all assignments
    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

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

@PostMapping("/upload/{assignmentId}")
public ResponseEntity<String> uploadFile(
        @PathVariable String assignmentId, @RequestParam("file") MultipartFile file) {
    try {
        String uploadDir = "uploads/" + assignmentId + "/";
        Files.createDirectories(Paths.get(uploadDir));

        String filePath = uploadDir + file.getOriginalFilename();
        Path path = Paths.get(filePath);
        Files.write(path, file.getBytes());

        return ResponseEntity.ok(filePath);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
    }
}

@GetMapping("/files/{assignmentId}")
public ResponseEntity<List<String>> listFiles(@PathVariable String assignmentId) {
    try {
        Path dir = Paths.get("uploads/" + assignmentId);
        if (!Files.exists(dir)) return ResponseEntity.ok(Collections.emptyList());

        List<String> fileNames = Files.list(dir)
                .map(Path::getFileName)
                .map(Path::toString)
                .collect(Collectors.toList());

        return ResponseEntity.ok(fileNames);
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
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

}





