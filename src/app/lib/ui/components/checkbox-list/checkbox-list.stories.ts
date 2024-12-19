import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CheckboxListComponent } from "./checkbox-list.component";

const meta: Meta<CheckboxListComponent> = {
  title: "Ui/Checkbox/CheckboxList",
  tags: ["autodocs"],
  component: CheckboxListComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, CheckboxListComponent],
    })
  ],
  argTypes: {
    checkboxList: { control: "object" },
  },
}

export default meta

type Story = StoryObj<CheckboxListComponent>

export const BasicCheckboxList: Story = {
  args: {
    checkboxList: [
      {
        disabled: false,
        checked: false,
        onChange: () => { },
        label: "Basic Checkbox 1",
      },
      {
        disabled: false,
        checked: true,
        onChange: () => { },
        label: "Basic Checkbox 2",
      },
      {
        disabled: true,
        checked: false,
        onChange: () => { },
        label: "Basic Checkbox 2",
      },
      {
        disabled: false,
        checked: false,
        onChange: () => { },
        label: "Basic Checkbox 2",
      },
    ] as any
  }
}
