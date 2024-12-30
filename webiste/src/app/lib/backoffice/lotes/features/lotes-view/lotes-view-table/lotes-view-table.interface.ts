import { IColumns } from '../../../../../ui';
import { Lote } from '../../../interfaces/lote.interface';

export interface LoteesViewTableInput {
  lotes: Lote[];
  totalCount: number;
  isLoading: boolean;
}

export const lotesViewTableColumns: IColumns<Lote>[] = [
  {
    caption: 'Lote',
    field: {
      key: 'lote',
      parseElement: (element: Lote) =>
        element.lote? element.lote : 'N/A',
    },
    show: true,
  },
  {
    caption: 'Departamento de origen',
    field: {
      key: 'departamento',
      parseElement: (element: Lote) =>
        element.departamento ? element.departamento : 'N/A',
    },
    show: true,
  },
  {
    caption: 'Pureza(%)',
    field: {
      key: 'pureza',
      parseElement: (element: Lote) =>
        element.pureza ? element.pureza : 'N/A',
    },
    show: true,
  },
  {
    caption: 'Germinación(%)',
    field: {
      key: 'germinacion',
      parseElement: (element: Lote) =>
        element.germinacion ? element.germinacion : 'N/A',
    },
    show: true,
  },
];