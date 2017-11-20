FROM openjdk:8-jdk-alpine as builder

RUN mkdir -p /app-build

WORKDIR /app-build

COPY . /app-build

RUN /app-build/mvnw package -DskipTests


FROM openjdk:8-jre-alpine

RUN mkdir -p /app

WORKDIR /app

COPY --from=builder /app-build/target/assignment1.war /app

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/assignment1.war"]