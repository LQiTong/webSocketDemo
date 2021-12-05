<template>
  <div class="test3">
    <router-link to="/">首页</router-link>
    <div class="msg" ref="box">
      <div v-for="item in list" :class="[item.type,'msg-item']">
        <p>
          {{item.content}}
        </p>
      </div>
    </div>
    <div class="input-group">
      <el-input v-model="contentText" placeholder="输入您想说的话" size="normal" clearable></el-input>
      <el-button @click="sendText">发送</el-button>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "index3",
  data() {
    return {
      list: [],//聊天记录的数组
      contentText: "",//input输入的值
    }
  },
  methods: {
    //发送聊天信息
    sendText() {
      let that = this;
      this.list = [...this.list, { type: "mine", content: this.contentText }];//通过type字段进行区分是自己（mine）发的还是系统（robot）返回的
      this.backText(() => {
        that.contentText = "";//加回调在得到返回数据的时候清除输入框的内容
      });
    },
    backText(callback) {
      let that = this;
      if (window.WebSocket) {
        let ws = new WebSocket("ws://0.0.0.0:8001");
        ws.onopen = (e) => {
          console.log("链接服务器成功");
          console.log("e", e);
          console.log("that.contentText is", that.contentText);
          ws.send(that.contentText);
          callback();
        };
        ws.onclose = (e) => {
          console.log("服务器关闭")
        };
        ws.onerror = () => {
          console.log("服务器出错")
        };
        ws.onmessage = (e) => {
          console.log('e', e);
          that.list = [...that.list, { type: "robot", content: e.data }]
        }
      }
    }
  },
  watch: {
    //监听list,当有修改的时候进行div的屏幕滚动，确保能看到最新的聊天
    list: function () {
      let that = this;
      setTimeout(() => {
        that.$refs.box.scrollTop = that.$refs.box.scrollHeight;
      }, 0);
      //加setTimeout的原因：由于vue采用虚拟dom，我每次生成新的消息时获取到的div的scrollHeight的值是生成新消息之前的值，所以造成每次都是最新的那条消息被隐藏掉了
    }
  },
  mounted() {
  }
};


</script>
 
<style scoped lang="scss">
.test3 {
  text-align: center;
}

.msg {
  width: 400px;
  height: 500px;
  overflow: auto;
  padding-top: 5px;
  border: 1px solid red;
  display: inline-block;
  margin-bottom: 6px;

  .msg-item {
    position: relative;
    overflow: hidden;
    p {
      display: inline-block;
      border-radius: 40px;
      background: #3c3d5a;
      color: white;
      float: left;
      padding: 2px 12px;
      margin: 0 0 2px 0;
      max-width: 70%;
      text-align: left;
      box-sizing: border-box;
    }

    &.mine {
      p {
        float: right;
        background: aquamarine;
        color: white;
      }
    }
  }
}
</style>