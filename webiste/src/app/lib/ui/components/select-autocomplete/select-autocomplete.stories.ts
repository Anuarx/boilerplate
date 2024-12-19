import { Meta, moduleMetadata } from "@storybook/angular";
import { SelectAutocompleteComponent } from "./select-autocomplete.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ICustomSelectModel } from "../../interfaces/custom-select.interface";

const meta: Meta<SelectAutocompleteComponent> = {
  title: "Ui/Fields/SelectAutocomplete",
  component: SelectAutocompleteComponent,
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
    placeHolder: { control: "text" },
    type: {
      options: ["text", "number", "email", "password"],
      control: { type: "radio" },
    },
    required: { control: "boolean" },
    max_width: { control: "boolean" },
    disabled: { control: "boolean" },
    options: { control: "object" },
  },
  parameters: {
    controls: {
      include: [
        "label",
        "labelColor",
        "placeHolder",
        "type",
        "required",
        "max_width",
        "disabled",
        "options",
      ],
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
    label: "Select an option",
    labelColor: "gray",
    placeHolder: "Select an option",
    options: options,
  },
}
