package com.search.docsearch.controller;


import com.search.docsearch.config.MySystem;
import com.search.docsearch.service.SearchService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Component
@Slf4j
@RestController
public class BeginFun implements ApplicationRunner {
    @Autowired
    public SearchService searchService;
    @Autowired
    @Qualifier("setConfig")
    private MySystem s;


    @Override
    @PostMapping("begin")
    public void run(ApplicationArguments args) throws IOException {
        boolean success = false;
        try {
            log.info("===============开始拉取仓库资源=================");
            ProcessBuilder pb = new ProcessBuilder(s.initDoc);
            Process p = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line = null;
            while ((line = reader.readLine()) != null)
            {
                log.info(line);
                if (line.contains("build complete in")) {
                    log.info("Static resource build successfully");
                    success = true;
                }
            }
            System.out.println("---");
            log.info("===============仓库资源拉取成功=================");
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        System.out.println("ddd");
        if (success) {
            searchService.refreshDoc();
        } else {
            log.info("初始化数据失败，查看日志!");
        }

    }


}
