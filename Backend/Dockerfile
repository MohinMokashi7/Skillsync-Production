# Use official OpenJDK image
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Give permission to Maven wrapper
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose Render port
EXPOSE 10000

# Run the Spring Boot jar
CMD ["java", "-jar", "target/SkillSync-0.0.1-SNAPSHOT.jar"]
