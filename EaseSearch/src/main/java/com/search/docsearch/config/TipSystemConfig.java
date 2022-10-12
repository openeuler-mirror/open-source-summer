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
public class TipSystemConfig {

    @Value("${system}")
    private String system;
    @Value("${docsversion}")
    private String docsVersion;
    @Value("${dep}")
    private String dep;


    public static final String TIPMAPPINGPATH = TipSystemConfig.class.getClassLoader().getResource("").getPath()+ "mapping/tips_mapping.json";

    public static final String TIPBASEPATH = "/usr/local/docs/target/";

    @Bean
    public TipSystem setTipConfig() {
        system = system.toLowerCase(Locale.ROOT);
        dep = dep.toLowerCase(Locale.ROOT);
        TipSystem tipSystem = new TipSystem();

        tipSystem.setSystem(system);

        if (dep.equals("test")) {
            tipSystem.setIndex(system + "_tips_test");
        } else {
            tipSystem.setIndex(system + "_tips");
        }

        tipSystem.setDocsVersion(docsVersion);
        tipSystem.setMappingPath(TIPMAPPINGPATH);
        tipSystem.setBasePath(TIPBASEPATH);

        tipSystem.setInitDoc("/EaseSearch/target/classes/script/" + system + "/initDoc.sh");
        tipSystem.setUpdateDoc("/EaseSearch/target/classes/script/" + system + "/updateDoc.sh");
        return tipSystem;
    }
}
