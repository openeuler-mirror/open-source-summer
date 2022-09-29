FROM node

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV LANGUAGE C.UTF-8
ENV NODE_OPTIONS --max-old-space-size=8192

RUN mkdir -p /EaseSearch \
    && apt update \
    && apt-get install -y openjdk-17-jdk

WORKDIR /EaseSearch
COPY . /EaseSearch
RUN chmod 777 -R ./* \
    && ./mvnw clean install package -Dmaven.test.skip \
    && cd ./target/classes \
    && chmod 777 -R script \
    && cd ../
EXPOSE 8080
CMD java -jar ./target/EaseSearch-0.0.1-SNAPSHOT.jar
