import { Meta, argsToTemplate, moduleMetadata } from "@storybook/angular";
import { PageTemplateComponent } from "./page-template.component";
import { ButtonComponent } from "../button/button.component";
import { InputFieldComponent } from "../input-field/input-field.component";

const meta: Meta<PageTemplateComponent> = {
  title: "Ui/Template/PageTemplate",
  component: PageTemplateComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, InputFieldComponent,],
    })
  ],
  argTypes: {
    title: { control: "text" },
    icon: { control: "text" },
    filters: { control: "boolean" },
    actions: { control: "boolean" },
  },
  args: {
    title: "Title",
    icon: "dashboard",
    filters: true,
    actions: true,
  },
  render: (args: PageTemplateComponent) => ({
    props: {
      ...args,
    },
    template: `<app-page-template ${argsToTemplate(args)}>
      <div slot="filters">
        <ui-input-field [max_width]=true label="Name"></ui-input-field>
      </div>
      <div slot="actions" style="display: flex;align-items:center;gap:10px">
        <ui-button>Filter</ui-button>
        <ui-button>Create payout</ui-button>
      </div>
      <div slot="content">
        Content
      </div>
    </app-page-template>`,
  })
}

export default meta

export const BasicPageTemplate = {
  args: {
    title: "Title",
    icon: "dashboard",
    filters: false,
    actions: false,
  }
}

export const ActionsPageTemplate = {
  args: {
    title: "Title",
    icon: "dashboard",
    filters: true,
    actions: true,
  }
}
