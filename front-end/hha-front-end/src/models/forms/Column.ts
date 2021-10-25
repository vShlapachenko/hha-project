import { Cell } from "./Cell";

export interface Column {
  label: string;
  columns: Column[];
  cells: Cell[];
  isUsable: boolean;
}