import React from 'react';
import { Story, Meta } from '@storybook/react';
import IEXBlock, {IEXBlockProps} from './IEXBlock';

export default {
  title: 'IEXBlock',
  component: IEXBlock,
} as Meta;

const Template: Story<IEXBlockProps> = (args) => <IEXBlock {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Block Title'
};