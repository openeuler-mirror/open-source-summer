package com.search.docsearch.service;

import com.search.docsearch.entity.vo.SearchCondition;
import com.search.docsearch.entity.vo.SearchTags;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface SearchService {


    /**
     * 根据索引名称和版本刷新数据
     *
     */
    void refreshDoc() throws IOException;

    void refreshTip() throws IOException;


    /**
     * 根据条件搜索
     *
     * @param condition 搜索条件
     * @return 符合条件记录
     * @throws IOException
     */
    Map<String, Object> searchByCondition(SearchCondition condition) throws IOException;


    Map<String, Object> getCount(String keyword, String lang) throws IOException;


    Map<String, Object> advancedSearch(Map<String, String> search) throws Exception;

    Map<String, Object> getTags(SearchTags searchTags) throws Exception;

    Set getSearchSuggest(Integer pageSize, String key);
}
