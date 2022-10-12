package com.search.docsearch.config;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.elasticsearch.ElasticsearchProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Locale;

@Configuration
@EnableConfigurationProperties(ElasticsearchProperties.class)
@Slf4j
public class SystemConfig {

    @Value("${system}")
    private String system;
    @Value("${docsversion}")
    private String docsVersion;
    @Value("${dep}")
    private String dep;


    public static final String MAPPINGPATH = "/EaseSearch/target/classes/mapping/mapping.json";

    public static final String BASEPATH = "/usr/local/docs/target/";

    @Bean
    public MySystem setConfig() {
        system = system.toLowerCase(Locale.ROOT);
        dep = dep.toLowerCase(Locale.ROOT);
        MySystem mySystem = new MySystem();

        mySystem.setSystem(system);

        if (dep.equals("test")) {
            mySystem.setIndex(system + "_articles_test");
        } else {
            mySystem.setIndex(system + "_articles");
        }

        mySystem.setDocsVersion(docsVersion);
        mySystem.setMappingPath(MAPPINGPATH);
        mySystem.setBasePath(BASEPATH);

        mySystem.setInitDoc("/EaseSearch/target/classes/script/" + system + "/initDoc.sh");
        mySystem.setUpdateDoc("/EaseSearch/target/classes/script/" + system + "/updateDoc.sh");
        return mySystem;
    }
}
