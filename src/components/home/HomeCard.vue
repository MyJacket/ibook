<template>
  <div class="home-cart">
    <div class="hmoe-cart-inner">
      <div class="uer-info">
        <div class="avatar-wrapper">
          <ImageView :src="avatar" round />
        </div>
        <div class="nickname">{{nickname}}</div>
        <div class="shef-text">书架共有{{data.num}}本好书</div>
        <div class="round-item"></div>
        <div class="shef-text">特别精选</div>
      </div>
      <div class="book-info">
        <div class="book-wrapper">
          <div class="book-img-wrapper" 
            v-for="(item,index) in bookList" 
            :key="index"
            @click="onBookClick"
          >
            <ImageView :src="item.cover" />
          </div>
        </div>
        <div class="shelf-wrapper">
          <div class="shelf">书架</div>
          <van-icon class="arr" name="arrow" size="11px" color="#828489"></van-icon>
        </div>
      </div>
      <div class="feedback-wrapper" @click="onFeedBackClick">
        <span>反馈</span>
      </div>
    </div>
    <van-dialog id="van-dialog"></van-dialog>
  </div>
</template>

<script>
import ImageView from "../base/ImageView";
import Dialog from "vant-weapp/dist/dialog/dialog";

export default {
  components: {
    ImageView
  },
  props: {
    data: Object,
    hasSign: {
      type: Boolean,
      default: false
    },
    signDay: {
      type: Number,
      default: 0
    }
  },
  computed: {
    avatar() {
      return (this.data && this.data.userInfo && this.data.userInfo.avatar) || '';
    },
    nickname() {
      return (this.data && this.data.userInfo && this.data.userInfo.nickname) || '';
    },
    bookList() {
      return (this.data && this.data.bookList) || [];
    }
  },
  methods: {
    // 调转到书架
    gotoShelf() {},
    // 图片点击
    onBookClick() {},
    // 签到
    sign() {},
    onBookClick(){
      this.$emit('onBookClick')
    },
    onFeedBackClick() {
      Dialog.confirm({
        title: "反馈",
        message: "您是否确认提交反馈信息？",
        confirmButtonText: "是",
        cancelButtonText: "否"
      })
        .then(() => {
          console.log("点击是之后的事件");
        })
        .catch(() => {
          console.log("点击否之后的事件");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.home-cart {
  position: relative;
  background-image: linear-gradient(-90deg, #54575f 0%, #595b60 100%);
  border-radius: 15px;
  margin: 22px 20px 0;
  .hmoe-cart-inner {
    padding: 21.5px 17px 20px 20px;
    box-sizing: border-box;
    .uer-info {
      display: flex;
      align-items: center;
      .avatar-wrapper {
        width: 25px;
        height: 25px;
      }
      .nickname,
      .shef-text {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
      }
      .shef-text {
        opacity: 0.7;
      }
      .nickname {
        margin: 0 8.5px;
      }
      .round-item {
        height: 4px;
        width: 4px;
        border-radius: 50%;
        background-color: #a2a2a2;
        margin: 0 8px;
      }
    }
    .book-info {
      display: flex;
      margin-top: 16.5px;
      .book-wrapper {
        display: flex;
        flex: 1;
        justify-content: space-around;
        .book-img-wrapper {
          width: 72px;
          height: 101px;
        }
      }
      .shelf-wrapper {
        display: flex;
        align-items: center;
        .shelf {
          font-size: 10.5px;
          width: 11px;
          word-break: break-word;
          color: #ffffff;
          opacity: 0.8;
        }
      }
    }
    .feedback-wrapper {
      position: absolute;
      right: 0;
      top: 0;
      margin-top: 10.5px;
      width: 44.5px;
      height: 23.5px;
      opacity: 0.8;
      background: #807c7c;
      border-radius: 200px 0 0 200px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #fff;
      text-align: center;
      line-height: 23.5px;
    }
  }
}
</style>