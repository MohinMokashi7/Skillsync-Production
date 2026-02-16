FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy only Backend folder contents
COPY Backend /app

# Give permission to Maven wrapper
RUN chmod +x mvnw

# Build application
RUN ./mvnw clean package -DskipTests

EXPOSE 10000

CMD ["java", "-jar", "target/SkillSync-0.0.1-SNAPSHOT.jar"]
