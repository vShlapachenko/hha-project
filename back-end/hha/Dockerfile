FROM maven:3.8.2-openjdk-16 AS build
COPY src /home/hha/src
COPY pom.xml /home/hha
RUN mvn -f /home/hha/pom.xml clean package -Dmaven.test.skip=true

FROM openjdk:16.0.2-slim
COPY --from=build /home/hha/target/hha-0.0.1-SNAPSHOT.jar /usr/local/lib/hha.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/hha.jar"]