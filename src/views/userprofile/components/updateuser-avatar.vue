<template>
  <div class="avator">
    <div>
      <img :src="img" class="img" ref="img">
    </div>
      <van-nav-bar
        class="nav-bar"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('cancel')"
        @click-right="onConfirm"
      >
      </van-nav-bar>
  </div>
</template>

<script>
import { editUserPhoto } from '@/api/user.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'userAvatar', 
  components: {
    
  },
  props:{
    file: {
      required: true,
    }
  },
  data () {
    return {
      img: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
   
  const image = this.$refs['img']
  this.cropper = new Cropper(image, {
    aspectRatio: 1,
  })

  },
  methods: {
    // 知识点
    getCroppedCanvas() {
      return new Promise(reslove => {
        this.cropper.getCroppedCanvas().toBlob((blob) =>{
          reslove(blob)
        })
      })
    },
    

    async onConfirm() {

      this.$toast('正在保存修改')
      /* 修改后的头像数据 */
      const file =await this.getCroppedCanvas()

      const fd =new FormData()

      fd.append('photo',file)

      await editUserPhoto(fd)

      /* 更新图像给父组件 */
      this.$emit('updateAvator',window.URL.createObjectURL(file))

      this.$toast('保存成功') 

      this.$emit('cancel')
   }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #000000;
}
/deep/.van-nav-bar__text {
  color: #fff;
}

.img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>