package com.search.docsearch.entity.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serial;
import java.io.Serializable;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class SearchTags implements Serializable {
    @Serial
    private static final long serialVersionUID = -969897369024720352L;
    private String lang;
    private String category;
    private String want;
    private Map<String, String> condition;

}


