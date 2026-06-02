import type { Meta, StoryObj } from '@storybook/react';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Accordion>;

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.';

export const Default: Story = {
  render: () => (
    <Accordion>
      <Accordion.Item title="What is UIForge?">{lorem}</Accordion.Item>
      <Accordion.Item title="How does theming work?">{lorem}</Accordion.Item>
      <Accordion.Item title="Is it accessible?">{lorem}</Accordion.Item>
    </Accordion>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Accordion variant="bordered" defaultOpen={[0]}>
      <Accordion.Item title="First item — open by default">{lorem}</Accordion.Item>
      <Accordion.Item title="Second item">{lorem}</Accordion.Item>
      <Accordion.Item title="Third item (disabled)" disabled>
        {lorem}
      </Accordion.Item>
    </Accordion>
  ),
};

export const AllowMultiple: Story = {
  render: () => (
    <Accordion allowMultiple defaultOpen={[0, 1]}>
      <Accordion.Item title="Section one">{lorem}</Accordion.Item>
      <Accordion.Item title="Section two">{lorem}</Accordion.Item>
      <Accordion.Item title="Section three">{lorem}</Accordion.Item>
    </Accordion>
  ),
};
