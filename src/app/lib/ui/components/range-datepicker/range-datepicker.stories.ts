import { Meta, moduleMetadata } from "@storybook/angular";
import { RangeDatepickerComponent } from "./range-datepicker.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideNativeDateAdapter } from "@angular/material/core";

const meta: Meta<RangeDatepickerComponent> = {
  title: "Ui/Datepicker/RangeDatepicker",
  component: RangeDatepickerComponent,
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      providers: [provideNativeDateAdapter()]
    })
  ],
  argTypes: {
    label: { control: "text" },
    labelColor: {
      options: ["white", "gray"],
      control: { type: "radio" },
    },
    max_width: { control: "boolean" },
    required: { control: "boolean" },
  },
  parameters: {
    controls: {
      include: [
        "label",
        "labelColor",
        "max_width",
        "required",
      ],
    },
  },
};

export default meta;

export const BasicRangeDatepicker = {
  args: {
    label: "Start date - End date",
    labelColor: "gray",
    max_width: true,
    required: true,
  },
};
