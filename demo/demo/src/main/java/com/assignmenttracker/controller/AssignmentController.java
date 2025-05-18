package com.assignmenttracker.controller;

import com.assignmenttracker.model.Assignment;
import com.assignmenttracker.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = "*") // allows frontend like React to access this API
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepository;

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
    public void deleteAssignment(@PathVariable String id) {
        assignmentRepository.deleteById(id);
    }

    // Delete all assignments
@DeleteMapping
public void deleteAllAssignments() {
    assignmentRepository.deleteAll();
}
}


