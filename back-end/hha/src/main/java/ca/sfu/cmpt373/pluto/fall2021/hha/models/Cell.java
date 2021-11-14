package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

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