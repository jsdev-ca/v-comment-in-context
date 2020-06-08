<template>
  <!--
    The opening `div` shouldn’t be an `article`, as there’s a chance that the
    comments won’t make much (if any) sense outside of their context:

    https://html.spec.whatwg.org/multipage/sections.html#the-article-element

    Should it be a `section`, then? It’s unclear that it should be, as it isn’t
    obvious that it’s a sectioning content element.
  -->
  <div class="container">
    <div :style="{ margin: '0 10px' }">
      <!-- Leave `data-testid` alone; our unit test needs it.  -->
      <avatar data-testid="avatar" :alt="alt" :url="url" />
    </div>
    <div :style="{ margin: '0 10px' }">
      <div class="metadata">
        <div class="bold">
          {{ author }}
        </div>
        <badge :styles="colors" :text="contributorType" />
        <div v-if="whenCommentWasPosted" class="converted-timestamp"><!--
          This comment exists to ensure there’s no additional space between
          the “•” and the value.
          -->{{ whenCommentWasPosted }}
        </div>
      </div>
      <p class="comments" v-for="(text, i) in comments" :key="i">
        {{ text }}
      </p>
      <div class="calls-to-action">
        <button
          v-on:click="showCommentCard"
          :aria-label="`respond to ${author}’s comment`"
        >
          Reply
        </button>
        <button
          v-on:click="showReplies"
          :aria-label="`read the ${
            noun === 'reply' ? 'lone' : numReplies
          } ${noun} to ${author}’s comment`"
          :disabled="numReplies === 0"
          :style="{ cursor: numReplies === 0 ? 'not-allowed' : 'pointer'}"
        >
          <span :style="{ color: 'var(--grey)', marginRight: '5px' }">
            {{ numReplies }}
          </span>
          {{ noun }}
        </button>
        <div class="upvotes">
          <button
            v-on:click="dynamicUpvotes += 1"
            :aria-label="`upvote ${author}’s comment`"
          >
            <i class="gg-chevron-up" />
          </button>
          {{ dynamicUpvotes }}
        </div>
        <div class="downvotes">
          <button
            v-on:click="dynamicDownvotes += 1"
            :aria-label="`downvote ${author}’s comment`"
          >
            <i class="gg-chevron-down" />
          </button>
          {{ dynamicDownvotes }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function showCommentCard() {}

function showReplies() {}

export { showCommentCard, showReplies };

export default {
  data() {
    return {
      colors: {
        author: {
          background: '#333',
          color: '#fff'
        },
        guest: {
          background: '#0052cc',
          color: '#fff'
        }
      }[this.contributorType],
      dynamicDownvotes: this.downvotes,
      dynamicUpvotes: this.upvotes
    };
  },
  computed: {
    alt: function () {
      return `The avatar of the commenter, ${this.author}.`;
    },
    noun: function () {
      return this.numReplies === 1 ? 'reply' : 'replies';
    },
    url: function () {
      return /^.+\.(png|jpe?g|gif)$/i.test(this.avatarFilename)
        ? `../../../static/${this.avatarFilename}`
        : null;
    }
  },
  methods: {
    showCommentCard,
    showReplies
  },
  // N.B. Vue won’t provide the specified default for `null` values, so avoid
  // using `null` in the database as much as possible.

  // On a different vein, would need to speak with the designers and managers
  // about the fallback options, as well as the point at which it wouldn’t be
  // sensible to render the component at all.
  props: {
    author: {
      type: String,
      required: true,
      validator: string => string !== ''
    },
    avatarFilename: String,
    comments: {
      type: Array,
      required: true,
      validator: array => array.length > 0 && array.every(item => (
        typeof item === 'string' && item !== ''
      ))
    },
    contributorType: {
      type: String,
      required: true,
      validator: string => ['author', 'guest'].includes(string)
    },
    downvotes: {
      type: Number,
      required: true
    },
    numReplies: {
      type: Number,
      required: true
    },
    upvotes: {
      type: Number,
      required: true
    },
    whenCommentWasPosted: String
  }
};
</script>

<style lang="scss" scoped>
// Would make this a global mixin if it made sense to do so.
@mixin display-text-small($color) {
  color: $color;
  font-size: 1.2rem;
  text-transform: uppercase;
}

.container {
  border: 1px solid #ebebeb;
  border-left: 0;
  border-right: 0;
  display: flex;
  margin: 20px auto;
  min-height: 110px;
  padding: 20px 0;
  width: 600px;

  &:hover {
    .calls-to-action,
    button {
      color: var(--grey);
    }
  }
}

.metadata {
  align-items: center;
  display: flex;

  & > * {
    margin-right: 5px;

    &.converted-timestamp {
      @include display-text-small(var(--grey));

      &::before {
        content: "•";
        margin-right: 5px;
      }
    }
  }
}

.comments {
  margin: 12px 0;
  // Q: Why `80ch`?
  // A: https://www.w3.org/WAI/tutorials/page-structure/styling/#line-length
  max-width: 80ch;
}

.calls-to-action {
  align-items: center;
  color: var(--silver);
  display: flex;
  font-size: 1.2rem;

  & > * {
    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  [class$="votes"] {
    align-items: center;
    display: inline-flex;
  }

  button {
    @include display-text-small(var(--silver));

    background: none;
    border: 0;
    display: inline-flex;
    padding: 0;

    [class^="gg-chevron-"] {
      --ggs: .8;
    }
  }
}
</style>
