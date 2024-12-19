import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { BaseTableComponent } from "./base-table.component";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const meta: Meta<BaseTableComponent<any>> = {
  title: 'Ui/DataTable/BaseTable',
  component: BaseTableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
  argTypes: {
    baseTable: { control: 'object' },
    showActions: { control: 'boolean' },
    selecteable: { control: 'boolean' },
  },
  parameters: {
    controls: {
      include: ['baseTable', 'showActions', 'selecteable'],
    },
  },
}

export default meta

type Story = StoryObj<BaseTableComponent<any>>

const mockData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'jon@gmail.com',
    phone: '123456789',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'jon@gmail.com',
    phone: '123456789',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'jon@gmail.com',
    phone: '123456789',
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'jon@gmail.com',
    phone: '123456789',
  }
]

export const BasicTable: Story = {
  args: {
    baseTable: {
      dataSource: mockData,
      columns: [
        {
          caption: 'Name',
          field: {
            key: 'name'
          },
          show: true,
        },
        {
          caption: 'Email',
          field: {
            key: 'email'
          },
          show: true,
        },
        {
          caption: 'Phone',
          field: {
            key: 'phone',
          },
          show: true
        }
      ]
    },
  }
}

export const SelecteableTable: Story = {
  args: {
    selecteable: true,
    baseTable: {
      dataSource: mockData,
      columns: [
        {
          caption: 'select',
          field: {
            key: ''
          },
          show: true,
        },
        {
          caption: 'Name',
          field: {
            key: 'name'
          },
          show: true,
        },
        {
          caption: 'Email',
          field: {
            key: 'email'
          },
          show: true,
        },
        {
          caption: 'Phone',
          field: {
            key: 'phone'
          },
          show: true
        }
      ],
      disableRowSelector: () => { return false }
    }
  }
}

export const PaginatedTable: Story = {
  args: {
    baseTable: {
      dataSource: mockData,
      columns: [
        {
          caption: 'Name',
          field: {
            key: 'name'
          },
          show: true,
        },
        {
          caption: 'Email',
          field: {
            key: 'email'
          },
          show: true,
        },
        {
          caption: 'Phone',
          field: {
            key: 'phone'
          },
          show: true
        }
      ],
      paginateOptions: {
        page: 0,
        pageSize: 4,
        pageSizeOptions: [4, 5, 10],
        totalCount: 4,
      }
    }
  }
}

