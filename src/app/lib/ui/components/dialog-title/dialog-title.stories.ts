import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { DialogTitleComponent } from "./dialog-title.component";
import { Component } from "@angular/core";

@Component({
  selector: "app-dialog-title",
  template: "",
})
class mockComponent { }

const meta: Meta<DialogTitleComponent<mockComponent>> = {
  title: "Ui/Dialog/Dialog Title",
  component: DialogTitleComponent,
  decorators: [
    moduleMetadata({
      declarations: [mockComponent],
    }),
  ],
  tags: ["autodocs"],
  argTypes: {
    dialogTitleInput: { control: "object" },
  },
  parameters: {
    controls: {
      include: ["dialogTitleInput"],
    },
  }
}

export default meta

type Story = StoryObj<DialogTitleComponent<mockComponent>>

export const Example1: Story = {
  parameters: {
    controls: {
      include: ["dialogTitleInput"],
    }
  },
  args: {
    dialogTitleInput: {
      title: 'Dialog Title',
      icon: 'close',
      dialogRef: null
    } as any
  }
}
