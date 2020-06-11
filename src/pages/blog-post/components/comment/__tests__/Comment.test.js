import { render, fireEvent } from '@testing-library/vue';
import { config, mount } from '@vue/test-utils';

import Comment, { showCommentCard, showReplies } from '../Comment.vue';

config.showDeprecationWarnings = false;

describe('Comment', () => {
  const options = {
    methods: {},
    propsData: {
      author: 'Yoda',
      avatarFilename: 'yoda.png',
      comments: [
        'Turned to the dark side, Anakin Skywalker has.'
      ],
      contributorType: 'author',
      downvotes: 1,
      numReplies: 100,
      upvotes: 1000
    },
    stubs: [
      'avatar',
      'badge'
    ]
  };
  let localOptions;

  beforeEach(() => {
    localOptions = JSON.parse(JSON.stringify(options));
  });

  it('matches the existing snapshot', () => {
    const wrapper = mount(Comment, localOptions);

    expect(wrapper.element).toMatchSnapshot();
  });

  describe('avatar', () => {
    it('has a `url` attribute with a valid value when the filename is valid', () => {
      /**
       * Alas, we can’t get our avatar stub via `getByAltText(
       *   /^The avatar of the commenter, .+\.$/
       * )`. Oh well.
       */
      const { getByTestId } = render(Comment, localOptions);
      const avatar = getByTestId('avatar');

      expect(avatar).toHaveAttribute(
        'url',
        `../../../static/${localOptions.propsData.avatarFilename}`
      );
    });

    it('lacks a `url` attribute when the filename is invalid', () => {
      localOptions.propsData.avatarFilename = 'yoda.jaypeg';

      const { getByTestId } = render(Comment, localOptions);
      const avatar = getByTestId('avatar');

      expect(avatar).not.toHaveAttribute('url');
    });
  });

  describe('reply button', () => {
    it('returns `undefined` when clicked', async () => {
      localOptions.methods.showCommentCard = jest.fn(showCommentCard);

      const { getByLabelText } = render(Comment, localOptions);
      const showCommentCardButton = getByLabelText(/^respond to .+’s comment$/);
      const spy = jest.spyOn(localOptions.methods, 'showCommentCard');

      await fireEvent.click(showCommentCardButton);

      expect(spy).toHaveReturnedWith(undefined);
    });
  });

  describe('{n} replies button', () => {
    describe('when there are 0 replies', () => {
      it('is disabled', () => {
        localOptions.propsData.numReplies = 0;

        const { getByLabelText } = render(Comment, localOptions);
        const showReplyButton = getByLabelText(/^read the 0 replies to .+’s comment$/);

        expect(showReplyButton).toBeDisabled();
      });
    });

    describe('when there’s 1 reply', () => {
      it('is enabled and has “read the lone reply to {authorName}’s comment” as its ARIA label', () => {
        localOptions.propsData.numReplies = 1;

        const { getByLabelText } = render(Comment, localOptions);
        const showReplyButton = getByLabelText(/^read the lone reply to .+’s comment$/);

        expect(showReplyButton).toBeEnabled();
      });
    });

    describe('when there are 100 replies', () => {
      it('is enabled and has “read the 100 replies to {authorName}’s comment” as its ARIA label', () => {
        const { getByLabelText } = render(Comment, localOptions);
        const showReplyButton = getByLabelText(/^read the 100 replies to .+’s comment$/);

        expect(showReplyButton).toBeEnabled();
      });

      it('returns `undefined` when clicked', async () => {
        localOptions.methods.showReplies = jest.fn(showReplies);

        const { getByLabelText } = render(Comment, localOptions);
        const showReplyButton = getByLabelText(/^read the 100 replies to .+’s comment$/);
        const spy = jest.spyOn(localOptions.methods, 'showReplies');

        await fireEvent.click(showReplyButton);

        expect(spy).toHaveReturnedWith(undefined);
      });
    });
  });

  describe('upvotes', () => {
    it('increment by 1 on upvote button click', async () => {
      const { getByLabelText, getByText } = render(Comment, localOptions);
      const upvoteButton = getByLabelText(/^upvote .+’s comment$/i);
  
      getByText('1000');

      await fireEvent.click(upvoteButton);
    
      getByText('1001');
    });
  });

  describe('downvotes', () => {
    it('increment by 1 on downvote button click', async () => {
      const { getByLabelText, getByText } = render(Comment, localOptions);
      const downvoteButton = getByLabelText(/^downvote .+’s comment$/i);

      getByText('1');

      await fireEvent.click(downvoteButton);

      getByText('2');
    });
  });
});
