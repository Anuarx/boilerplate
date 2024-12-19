import { Meta, argsToTemplate, componentWrapperDecorator } from "@storybook/angular";
import { OverlayButtonComponent } from "./overlay-button.component";

const meta: Meta<OverlayButtonComponent> = {
  title: "Ui/Overlay/OverlayButton",
  component: OverlayButtonComponent,
  tags: ["autodocs"],
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="display: flex; justify-content: center;">${story}</div>`
    )
  ],
  parameters: {
    controls: {
      include: ["overlayButtonInput"],
    }
  },
  argTypes: {
    overlayButtonInput: { control: "object" },
  },
  args: {
    overlayButtonInput: {
      text: "Button",
      icon: "",
      color: "primary",
      isOpen: false,
      isLoading: false
    } as any
  },
  render: (args: OverlayButtonComponent) => ({
    props: {
      ...args,
    },
    template: `<ui-overlay-button ${argsToTemplate(args)}>
      <div style="background-color: #6777ef; color: white; padding: 15px; border-radius: 10px; margin-top: 10px;" slot="button">
        OverlayInputContent
      </div>
    </ui-overlay-button>`,
  })
}

export default meta

export const BasicOverlay = {
  args: {
    overlayButtonInput: {
      text: "Button",
      icon: "",
      color: "primary",
      isOpen: false,
      isLoading: false,
      menuStyle: false,
    }
  }
}

export const LoadingOverlay = {
  args: {
    overlayButtonInput: {
      text: "Button",
      icon: "",
      color: "primary",
      isOpen: false,
      isLoading: true,
      menuStyle: false,
    } as any
  }
}
