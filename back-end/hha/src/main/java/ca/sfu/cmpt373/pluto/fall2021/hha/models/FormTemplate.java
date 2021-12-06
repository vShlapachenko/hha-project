package ca.sfu.cmpt373.pluto.fall2021.hha.models;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class FormTemplate {
    private String label;
    private String date;
    private List<Table> tables;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<Table> getTables() {
        return tables;
    }

    public void setTables(List<Table> tables) {
        this.tables = tables;
    }
}
