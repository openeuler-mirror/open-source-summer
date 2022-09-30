<template>
  <div class="moblie-content">
    <common-banner
      :pc-src="'/img/news/news-banner.png'"
      :mobile-src="'/img/news/news-banner.png'"
      :inside-name="'CONNECT'"
      :outside-name="i18n.community.NEWS.NEWS"
    ></common-banner>
    <div class="news-content">
      <div class="news-year-content" v-for="(months, key) in showNewsList">
        <span class="news-year">{{key.slice(4)}}</span>
        <div class="news-items" v-for="items in months">
          <div class="news-month">
            <span>{{i18n.community.NEWS.MONTHS[items[0].month]}}</span>
          </div>
          <div class="news-item" v-for="item in items">
            <div @click="go(item.path)" class="new-img card-hover">
              <img :src="'/' + item.frontmatter.banner" alt />
            </div>
            <div class="news-info news-info-item">
              <div class="news-time">
                <p>
                  <img class="mobile-middle-img" src="/img/blog/date.svg" alt />
                  <span class="news-date">{{item.frontmatter.date}}</span>
                </p>
                <p>
                  <img class="mobile-middle-img" src="/img/blog/visibility.svg" alt />
                  <span class="news-date">
                    <span id="busuanzi_container_page_pv">
                      <span>{{i18n.community.BLOG.BROWSE}}</span>
                     <span>{{item.count}}</span>
                      <span>{{i18n.community.BLOG.VIEWED}}</span>
                    </span>
                  </span>
                </p>
              </div>
              <div @click="go(item.path)" class="news-title word-hover">{{item.frontmatter.title}}</div>
              <div class="news-time-mobile">
                <p>
                  <span class="news-date">{{item.frontmatter.date}}</span>
                </p>
                <p>
                  <span class="news-date">
                    <span id="busuanzi_container_page_pv">
                      <span>{{i18n.community.BLOG.BROWSE}}</span>
                    <span>{{item.count}}</span>
                      <span>{{i18n.community.BLOG.VIEWED}}</span>
                    </span>
                  </span>
                </p>
              </div>
              <div class="news-summary">{{item.frontmatter.summary}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="paginationClass">
          <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="5"
          :layout="paginationLayout"
          :total="totalSize"
          ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import commonBanner from "./../common/banner.vue";
import {newsVisitList} from "../../api/newsCount"
export default {
  data() {
    return {
      totalSize: 0,
      currentPage: 1,
      PAGESIZE: 5,
      allNewsList: [],
      currentNewsList: [],
      showNewsList: {},
      visitCount: {
        newsTitle:'',
        newsDate:'',
        pageLang:''
      },
    };
  },
  components: {
    commonBanner,
  },
  computed: {},

  created() {},
  mounted() {
    newsVisitList()
        .then(response => {
          this.countList=response.data;
          this.allNewsList = this.newsList();
          this.totalSize = this.allNewsList.length;
          this.allNewsList = this.sortNewsList(this.allNewsList);
          this.handleCurrentChange(1);
        }).catch(() => {
      this.countList=[];
      this.allNewsList = this.newsList();
      this.totalSize = this.allNewsList.length;
      this.allNewsList = this.sortNewsList(this.allNewsList);
      this.handleCurrentChange(1);
    })
    for(let i = 0;  i<this.allNewsList.length;i++){
        this.visitCount.newsTitle=this.allNewsList[i].frontmatter.title;
        this.visitCount.newsDate=this.allNewsList[i].frontmatter.date;
    }
    this.visitCount.pageLang=this.$lang;
  },
  methods: {
    handleCurrentChange(val) {
      this.currentNewsList = this.allNewsList.slice(
        (val - 1) * this.PAGESIZE,
        val * this.PAGESIZE
      );

      let listObj = {};
      this.currentNewsList.forEach((item) => {
        if (!listObj[item.fullYearTag]) {
          listObj[item.fullYearTag] = {};
        }
        if (!listObj[item.fullYearTag][item.monthTag]) {
          listObj[item.fullYearTag][item.monthTag] = [];
        }
        listObj[item.fullYearTag][item.monthTag].push(item);
      });

      this.showNewsList = listObj;
      scrollTo(0, 0);
    },
    sortNewsList(array) {
      let temp = array;
      temp.forEach((item) => {
        item.fullYear = new Date(item.frontmatter.date).getFullYear();
        item.month = new Date(item.frontmatter.date).getMonth();
        item.fullYearTag = "year" + item.fullYear;
        item.monthTag = "mounth" + item.month;
      });
      temp.sort(function (a, b) {
        return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
      });
      return temp;
    },
    newsList() {
      return this.$sitePages.filter((item) => {
       if(item.path.indexOf("/" + this.$lang + "/news/") === 0){
         item.count=0;
         this.countList.forEach(itemCount=>{
           if(itemCount.title==item.frontmatter.title){
             item.count=itemCount.count;
           }
         })
         return true;
       }
      });
    },
    go(path) {
      if (path) {
        this.$router.push(path);
      }
    },

    resolvePostDate(date) {
      return dayjs(date).format(
        this.$themeConfig.dateFormat || "ddd MMM DD YYYY"
      );
    },
  },
};
</script>

<style lang="less" scoped>
.card-hover:hover {
    box-shadow: 0px 6px 30px 0px rgba(0, 47, 167, 0.2);
}
.news-content {
  width: 1120px;
  margin: 0 auto;
}
.news-year-content {
  position: relative;
}
.news-year {
  position: absolute;
  font-size: 60px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.05);
  height: 60px;
  line-height: 60px;
  top: -35px;
}
.paginationClass {
  margin: 20px 0 200px 0;
}
.news-items {
  margin: 50px 0;
}
.news-item {
  margin-top: 30px;
}
.word-hover{
    &:hover{
        color: #002FA7;
    }
}
.new-img {
  cursor: pointer;
  width: 400px;
  display: inline-block;
  border-radius:8px;
  @media screen and (max-width: 1000px) {
      box-shadow:none;
  }
  img {
    width: 400px;
    height:200px;
    box-shadow:0 6px 20px 0 rgba(0,0,0,0.1);
    border-radius: 8px;
    @media screen and (max-width: 1000px) {
      width: 270px;
      height: 150px;
      box-shadow: none;
    }
  }
}
.news-month {
  font-size: 24px;
}
.news-info {
  display: inline-block;
  margin-left: 60px;
  width: calc(100% - 480px);
  vertical-align: top;
}
.news-time {
  margin-top: 5px;
  p {
    display: inline-block;
    margin-right: 51px;
    &:first-of-type {
      .mobile-middle-img {
        display: inline-block;
        margin-bottom: -2px;
      }
    }
  }
}
.news-time-mobile {
  display: none;
}
.news-date {
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
}
.news-info-item {
    .news-title {
        cursor: pointer;
        font-size: 24px;
        margin: 21px 0 16px 0;
        @media screen and (max-width: 1000px) {
          font-size: 16px;
          margin: 0;
        }
    }   
}

.news-summary {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
}
@media screen and (max-width: 1000px) {
  .moblie-content {
    padding: 40px 30px 80px 30px;
  }
  .news-content {
    width: 100%;
  }
  .news-year {
    display: none;
  }
  .paginationClass {
    margin: 40px 0 0 0;
  }
  .news-items {
    margin: 0;
  }
  .news-item {
    margin-top: 40px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }
  .new-img {
    cursor: pointer;
    width: 100%;
    margin: 22px 0;
    text-align: center;
    img {
      max-width: 270px;
    }
  }
  .news-month {
    display: none;
  }
  .news-info {
    display: inline-block;
    margin-left: 0px;
    padding: 0 22px 30px;
    width: 100%;
    vertical-align: top;
  }
  .news-time {
    display: none;
  }
  .news-time-mobile {
    display: inline-block;
    margin-top: 10px;
    p {
      display: inline-block;
      margin-right: 17px;
      &:last-of-type {
        .news-date {
          span {
            span {
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .news-date {
    color: rgba(0, 0, 0, 0.4);
    font-size: 12px;
  }
  .news-title {
    cursor: pointer;
    font-size: 16px;
    margin: 0px 0 10px 0;
  }
  .news-summary {
    display: none;
  }
}
</style>
