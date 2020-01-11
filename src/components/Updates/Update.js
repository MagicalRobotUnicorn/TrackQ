import React, { Component } from 'react';
import moment from 'moment';
import { Comment } from 'semantic-ui-react';

const isOwnUpdate= (update, user) => {
  return update.user.id === user.uid ? 'message__self' : '';
}

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Update = ({ update, user }) => (
  <Comment>
    <Comment.Avatar src={update.user.avatar} />
    <Comment.Content className={isOwnUpdate(update, user)}>
      <Comment.Author as="a">{update.user.name}</Comment.Author>
      <Comment.Metadata>{timeFromNow(update.timestamp)}</Comment.Metadata>
      <Comment.Text>{update.content}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default Update;