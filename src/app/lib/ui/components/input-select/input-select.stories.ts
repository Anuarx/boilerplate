import { Meta, moduleMetadata } from "@storybook/angular";
import { InputSelectComponent } from "./input-select.component";
import { ICustomSelectModel } from "../../interfaces/custom-select.interface";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const meta: Meta<InputSelectComponent> = {
  title: "Ui/Fields/InputSelect",
  component: InputSelectComponent,
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
    multiple: { control: "boolean" },
    required: { control: "boolean" },
    max_width: { control: "boolean" },
    disabled: { control: "boolean" },
    valueOptions: { control: "object" },
  },
  parameters: {
    controls: {
      include: ["label", "labelColor", "multiple", "required", "max_width", "disabled", "valueOptions"],
    }
  }
}

export default meta

const options: ICustomSelectModel[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
]

export const BasicSelect = {
  args: {
    label: "Option",
    labelColor: "gray",
    valueOptions: options,
  },
}

export const MultipleSelect = {
  args: {
    label: "Option",
    labelColor: "gray",
    required: true,
    valueOptions: options,
    multiple: true,
  },
}
