import { Column } from "./Column";
import { CommonColumn } from "./CommonColumn";

export interface Table {
  label: string;
  commonColumn: CommonColumn;
  columns: Column[];
}