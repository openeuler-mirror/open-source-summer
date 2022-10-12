<template>
  <div id="post_blog">
    <div class="blog-link" @click="go">{{i18n.sig.SIG_DETAIL.NEWS}}\</div>
    <div class="blog-title">{{$frontmatter.title}}</div>
  </div>
</template>

<script>
export default {
  name: "postBlog",
  data() {
    return {
      targetLocale: "",
    };
  },
  created() {
    this.targetLocale ="/" +  this.$lang + "/";
  },
  methods: {
    go() {
      this.$router.push(this.targetLocale + "interaction/news-list/");
    },
  },
};
</script>

<style lang="less">
#post_blog {
  width: 1120px;
  margin: 0 auto;
}
.blog-link {
  font-size: 20px;
  color: #002fa7;
  cursor: pointer;
  margin: 34px 0 16px 0;
  padding: 0;
  
}
.blog-title{
  font-size:36px;
  font-weight: normal;
  color: #000;
  margin-bottom: 36px;
}
@media screen and (max-width: 1000px) {
    #post_blog {
        width: 100%;
        margin: 0 auto;
        padding: 0 30px;
    }
}
</style>