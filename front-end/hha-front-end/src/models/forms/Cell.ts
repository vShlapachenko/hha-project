import { SubTable } from "./SubTable";
import { Table } from "./Table";

export interface Cell {
  disabled : boolean;
  value?: number;
  type: string;
  optionalData?: Table[]
}