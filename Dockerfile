FROM openjdk:8-jre-alpine

RUN mkdir -p /app

WORKDIR /app

COPY ./target/assignment1-0.0.1-SNAPSHOT.war /app/assignment.war

EXPOSE 8080

CMD java -jar /app/assignment.war