import React from 'react';
import PropTypes from 'prop-types';

const Posts = ({ posts }) => (
  <ul>
    {posts.map(post => (
      <li key={post.title}>
        {post.title}
      </li>
    ))}
  </ul>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired, // eslint-disable-line
};

export default Posts;
