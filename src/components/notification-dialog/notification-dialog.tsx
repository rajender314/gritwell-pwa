import React from 'react';
import {DialogWrapper,
  DialogContainer,
  IconContainer,
  Title,
  Text} from './dialog.components';
import Button from '../button';
import Icon from '../icon';

export const NotificationDialog = (props: any) => {
  return (
    <DialogWrapper>
      <DialogContainer>
        <IconContainer> <Icon name="check" /></IconContainer>
        <Title>{props.header}</Title>
        <Text>{props.description}</Text>
        <Button variant={'primary'}
          width='auto'
          onClick={()=> {
            props.onCancel('confirm');
          }}
        >Okay</Button>
      </DialogContainer>
    </DialogWrapper>
  );
};


export default NotificationDialog;
