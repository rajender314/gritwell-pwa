import React from 'react';
import {Story, Meta} from '@storybook/react';
import Button from './button';

type Props = {
  variant?: 'primary' | 'secondary' | 'disabled' | 'warm'
  size?: 'small' | 'medium' | 'large'
  width?: string
  type?: 'button' | 'submit'
  onClick?: (e) => void
  children: any
}
export default {
  title: 'Button',
  component: Button,
  argTypes: {
    onClick: {action: 'clicked'},
    size: {
      options: ['small', 'medium', 'large'],
      control: {type: 'radio'},
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary',
};

export const Warm = Template.bind({});
Warm.args = {
  variant: 'warm',
  children: 'Warm',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'disabled',
  children: 'Disabled',
};
