package com.assignmenttracker.service;

import com.assignmenttracker.model.Assignment;
import com.assignmenttracker.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;



@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment updateById(String id, Assignment updated) {
    Optional<Assignment> existingOpt = assignmentRepository.findById(id);
    
    if (!existingOpt.isPresent()) {
        throw new RuntimeException("Assignment not found");
    }

    Assignment existing = existingOpt.get();
    existing.setTitle(updated.getTitle());
    existing.setSubject(updated.getSubject());
    existing.setDeadline(updated.getDeadline());
    existing.setStatus(updated.getStatus());

    return assignmentRepository.save(existing);
}

}


