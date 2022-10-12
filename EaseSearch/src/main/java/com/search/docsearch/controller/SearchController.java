package com.search.docsearch.controller;


import com.search.docsearch.config.MySystem;
import com.search.docsearch.entity.vo.SearchCondition;
import com.search.docsearch.entity.vo.SearchTags;
import com.search.docsearch.entity.vo.SysResult;
import com.search.docsearch.service.SearchService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private SearchService searchService;
    @Autowired
    @Qualifier("setConfig")
    private MySystem s;

    /**
     * 查询文档
     *
     * @param condition 封装查询条件
     * @return 搜索结果
     */
    @PostMapping("docs")
    public SysResult searchDocByKeyword(@RequestBody SearchCondition condition) {
        if (!StringUtils.hasText(condition.getKeyword())) {
            return SysResult.fail("keyword must not null", null);
        }
//        condition.setKeyword(condition.getKeyword().replace("#", ""));
        try {
            Map<String, Object> result = searchService.searchByCondition(condition);
            if (result == null) {
                return SysResult.fail("内容不存在", null);
            }
            return SysResult.ok("查询成功", result);
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
        return SysResult.fail("查询失败", null);
    }


    @PostMapping("count")
    public SysResult getCount(@RequestBody SearchCondition condition) {
        try {
            Map<String, Object> result = searchService.getCount(condition.getKeyword(), condition.getLang());
            if (result == null) {
                return SysResult.fail("内容不存在", null);
            }
            return SysResult.ok("查询成功", result);
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
        return SysResult.fail("查询失败", null);
    }

    @PostMapping("pop")
    public SysResult getPop(String lang) {
        try {
            String[] result = null;
            if (lang.equals("zh")) {
                result = new String[] {"迁移", "docker", "mysql", "yum", "建设", "ssh", "生命周期", "虚拟化"};
            } else {
                result = new String[] {"docker", "mysql", "yum", "openstack", "cla"};
            }

            return SysResult.ok("查询成功", result);
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
        return SysResult.fail("查询失败", null);
    }


    @PostMapping("sort")
    public SysResult makeSort(@RequestBody Map<String, String> m) {

        try {
            Map<String, Object> result = searchService.advancedSearch(m);
            if (result == null) {
                return SysResult.fail("内容不存在", null);
            }
            return SysResult.ok("查询成功", result);
        } catch (Exception e) {
            e.printStackTrace();
        }


        return SysResult.fail("查询失败", null);
    }

    @PostMapping("tags")
    public SysResult getTags(@RequestBody SearchTags searchTags) {
        try {
            Map<String, Object> result = searchService.getTags(searchTags);
            if (result == null) {
                return SysResult.fail("内容不存在", null);
            }
            return SysResult.ok("查询成功", result);
        } catch (Exception e) {
            e.printStackTrace();
        }


        return SysResult.fail("查询失败", null);
    }


    /**
     * 定时任务
     */
    @Scheduled(cron = "${scheduled.cron}")
    public String scheduledTask() throws IOException {
        boolean success = false;
        Process process;
        try {
            log.info("===============开始更新仓库资源=================");
            ProcessBuilder pb = new ProcessBuilder(s.updateDoc);
            Process p = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line = null;
            while ((line = reader.readLine()) != null)
            {
                log.info(line);
                if (line.contains("build complete in")) {
                    success = true;
                }
            }
            log.info("===============仓库资源更新成功=================");
        } catch (IOException e) {
            log.error(e.getMessage());
        }

        if (success) {
            searchService.refreshDoc();
        } else {
            log.info("更新数据失败，查看日志");
        }

        //每天更新联想词库中的数据
//        searchService.refreshTip();

        return "success";
    }
}
