import { Column } from "./Column";
import { CommonColumn } from "./CommonColumn";
import { SubTable } from "./SubTable";

export interface Table {
  label: string;
  commonColumn: CommonColumn;
  subTables: SubTable[];
  // columns: Column[];
}