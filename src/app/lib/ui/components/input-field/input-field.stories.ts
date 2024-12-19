import { Meta, moduleMetadata } from "@storybook/angular";
import { InputFieldComponent } from "./input-field.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const meta: Meta<InputFieldComponent> = {
  title: "Ui/Fields/InputField",
  component: InputFieldComponent,
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule]
    })
  ],
  argTypes: {
    label: { control: "text" },
    labelColor: {
      options: ["white", "gray"],
      control: { type: "radio" },
    },
    type: { control: "text" },
    maxLength: { control: { type: "range", min: 0, max: 100 } },
    textArea: { control: "boolean" },
    required: { control: "boolean" },
    max_width: { control: "boolean" },
    value: { table: { disable: true } }
  },
  parameters: {
    controls: {
      include: ["label", "labelColor", "type", "maxLength", "textArea", "required", "max_width", "value"],
    }
  }
}

export default meta

export const BasicField = {
  args: {
    label: "Name",
    labelColor: "gray",
  },
}

export const RequiredField = {
  args: {
    label: "Amount",
    labelColor: "gray",
    required: true,
    type: "number",
  },
}

export const MaxWidthField = {
  args: {
    label: "MaxWidthField",
    labelColor: "gray",
    max_width: true,
  },
}
