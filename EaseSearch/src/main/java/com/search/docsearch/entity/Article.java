package com.search.docsearch.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class Article {

    private static final long serialVersionUID = 1L;
    private String id;
    /**
     * 文件全路径
     */
    private String articleName;
    /**
     * 页面访问路径
     */
    private String path;
    /**
     * 文件内容
     */
    private String textContent;
    /**
     * 文件名称
     */
    private String title;
    /**
     * 文件类型
     */
    private String type;

    /**
     * 语言
     */
    private String lang;

    /**
     * 版本
     */
    private String version;

}
