<template>
  <div class="badge" :style="styles">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      validator: object => Object.values(object).every(value => (
        typeof value === 'number' && !isNaN(value) || typeof value === 'string'
      ))
    },
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.badge {
  border-radius: 12px;
  display: inline-flex;
  font-variant: small-caps;
  height: 2rem;
  line-height: 2rem;
  padding: 0 12px;
}
</style>
