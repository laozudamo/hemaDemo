<template>
  <van-cell>
    <div slot="title" class="article-title van-ellipsis">{{article.title}} </div>
    <div slot="label" v-if="article.cover.images.length <= 1" class="no-threeimg"></div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.images.length === 3">
        <div
        class="image-wrap"
        v-for="(image,index) in article.cover.images"
        :key="index"
        >
          <van-image
            :src="article.cover.images[index]"
            fit="fit"
          />
        </div>
      </div>
      <div class="label-wrap">
          <span v-if="article.is_top === 1" class="isTop">置顶</span>
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- 右侧展示一张 -->
    <van-image
      v-if="article.cover.images.length === 1"
      :src="article.cover.images[0]"
      fit="fit"
      class="cover"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem', 
  components: {},
  props: {
    article:{
      require: true,
      type: Object
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.article-title {
  font-size: 14px;
  color: #3a3a3a;
}
/deep/.van-cell__value {
  flex: unset;
  margin-left: 12px;
  width: 116px;
  height: 73px;
}
.cover{
  width: 116px;
  height: 73px;
}
.cover-wrap {
  padding: 4px 0px;
  width: 100%;
  height: 73px;
  display: flex;
  flex-wrap: nowrap;
  .image-wrap {
    display: flex;
    flex: 1;
    /* &:not(:last-child) */
    &:nth-child(-n+2){
      margin-right: 4px;
    }
    .van-image {
      width: 100%;
      height: 100%;
    }
  }
  
}
.label-wrap {
  .isTop {
    font-size: 14px;
    color: rgb(216, 98, 98);
  }
  span {
    font-size: 11px;
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
.no-threeimg {
  height: 28px;
}



</style>