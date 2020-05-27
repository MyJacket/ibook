<template>
  <div class="auth-wrapper">
    <div class="auth-innner-wrapper">
      <div class="auth-info-wrapper">
        <div class="auth-img">
          <ImageView src="https://www.youbaobao.xyz/mpvue-res/logo.jpg" round/>
        </div>
        <div class="auth-title">登录爱读书</div>
        <div class="auth-sub-title">精品好书免费读</div>
      </div>
      <button 
        class="auth-btn"
        open-type="getUserInfo"
        @getuserinfo="getUserInfo"
        >授权登录</button>
    </div>
  </div>
</template>

<script>
import ImageView from "../../components/base/ImageView";

export default {
  components: {
    ImageView
  },
  methods:{
   getUserInfo(){
     this.$emit('getUserInfo')
   }
  }
};
</script>

<style lang="scss" scoped>
.auth-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #999;
  z-index: 999;
  .auth-innner-wrapper {
    position: relative;
    width: 270px;
    height: 248px;
    background: #f5f5f5;
    border-radius: 18px;
    .auth-info-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 22.5px;
      .auth-img {
        width: 74px;
      }
      .auth-title {
        font-size: 13px;
        color: #999999;
        line-height: 18.5px;
        margin-top: 18px;
      }
      .auth-sub-title {
        font-size: 16px;
        color: #333333;
        line-height: 22.5px;
        font-weight: 700;
        margin-top: 26px;
      }
    }
    .auth-btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 49px;
      line-height: 49px;
      font-size: 15px;
      color: #fff;
      background-image: linear-gradient(90deg, #1ea3f5 0%, #0f87fc 100%);
      border-radius: 0 0 18px 18px;
    }
  }
}
</style>