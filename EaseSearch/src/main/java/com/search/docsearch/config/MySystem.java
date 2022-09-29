package com.search.docsearch.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class MySystem {

    public String system;
    public String docsVersion;
    public String index;
    public String mappingPath;
    public String basePath;
    public String initDoc;
    public String updateDoc;

}
