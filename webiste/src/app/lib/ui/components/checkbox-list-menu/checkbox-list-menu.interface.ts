import { CheckboxInput } from "../checkbox/checkbox.interfaces";
import { CustomMenuInput } from "../custom-menu/custom-menu.interfaces";

export interface CheckListMenuInput {
  menu: CustomMenuInput;
  checkboxList: CheckboxInput[]
}
