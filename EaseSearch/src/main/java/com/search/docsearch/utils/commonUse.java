package com.search.docsearch.utils;

public class commonUse {
    public static String getValue(String r, String t) {
        String result = "";

        for(int i = 0; i < r.length(); i ++) {
            if (r.contains(t)) {
                r = r.substring(r.indexOf(t) + t.length());
                if (r.substring(0, 4).contains("=")) {
                    result = r.substring(r.indexOf("=") + 1);
                    if (t.equals("tags") || t.equals("categories")) {
                        result = result.substring(result.indexOf("[") + 1);
                        result = result.substring(0, result.indexOf("]"));
                        result = result.replaceAll("'", "");
                        break;
                    } else {
                        if (result.substring(0, 3).contains("'")) {
                            result = result.substring(result.indexOf("'") + 1);
                            result = result.substring(0, result.indexOf("'"));
                        } else if (result.substring(0, 3).contains("\"")){
                            result = result.substring(result.indexOf("\"") + 1);
                            result = result.substring(0, result.indexOf("\""));
                        }
                        break;
                    }
                }
            } else {
                break;
            }
        }


        return result;
    }

}
