import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { CheckboxComponent } from "./checkbox.component";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const meta: Meta<CheckboxComponent> = {
  title: "Ui/Checkbox/Checkbox",
  tags: ["autodocs"],
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule, CheckboxComponent],
    })
  ],
  argTypes: {
    checkboxInput: { control: "object" },
  },
}

export default meta

type Story = StoryObj<CheckboxComponent>

export const BasicCheckbox: Story = {
  args: {
    checkboxInput: {
      disabled: false,
      checked: false,
      onChange: () => { },
      label: "Basic Checkbox",
    } as any
  }
}
