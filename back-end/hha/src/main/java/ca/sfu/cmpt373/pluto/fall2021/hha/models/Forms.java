package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Document
public class Tables {

    private String label; 
    private 


    public String getLabel() {
        return this.label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}

public class CommonColumn {
    private String label; 
    private List<String> values;

    public String getLabel() {
        return this.label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}

public class SubTable {
    private String label; 

    public String getLabel() {
        return this.label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}

public class Column {
    private String label;
    
    public String getLabel() {
        return this.label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}

public class Cell {
    private String rowLabel; 
    private boolean disabled;
    private String value;

    public String getRowLabel() {
        return this.rowLabel;
    }

    public void setRowLabel(String rowLabel) {
        this.rowRabel = rowLabel;
    }

    public String getValue() {
        return this.value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public boolean getDisabled() {
        return this.disabled;
    }

    public void setDisabled(booleam disabled) {
        this.disabled = disabled;
    }
}