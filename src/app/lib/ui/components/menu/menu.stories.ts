import { Meta, moduleMetadata } from "@storybook/angular";
import { MenuComponent } from "./menu.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const meta: Meta<MenuComponent> = {
  title: "Ui/Menu/IconButtonMenu",
  component: MenuComponent,
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    })
  ],
  argTypes: {
    actions: { control: "object" },
  },
  parameters: {
    controls: {
      include: ["actions"],
    }
  }
}

export default meta

export const BasicMenu = {
  args: {
    actions: [
      {
        name: 'Action 1',
        hide: () => { return false },
        action: () => { }
      },
      {
        name: 'Action 2',
        hide: () => { return false },
        action: () => { }
      }
    ],
  },
}

export const HiddenActionsMenu = {
  args: {
    actions: [
      {
        name: 'Action 1',
        hide: () => { return true },
        action: () => { }
      },
      {
        name: 'Action 2',
        hide: () => { return false },
        action: () => { }
      }
    ],
  },
}
