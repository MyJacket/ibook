<template>
  <div class="search-bar">
    <div class="search-bar-wrapper">
      <van-icon class="search" name="search" size="15px" color="#858C96" />
      <input
        class="search-bar-input"
        :foucs="focus"
        :disabled="disabled"
        :maxlength="limit"
        :placeholder="hotSearch.length===0  ? '搜索': hotSearch "
        v-model="searchWords"
        @input="onChange"
        :confirm-type="search"
        @confirm="onConfirm"
        placeholder-style="color:#ADB4BE; font-size:12px"
      />
      <van-icon
        class="clear"
        name="clear"
        size="15px"
        color="#858C96"
        @click="onClearClick"
        v-if="searchWords.length>0 "
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
    },
    hotSearch: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchWords: ""
    };
  },
  methods: {
    onSearchBarClick() {
      this.$emit("onClick");
    },
    onClearClick() {
      this.searchWords = "";
      this.$emit("onClear");
    },
    onChange(e) {
      const { value } = e.mp.detail;
      this.$emit("onChange", value);
    },
    onConfirm(e) {
      const { value } = e.mp.detail;
      this.$emit("onConfirm", value);
    },
    setValue() {},
    getValue() {}
  }
};
</script>

<style lang="scss" scoped>
.search-bar {
  padding: 15px 15.5px;
  .search-bar-wrapper {
    display: flex;
    height: 40px;
    box-sizing: border-box;
    align-items: center;
    padding: 12px 17px;
    background-color: #f5f7f9;
    border-radius: 20px;
    .search-bar-input {
      flex: 1;
      margin: 0 8px;
    }
    .search,
    .clear {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
}
</style>