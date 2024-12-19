import { Meta, componentWrapperDecorator } from "@storybook/angular";
import { CustomSpinnerComponent } from "./custom-spinner.component";

const meta: Meta<CustomSpinnerComponent> = {
  title: "Ui/Spinner/Image Spinner",
  component: CustomSpinnerComponent,
  tags: ["autodocs"],
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="display: flex; justify-content: center;">${story}</div>`
    ),
  ],
  argTypes: {
    diameter: { control: "text" },
    spinnerButton: { control: "text" },
    color: { control: "text" },
    mode: { control: "text" },
    value: { control: "number" },
  },
};

export default meta;

export const Example1 = (args: CustomSpinnerComponent) => ({
  props: {
    ...args,
  },
});
