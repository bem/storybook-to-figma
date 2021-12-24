import * as React from 'react';
import AddStorybookForm from './AddStorybookForm';
import StorybookItem from './StorybookItem';

import "../../resources/styles/storybookList.css";
import AddStorybookButton from './AddStorybookButton';

export interface IStorybookListProps {
}

export default function StorybookList (props: IStorybookListProps) {
  return (
    <div className="storybooks-list main-font">
      <StorybookItem name="Local Storybook" link="https://localhost:6006" theme="glacier" />
      <StorybookItem name="Local Storybook" link="https://localhost:6006" theme="glacier" />
      <StorybookItem name="Local Storybook" link="https://localhost:6006" theme="glacier" />
      <StorybookItem name="Local Storybook" link="https://localhost:6006" theme="glacier" />
      <StorybookItem name="Local Storybook" link="https://localhost:6006" theme="glacier" />
      <StorybookItem name="Local Storybook" link="https://localhost:6006" theme="glacier" />
      <StorybookItem name="Local Storybook" link="https://localhost:6006" theme="flowerfield" />
      <StorybookItem name="Local Storybook" link="https://localhost:6006" theme="glacier" />
      <AddStorybookButton></AddStorybookButton>
    </div>
  );
}
