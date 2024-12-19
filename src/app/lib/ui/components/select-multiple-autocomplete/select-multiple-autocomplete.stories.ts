import { Meta, moduleMetadata } from "@storybook/angular";
import { SelectMultipleAutocompleteComponent } from "./select-multiple-autocomplete.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ICustomSelectModel } from "../../interfaces/custom-select.interface";

const meta: Meta<SelectMultipleAutocompleteComponent> = {
  title: 'Ui/Fields/SelectMultipleAutocomplete',
  component: SelectMultipleAutocompleteComponent,
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
    required: { control: "boolean" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    valueOptions: { control: "object" },
  },
  parameters: {
    controls: {
      include: [
        "label",
        "labelColor",
        "placeHolder",
        "required",
        "fullWidth",
        "disabled",
        "valueOptions",
      ],
    }
  }
}

export default meta

const options: ICustomSelectModel[] = [
  { label: "Banana", value: "option1" },
  { label: "Manzana", value: "option2" },
  { label: "Frutilla", value: "option3" },
]

export const BasicSelect = {
  args: {
    label: "Select an option",
    labelColor: "gray",
    placeHolder: "Select an option",
    valueOptions: options,
    fullWidth: true,
  },
}
