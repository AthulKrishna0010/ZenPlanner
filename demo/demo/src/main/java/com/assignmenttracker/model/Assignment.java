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
}
