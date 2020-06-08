<template>
  <div>
    <div v-if="isLoading">
      Loading...
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="comments">
      <comment
        v-for="comment in comments"
        v-bind="{...comment}"
        :key="comment.id"
      />
    </div>
  </div>
</template>

<script>
import Comment from './components/comment/Comment.vue';

export default {
  created() {
    this.getComments();
  },
  data() {
    return {
      comments: null,
      error: null,
      isLoading: true
    };
  },
  components: {
    comment: Comment
  },
  methods: {
    getComments() {
      fetch('static/dummy-data.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Oops! We couldn’t fetch your dummy data.');
          }

          return response.json();
        })
        .then(comments => {
          // In reality, of course, there’d be a timestamp — ISO 8601 or Unix,
          // say — to work with, and likely some “serialization” before there
          // could be any assignment to `this.comments`.
          this.comments = comments;
        })
        .catch(error => {
          this.error = error;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
