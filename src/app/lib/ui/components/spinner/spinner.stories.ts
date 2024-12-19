import { Meta, moduleMetadata } from "@storybook/angular";
import { SpinnerComponent } from "./spinner.component";

const meta: Meta<SpinnerComponent> = {
  title: "Ui/Spinner/Spinner",
  component: SpinnerComponent,
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      declarations: []
    })
  ],
  argTypes: {
    diameter: { control: "number" },
    strokeWidth: { control: "number" },
    color: {
      options: ["primary", "accent", "warn"],
      control: { type: "radio" },
    },
    mode: {
      options: ["determinate", "indeterminate"],
      control: { type: "radio" },
    },
  },
}

export default meta

export const BasicSpinner = {
  args: {
    color: "primary",
    diameter: 50,
    strokeWidth: 3,
    mode: "indeterminate",
  }
}

export const LargeSpinner = {
  args: {
    color: "primary",
    diameter: 100,
    strokeWidth: 3,
    mode: "indeterminate",
  }
}
