import { IColumns } from '../../../../../ui';
import { Cultivar } from '../../../interfaces/cultivares.interfaces';

export interface CultivaresViewTableInput {
  cultivares: Cultivar[];
  totalCount: number;
  isLoading: boolean;
}

export const cultivarViewTableColumns: IColumns<Cultivar>[] = [
  {
    caption: 'Densidad de Siembra',
    field: {
      key: 'densidadSiembra',
      parseElement: (element: Cultivar) =>
        element.densidadSiembra ? element.densidadSiembra : 'N/A',
    },
    show: true,
  },
  {
    caption: 'Ciclo de floración',
    field: {
      key: 'cicloFloracion',
      parseElement: (element: Cultivar) =>
        element.cicloFloracion ? element.cicloFloracion : 'N/A',
    },
    show: true,
  },
  {
    caption: 'Habito',
    field: {
      key: 'habito',
      parseElement: (element: Cultivar) =>
        element.habito ? element.habito : 'N/A',
    },
    show: true,
  },
  {
    caption: 'Usos sugeridos',
    field: {
      key: 'usosSugeridos',
      parseElement: (element: Cultivar) => element.usosSugeridos ? element.usosSugeridos : 'N/A'
    },
    show: true,
  },
];
