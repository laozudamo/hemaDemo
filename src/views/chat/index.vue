<template>
  <div class="chat-container">
    <van-nav-bar
      left-arrow
      title="小红同学"
      @click-left="$router.back()"
    />
      <van-cell />
    <!-- bottom -->
    <van-cell-group class="txet-area">
      <van-field  placeholder="请输入用户名">
      </van-field>
         <van-button
          type="small"
          class="btn"
          @click="onSend"
        >
          发送
        </van-button>
    </van-cell-group>
   
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'chatPage', 
  components: {},
  props: {},
  data () {
    return {
      message: '',
      socket: null, //WebSocket
      messages: []
    }
  },
  computed: {},
  watch: {},
  created () {
      // 建立连接
    const socket = io('http://localhost:8080/')
    this.socket = socket

    socket.on('connect', function(){
      console.log('连接建立成功了')
    })
    
   
    socket.on('disconnect', function(){
      console.log('断开连接');
    })

     // 监听 message 事件，接受服务器端消息
    socket.on('message', data=>{
      this.messages.push(data)
    })
    
  },
  mounted () {},
  methods: {
    onSend () {
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      // 发送的消息
      this.socket.emit('message',data)
      this.messages.push(data)
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  position: fixed;
  top: 46px;
  left: 0px;
  right: 0px;
  bottom: 44px;
  overflow-y: auto;
}
.txet-area{
  display: flex;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  align-items: center;
}
.btn {
  width: 70px;
  padding: 0px;
  border: none;
  background-color: #d86262;
  color: #fff;
}
</style>
