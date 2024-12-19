import { Meta, argsToTemplate, componentWrapperDecorator, moduleMetadata } from "@storybook/angular";
import { CustomMenuComponent } from "./custom-menu.component";

const meta: Meta<CustomMenuComponent> = {
  title: 'Ui/Menu/Dummy Menu',
  component: CustomMenuComponent,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: ["customMenuInput"],
    }
  },
  args: {
    customMenuInput: {
      overlayButtonInput: {
        text: "Button",
        icon: "",
        color: "primary",
        isOpen: false,
        isLoading: false
      }
    } as any
  },
  argTypes: {
    customMenuInput: { control: "object" },
  },
  render: (args: CustomMenuComponent) => ({
    props: {
      ...args,
    },
    template: `<ui-custom-menu ${argsToTemplate(args)}>
      <div style="padding: 15px; border-radius: 10px; margin-top: 10px;" slot="button">
        OverlayInputContent
      </div>
    </ui-custom-menu>`,
  })
}

export default meta

export const DummyMenu = {
  args: {
    customMenuInput: {
      overlayButtonInput: {
        text: "",
        icon: "more_horiz",
        color: "primary",
        isOpen: false,
        isLoading: false
      }
    } as any
  }
}
