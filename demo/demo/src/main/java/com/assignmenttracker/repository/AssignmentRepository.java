package com.assignmenttracker.repository;
import java.util.Optional;
import com.assignmenttracker.model.Assignment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AssignmentRepository extends MongoRepository<Assignment, String> {
        void deleteByTitle(String title);
        Optional<Assignment> findByTitle(String title);
}
