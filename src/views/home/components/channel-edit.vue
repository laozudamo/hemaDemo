<template>
  <div class="channel-edit">
    <!-- my channel -->
    <van-cell
      class="header"
      center
      :border="false"
    >
    <div
      slot="title"
      class="channel-title"
    >
      我的频道
    </div>
    <van-button
      round
      plain
      type="warning"
      size="mini"
      @click="isEdit=!isEdit"
     
    >
     {{isEdit ? '完成' : '编辑'}}
    </van-button>
    </van-cell>
    <!-- grid -->
    <van-grid
      :gutter="10"
      :column-num="4"
      :border="false"
    >
    <!--  -->
      <van-grid-item
        class="grid-item"
        :class="{ 'active' : onActive===index,'' : false}"
        v-for="(channel,index) in userChannels"
        :key="index"
        @click="editChannel(index)"
        
      >
      <van-icon name="clear" class="icon" v-if="isEdit && index!==0"/>
        {{channel.name}}
      </van-grid-item>
    </van-grid>
    <!-- my channel -->
    <van-cell
      class="header"
      center
      :border="false"
    >
    <div
      slot="title"
      class="recommend-channel"
    >
      频道推荐
    </div>
    </van-cell>
    <!-- grid -->
    <van-grid
      :gutter="10"
      :column-num="4"
      :border="false"
    >
      <van-grid-item
        v-for="(channel,index) in recommendChannels"
        :key="index"
        class="grid-item"
        @click="onAdd(channel)"
      >
        {{channel.name}}
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllchannels } from '@/api/channels.js'
import {addUserChannel} from '@/api/user.js'
import { setItem,getItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit', 
  components: {},
  props: {
    userChannels:{
      type: Array,
      require: true
    },
    onActive: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    /* 推荐频道 */
    /* 推荐频道等于所有频道减去我的频道 */
    // filter 方法: 过滤数据，根据方法返回的布尔值 true 来收集数据
    recommendChannels () {
      // filter 查找满足条件的所有元素
     return this.allChannels.filter(channel => {
       // 判断 channel 是否属于用户
       // find 找到符合条件的单个元素
        return !this.userChannels.find(userChannel =>{
          // 返回符合条件的元素
          return  userChannel.id === channel.id
        })
      })
    },
  },
  watch: {},
  created () {
    this.loadAllchannels()
  },
  mounted () {},
  methods: {
    async loadAllchannels() {
      const { data } = await getAllchannels()
      console.log(data);
      this.allChannels = data.data.channels
    },

    async onAdd (channel) {
      this.userChannels.push(channel)
      let user = getItem('user')
      if (user) {
        // 存线上
        try {
           await addUserChannel({
            channels:[
              {id:channel.id, seq:this.userChannels.length }
            ]
          })
        } catch(err) {
          console.dir(err);
        }
      } else {
        // 存本地
        setItem('user-channels',this.userChannels)
      }
    },

    editChannel (index) {
      if(this.isEdit && index !== 0) {
        // 删除频道
        this.deleteChannel(index)
      } else {
        // 进入频道
        this.goChannel(index)
      }
    },

    deleteChannel(index) { // 删除频道 
      if(index < this.onActive) {
        // 更新激活频道索引
        this.$emit('update-active',this.onActive-1)
      } 
      this.userChannels.splice(index,1)
      // 数据持久化
    },

    goChannel (index) { // 进入频道
      this.$emit('update-active',index)
      this.$emit('closePop')
      // 数据持久化
    }

  }
}
</script>

<style lang="less" scoped>
.header {
  padding-top: 54px;
  .edit-btn{
    position: absolute;
    right: 16px;
  }
}
.channel-title {
  font-size: 16px;
  color: #333;
}
.grid-item {
  width: 78px;
  height: 43px;
  border-radius: 14px;
  /deep/.van-grid-item__content{
    background-color: #f4f5f6;
    font-size: 14px;
    color: #222;
    border-radius: 10px;
    border: 1px solid #c79f9f;
  }
}
.icon {
  position: absolute;
  top: -4px;
  right: 3px;
  font-size: 18px;
  color: #d5505f;
  opacity: .9;
}
// 高亮显示文字
.active {
  /deep/.van-grid-item__content {
    color: #ed4444!important;
  }
}
</style>