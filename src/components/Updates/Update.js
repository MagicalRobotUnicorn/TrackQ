import React, { Component } from 'react';
import moment from 'moment';
import { Comment, Image } from 'semantic-ui-react';

const isOwnUpdate= (update, user) => {
  return update.user.id === user.uid ? 'update__self' : '';
}

const isImage = (update) => {
  return update.hasOwnProperty('image');
  // && !update.hasOwnProperty('content');
}

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Update = ({ update, user }) => (
  <Comment>
    <Comment.Avatar src={update.user.avatar} />
    <Comment.Content className={isOwnUpdate(update, user)}>
      <Comment.Author as="a">{update.user.name}</Comment.Author>
      <Comment.Metadata>{timeFromNow(update.timestamp)}</Comment.Metadata>
      {console.log(isImage(update))}
      {isImage(update) ? <Image src={update.image} className="message__image" /> : 
                          <Comment.Text>
                            {update.content}
                          </Comment.Text>}
    </Comment.Content>
  </Comment>
);

export default Update;