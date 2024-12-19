import { Meta, StoryObj, argsToTemplate, moduleMetadata } from "@storybook/angular";
import { ButtonComponent } from "./button.component";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SessionService } from "@payout/shared/services/session.service";

const meta: Meta<ButtonComponent> = {
  title: "Ui/Button/Button",
  component: ButtonComponent,
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        {
          provide: SessionService, useValue: SessionService
        }
      ]
    })
  ],
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
    bg_white: { control: "boolean" },
    full_width: { control: "boolean" },
  },
  parameters: {
    controls: {
      include: ["color", "disabled", "isLoading", "spinnerColor", "bg_white", "full_width", "icon"],
    },
  },
  render: (args: ButtonComponent) => ({
    props: {
      ...args,
    },
    template: `<ui-button ${argsToTemplate(args)}>Text</ui-button>`,
  })
}

export default meta

type Story = StoryObj<ButtonComponent>

export const Example1: Story = {
  args: {
    icon: "add",
  }
}

export const Example2: Story = {
  args: {
    disabled: true,
  }
}

export const Example3: Story = {
  args: {
    isLoading: true,
  }
}
