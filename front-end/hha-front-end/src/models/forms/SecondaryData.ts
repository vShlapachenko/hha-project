import { Table } from "./Table";

export interface SecondaryData {
  table: Table,
  isPatientData: boolean,
  cellLocation: number[]
}