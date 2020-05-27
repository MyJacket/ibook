<template>
  <div class="image-view">
    <img
      :src="src"
      :class="round ? 'round image':'image' "
      :style="{height}"
      :mode="mode"
      :lazy-load="lazyLoad"
      @load="onLoad"
      @error="onError"
      v-show="!isLoading && !error"
    />
    <img
      src="https://www.youbaobao.xyz/book/img/loading2.ae9e5924.jpeg"
      :class="round ? 'round image':'image' "
      :style="{height}"
      :mode="mode"
      :lazy-load="lazyLoad"
      v-show="isLoading || error"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: "widthFix"
    },
    lazyLoad: {
      type: Boolean,
      default: true
    },
    round: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: "auto"
    }
  },
  watch: {
    src(newValue, preValue) {
      if (newValue && newValue.length > 0 && newValue !== preValue) {
        this.$nextTick(() => {
          this.isLoading = true;
          this.error = false;
        });
      }
    }
  },
  data() {
    return {
      isLoading: true,
      error: false
    };
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
    onLoad() {
      this.isLoading = false;
      this.error = false;
    },
    onError() {
      this.isLoading = false;
      this.error = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.image-view {
  width: 100%;
  .image {
    width: 100%;
    &.round {
      border-radius: 50%;
    }
  }
}
</style>