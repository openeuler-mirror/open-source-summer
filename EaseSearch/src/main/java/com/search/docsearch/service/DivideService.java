package com.search.docsearch.service;

import java.util.Map;

public interface DivideService {

    Map<String, Object> advancedSearch(Map<String, String> search, String category) throws Exception;


}
