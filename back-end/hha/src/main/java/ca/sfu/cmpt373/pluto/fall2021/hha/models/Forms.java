package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Tables {
    /*
    label: string;
  commonColumn: CommonColumn;
  subTables: SubTable[];
  */
}

public class CommonColumn {
    /*
    label: string
  values: string[];
  */
}

public class SubTable {
    /*
    label: string;
  columns: Column[];
  */
}

public class Column {
    /*
    label: string;
  cells: Cell[];
  */
}

public class Cell {
    /*
    disabled : boolean;
  value?: number;
  type: string;
  */
}