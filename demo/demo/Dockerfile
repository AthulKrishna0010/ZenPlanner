# Start from an OpenJDK image with Maven installed
FROM maven:3.9.4-eclipse-temurin-17 AS builder

# Set working directory
WORKDIR /app

# Copy all backend source code
COPY . .

# Build the project using Maven
RUN mvn clean package -DskipTests

# Use a lightweight JRE image for running the app
FROM eclipse-temurin:17-jre

# Set working directory
WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port (same as your Spring Boot `server.port`)
EXPOSE 8080

# Start the app
ENTRYPOINT ["java", "-jar", "app.jar"]
