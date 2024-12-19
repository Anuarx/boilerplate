import { FormControl } from "@angular/forms";
import { TableSelectAutocomplete } from "@ui/interfaces";

export const createEmptyTableSelectAutocomplete = <T>(data?: TableSelectAutocomplete<T>): TableSelectAutocomplete<T> => {
  return {
    required: data?.required || (() => false),
    hintMessage: data?.hintMessage || (() => ''),
    onChange: data?.onChange || (() => { }),
    dataTestId: data?.dataTestId || '',
    placeHolder: data?.placeHolder || '',
    label: data?.label || '',
    default_value: data?.default_value || '',
    options: data?.options || [],
    control: data?.control || new FormControl(),
  }
}
