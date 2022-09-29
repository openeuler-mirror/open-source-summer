package com.search.docsearch;

import com.search.docsearch.config.MySystem;
import com.search.docsearch.constant.Constants;
import com.search.docsearch.utils.EulerParse;
import com.search.docsearch.utils.IdUtil;
import org.apache.commons.io.FileUtils;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.TermQueryBuilder;
import org.elasticsearch.index.reindex.BulkByScrollResponse;
import org.elasticsearch.index.reindex.DeleteByQueryRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@SpringBootTest
class DocSearchApplicationTests {
	@Autowired
	@Qualifier("restHighLevelClient")
	private RestHighLevelClient restHighLevelClient;

	@Autowired
	@Qualifier("setConfig")
	private MySystem s;



	@Test
	void contextLoads() throws IOException {

		DeleteByQueryRequest deleteByQueryRequest = new DeleteByQueryRequest("");
		BoolQueryBuilder boolQueryBuilder = new BoolQueryBuilder();
		boolQueryBuilder.must(new TermQueryBuilder("lang", "zh"));
		boolQueryBuilder.must(new TermQueryBuilder("type", "news"));
		deleteByQueryRequest.setQuery(boolQueryBuilder);
		BulkByScrollResponse bulkByScrollResponse = restHighLevelClient.deleteByQuery(deleteByQueryRequest, RequestOptions.DEFAULT);
		System.out.println(bulkByScrollResponse);
	}



	@Test
	void testPa() throws Exception {
		File mdFile = FileUtils.getFile("C:\\CYDev\\workspace\\eulerdoc\\openEuler-portal\\app\\.vitepress\\dist\\zh\\learn\\mooc\\detail\\index.html");
		Map<String, Object> map = EulerParse.parse("zh", "download", mdFile);

		System.out.println(map);


		IndexRequest indexRequest = new IndexRequest(s.index).id(IdUtil.getId()).source(map);

		IndexResponse indexResponse = restHighLevelClient.index(indexRequest, RequestOptions.DEFAULT);
		System.out.println(indexResponse.toString());
//		String s = "012345";
//		System.out.println(s.substring(0, 6));
	}





	@Test
	void ines() throws IOException {
		String d = "2022-04-02";
		String  archives = d.toString().substring(1, 13);
		System.out.println(archives);
	}


}
