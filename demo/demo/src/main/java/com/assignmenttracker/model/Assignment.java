package com.assignmenttracker.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "assignments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Assignment {
    @Id
    private String id;

    private String title;
    private String subject;
    private String description;
    private LocalDate deadline;
    private String status;
<<<<<<< HEAD
    private String fileName; // just the file name, not full path

=======

    // New fields for student tracking
    private String studentId;     // Reference to User.id
    private String studentName;   // Optional - for displaying on mentor's dashboard
>>>>>>> 330a971 (in progress of completing 2-way functionality)
}

