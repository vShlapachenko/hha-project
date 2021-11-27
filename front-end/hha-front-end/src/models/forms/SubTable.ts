import { Column } from "./Column";
import { SecondaryData } from './SecondaryData'

export interface SubTable {
  label: string;
  columns: Column[];
  secondaryData?: SecondaryData[]
}