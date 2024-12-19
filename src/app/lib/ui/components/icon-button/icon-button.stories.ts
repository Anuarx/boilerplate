import { Meta, moduleMetadata } from "@storybook/angular";
import { IconButtonComponent } from "./icon-button.component";
import { MatIconModule } from "@angular/material/icon";

const meta: Meta<IconButtonComponent> = {
  title: "Ui/Button/Icon Button",
  component: IconButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [MatIconModule],
    }),
  ],
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: ["primary", "accent", "warn"],
      control: { type: "radio" },
    },
    disabled: { control: "boolean" },
    isLoading: { control: "boolean" },
    spinnerColor: {
      options: ["primary", "accent", "warn"],
      control: { type: "radio" },
    },
  },
  parameters: {
    controls: {
      include: ["color", "disabled", "isLoading", "spinnerColor", "bg_white", "full_width"],
    },
  },
}

export default meta

export const Example1 = {
  parameters: {
    controls: {
      include: ["color", "disabled", "isLoading", "spinnerColor", "bg_white", "full_width", "icon"],
    }
  },
  args: {
    icon: 'more_vert'
  }
}

export const Example2 = {
  parameters: {
    controls: {
      include: ["color", "disabled", "isLoading", "spinnerColor", "bg_white", "full_width", "icon"],
    }
  },
  args: {
    icon: 'close'
  }
}
