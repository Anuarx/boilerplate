import { Meta, argsToTemplate, moduleMetadata } from "@storybook/angular";
import { MessageStatusListComponent } from "./message-status-list.component";
import { MatCardModule } from "@angular/material/card";

const meta: Meta<MessageStatusListComponent> = {
  title: 'Ui/List/MessageStatusList',
  component: MessageStatusListComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MatCardModule]
    })
  ],
  parameters: {
    controls: {
      include: ["messageStatusListInput"],
    }
  },
  args: {
    messageStatusListInput: [{
      label: "Label",
      value: "Value",
      text: "Text",
      icon: "Icon",
      error: false,
    }] as any
  },
  argTypes: {
    messageStatusListInput: { control: "object" },
  },
  render: (args: MessageStatusListComponent) => ({
    props: {
      ...args,
    },
    template: `<mat-card style="padding: 15px; border-radius: 12px">
    <ui-message-status-list ${argsToTemplate(args)}>
      <div style="padding: 15px; border-radius: 10px; margin-top: 10px;" slot="button">
        OverlayInputContent
      </div>
    </ui-message-status-list>
    </mat-card>`,
  })
}

export default meta

export const DummyList = {
  args: {
    messageStatusListInput: [
      {
        label: "ID",
        value: "123",
        text: "An error occurred while processing the request",
        icon: "Icon",
        error: true,
      },
      {
        label: "ID",
        value: "1323",
        text: "Processed successfully",
        icon: "Icon",
        error: false,
      },
    ] as any
  },
}
