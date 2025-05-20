package com.assignmenttracker.controller;

import com.assignmenttracker.model.Assignment;
import com.assignmenttracker.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.assignmenttracker.service.AssignmentService;  // Adjust package as needed
import org.springframework.http.ResponseEntity;


import java.util.Optional;
import org.springframework.http.HttpStatus;


import java.util.List;

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





