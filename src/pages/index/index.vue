<template>
  <div>
    <div class="home" v-if="isAuth">
      <SearchBar disabled @onClick="onSearchBarClick" :hotSearch="hotSearch" />

      <HomeCard :data="homeCard" />
      <HomeBanner
        img="http://www.youbaobao.xyz/book/res/bg.jpg"
        title="基于mpvue2.0的读书神器"
        subTitle="立即体验"
        @onClick="onBannerClick"
      />
      <div :style="{marginTop:'23px'}">
        <HomeBook
          title="为你推荐"
          :row="1"
          :col="3"
          :data="recommend"
          mode="row"
          btnText="换一批"
          @onMoreClick="recommendChange('recommend')"
          @onBookClick="onBookClick"
        />
      </div>
      <div :style="{marginTop:'23px'}">
        <HomeBook
          title="免费阅读"
          :row="2"
          :col="3"
          :data="freeRead"
          mode="row"
          btnText="换一批"
          @onMoreClick="recommendChange('freeRead')"
          @onBookClick="onBookClick"
        />
      </div>
      <div :style="{marginTop:'23px'}">
        <HomeBook
          title="当前最热"
          :row="1"
          :col="4"
          :data="hotBook"
          mode="row"
          btnText="换一批"
          @onMoreClick="recommendChange('hotBook')"
          @onBookClick="onBookClick"
        />
      </div>
      <div :style="{marginTop:'23px'}">
        <HomeBook
          title="分类"
          :row="3"
          :col="2"
          :data="category"
          mode="col"
          btnText="查看全部"
          @onMoreClick="onCategoryMoreClick"
          @onBookClick="onBookClick"
        />
      </div>
    </div>
    <Auth v-if="!isAuth" @getUserInfo="init" />
  </div>
</template>

<script>
// 引入搜索框组件
import SearchBar from "../../components/home/SearchBar";
// 引入读书卡片组件
import HomeCard from "../../components/home/HomeCard";
import HomeBanner from "../../components/home/HomeBanner";
// 读书推荐组件
import HomeBook from "../../components/home/HomeBook";
// 授权组件
import Auth from "../../components/base/Auth";

// 网络请求封装
import { getHomeData, recommend, freeRead, hotBook, register } from "../../api";

import {
  getSetting,
  getUserInfo,
  setStorageSync,
  getStorageSync,
  getUserOpenId
} from "../../api/wechat";

export default {
  components: {
    HomeCard,
    SearchBar,
    HomeBanner,
    HomeBook,
    Auth
  },
  data() {
    return {
      hotSearch: "",
      homeCard: {},
      banner: {},
      recommend: [],
      hotBook: [],
      freeRead: [],
      category: [],
      isAuth: true
    };
  },

  methods: {
    recommendChange(key) {
      switch (key) {
        case "recommend":
          recommend().then(response => {
            this.recommend = response.data.data;
          });
          break;
        case "freeRead":
          freeRead().then(response => {
            this.freeRead = response.data.data;
          });
          break;
        case "hotBook":
          hotBook().then(response => {
            this.hotBook = response.data.data;
          });
          break;
      }
    },
    onMoreClick() {
      console.log("获得更多");
    },
    onBookClick() {
      console.log("BOOK CLICK");
    },
    onSearchBarClick() {
      // 跳转到搜索页面
    },
    onBannerClick() {
      console.log("banner click");
    },
    getHomeData(openId, userInfo) {
      getHomeData({ openId }).then(response => {
        const {
          data: {
            hotSearch: { keyword },
            shelf,
            banner,
            recommend,
            freeRead,
            hotBook,
            category,
            shelfCount
          }
        } = response.data;
        this.hotSearch = keyword;
        this.banner = banner;
        this.recommend = recommend;
        this.freeRead = freeRead;
        this.hotBook = hotBook;
        this.category = category;
        this.homeCard = {
          bookList: shelf,
          num: shelfCount,
          userInfo
        };       
      });
    },
    getUserInfo() {
      const onOpenIdComplete = (openId, userInfo) => {
        this.getHomeData(openId, userInfo);
        register(openId, userInfo);
      };
      getUserInfo(
        userInfo => {
          console.log("userInfo");
          // 储存用户信息
          setStorageSync("userInfo", userInfo);
          const openId = getStorageSync("openId");
          if (!openId || openId.length === 0) {
            getUserOpenId(openId => onOpenIdComplete(openId, userInfo));
          } else {
            onOpenIdComplete(openId, userInfo);
          }
        },
        () => {
          console.log("failed...");
        }
      );
    },
    getSetting() {
      getSetting(
        "userInfo",
        () => {
          this.isAuth = true;
          this.getUserInfo();
        },
        () => {
          this.isAuth = false;
        }
      );
    },
    init() {
      this.getSetting();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.home-book {
  margin-top: 23px;
}
</style>
