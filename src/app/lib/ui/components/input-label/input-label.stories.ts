import { Meta } from "@storybook/angular";
import { InputLabelComponent } from "./input-label.component";

const meta: Meta<InputLabelComponent> = {
  title: "Ui/Fields/InputLabel",
  component: InputLabelComponent,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    color: {
      options: ["white", "gray"],
      control: { type: "radio" },
      required: { type: "boolean" }
    },
  },
  parameters: {
    controls: {
      include: ["label", "labelColor", "required"],
    }
  }
}

export default meta

export const BasicLabel = {
  args: {
    label: "Name",
    labelColor: "gray",
  },
}

export const RequiredLabel = {
  args: {
    label: "Amount",
    labelColor: "gray",
    required: true,
  },
}
