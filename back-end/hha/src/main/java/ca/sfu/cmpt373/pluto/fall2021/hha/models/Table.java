package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

public class Tables {

    private String label; 
    private CommonColumn commonColumn;
    private List<SubTable> subTables;

    public String getLabel() {
        return this.label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}