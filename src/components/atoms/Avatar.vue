<template>
  <img
    v-if="url"
    :alt="alt"
    class="avatar"
    height="40px"
    :src="url"
    width="40px"
  >
  <div class="default-avatar" v-else>
    <i class="gg-user" />
  </div>
</template>

<script>
export default {
  props: {
    alt: {
      type: String,
      default: ''
    },
    url: String
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
}

.default-avatar {
  align-items: center;
  border: 1px solid var(--silver);
  border-radius: 50%;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;

  .gg-user {
    --ggs: 1.2;
  }
}
</style>
