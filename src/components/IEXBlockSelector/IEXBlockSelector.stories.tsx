import React from 'react';
import { Story, Meta } from '@storybook/react';
import IEXBlockSelector, {IEXBlockSelectorProps} from './IEXBlockSelector';

export default {
  title: 'IEXBlockSelector',
  component: IEXBlockSelector,
} as Meta;

const Template: Story<IEXBlockSelectorProps> = (args) => <IEXBlockSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  selectionOptions: {}
};
export const MultipleOptions = Template.bind({});
MultipleOptions.args = {
  selectionOptions: {
    tick: {
      title: 'Tick',
      blockKey: 'tick'
    },
    overview: {
      title: 'Overview',
      blockKey: 'overview'
    }
  }
};