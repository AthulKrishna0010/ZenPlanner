package com.assignmenttracker.repository;

import com.assignmenttracker.model.Assignment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AssignmentRepository extends MongoRepository<Assignment, String> {
}
