<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">
          Home
        </router-link>
        <router-link to="/blog-post">
          Blog Post
        </router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
/**
 * Under normal circumstances, we would not be making separate requests for
 * these assets, if we wanted to use them at all.
 *
 * If CSS icons weren’t an option, and we had to use SVGs, we could add `file-
 * loader` to webpack to resolve the paths to the SVGs, or we could opt for
 * the slightly clumsy approach suggested here:
 *
 * https://vuejs.org/v2/cookbook/editable-svg-icons.html
 */
@import url('https://css.gg/chevron-down.css');
@import url('https://css.gg/chevron-up.css');
@import url('https://css.gg/user.css');

@import './global-styles/main';
</style>
