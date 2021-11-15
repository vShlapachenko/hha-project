package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

public class Column {
    private String label;
    private List<Cell> cells;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<Cell> getCells() {
        return cells;
    }

    public void setCells(List<Cell> cells) {
        this.cells = cells;
    }
}