package com.search.docsearch.controller;


import com.search.docsearch.entity.vo.SysResult;
import com.search.docsearch.service.DivideService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/search/sort")
public class DivideController {
    @Autowired
    private DivideService divideService;



    @PostMapping("blog")
    public SysResult DivideBLog(@RequestBody Map<String, String> m){

        try {
            Map<String, Object> result = divideService.advancedSearch(m, "blog");
            if (result == null) {
                return SysResult.fail("内容不存在", null);
            }
            return SysResult.ok("查询成功", result);
        } catch (Exception e) {
            e.printStackTrace();
        }


        return SysResult.fail("查询失败", null);
    }


    @PostMapping("news")
    public SysResult DivideNews(@RequestBody Map<String, String> m){
        try {
            Map<String, Object> result = divideService.advancedSearch(m, "news");
            if (result == null) {
                return SysResult.fail("内容不存在", null);
            }
            return SysResult.ok("查询成功", result);
        } catch (Exception e) {
            e.printStackTrace();
        }


        return SysResult.fail("查询失败", null);
    }

    @PostMapping("showcase")
    public SysResult DivideShowcase(@RequestBody Map<String, String> m){
        try {
            Map<String, Object> result = divideService.advancedSearch(m, "showcase");
            if (result == null) {
                return SysResult.fail("内容不存在", null);
            }
            return SysResult.ok("查询成功", result);
        } catch (Exception e) {
            e.printStackTrace();
        }


        return SysResult.fail("查询失败", null);
    }


}
