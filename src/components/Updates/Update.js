import React, { Component } from 'react';
import moment from 'moment';
import { Comment, Image, Grid } from 'semantic-ui-react';

// display code function

const isOwnUpdate= (update, user) => {
  return update.user.id === user.uid ? 'update__self' : '';
}

const isImage = (update) => {
  return update.hasOwnProperty('image');
  // && !update.hasOwnProperty('content');
}

const timeFromNow = timestamp => moment(timestamp).fromNow();


// Rewrite as Celled Grid components
const Update = ({ update, user }) => (
  // Grid Celled Row as Return for each Update
  <Grid.Row>
    <Grid.Column width={3}>
      
    </Grid.Column>
    
  </Grid.Row>
  // <Comment>
  //   {/* Three Celled for QR Code */}
  //   <Comment.Avatar src={update.user.avatar} />
  //   <Comment.Content className={isOwnUpdate(update, user)}>
  //     <Comment.Author as="a">{update.user.name}</Comment.Author>
  //     <Comment.Metadata>{timeFromNow(update.timestamp)}</Comment.Metadata>
  //     {console.log(isImage(update))}
  //     {isImage(update) ? <Image src={update.image} className="message__image" /> : 
  //                         <Comment.Text>
  //                           {update.content}
  //                         </Comment.Text>}
  //   </Comment.Content>
  // </Comment>
);

export default Update;