# ---- Build Stage ----
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app
COPY . .
COPY .env .env
RUN mvn clean package -DskipTests

# ---- Run Stage ----
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copy built jar
COPY --from=build /app/target/*.jar app.jar

# ✅ Copy the .env file into the final image
COPY --from=build /app/.env .env

ENTRYPOINT ["java", "-jar", "app.jar"]