package com.assignmenttracker;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AssignmentTrackerApplication {

    public static void main(String[] args) {
        // Load .env
        Dotenv dotenv = Dotenv.load();
        System.setProperty("MONGODB_URI", dotenv.get("MONGODB_URI"));

        SpringApplication.run(AssignmentTrackerApplication.class, args);
    }
}
