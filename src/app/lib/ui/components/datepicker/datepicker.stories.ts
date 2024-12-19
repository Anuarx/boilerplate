import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { DatepickerComponent } from "./datepicker.component";
import { provideNativeDateAdapter } from "@angular/material/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const meta: Meta<DatepickerComponent> = {
  title: 'Ui/Datepicker/Datepicker',
  component: DatepickerComponent,
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BrowserAnimationsModule],
      providers: [provideNativeDateAdapter()],
    })
  ],
  argTypes: {
    startDateLabel: { control: "text" },
    startDayPlaceholder: { control: "text" },
    labelColor: {
      options: ['white', 'gray'],
      control: { type: 'radio' },
    },
    max_width: { control: "boolean" },
    startDateRequired: { control: "boolean" },
  },
  parameters: {
    controls: {
      include: ['startDateLabel', 'startDayPlaceholder', 'labelColor', 'startDateRequired'],
    }
  },
}

export default meta;

type Story = StoryObj<DatepickerComponent>;

export const Example1: Story = {
  args: {
    startDateLabel: 'Fecha de inicio',
    startDayPlaceholder: 'Seleccione una fecha',
    labelColor: 'gray',
    startDateRequired: true,
  }
}
