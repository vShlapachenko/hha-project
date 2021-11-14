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
public class Form {
    private String label; 
    private Table tables;
    /*
    date?: string 
    */
  }