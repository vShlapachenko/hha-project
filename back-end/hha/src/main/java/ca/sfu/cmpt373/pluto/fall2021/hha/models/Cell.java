package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

public class Cell {
    private String type; 
    private boolean disabled;
    private String value;

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
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

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }
}