package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.*;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.FormRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.FormsDraftRepository;
import com.opencsv.CSVWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FormService {
    private final FormRepository formRepository;
    private final FormsDraftRepository formsDraftRepository; 

    public Form getForm(String id) {
        return formRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Form with ID ==== " + id + " Does not exist"));
    }

    public FormsDraft getFormsDraft(String id) {
        return formsDraftRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Form Draft with ID ==== " + id + " Does not exist"));
    }

    public void saveForm(Form form) {
        formRepository.save(form);
    }

    public void saveFormAsDraft(FormsDraft formsDraft) {
        formsDraftRepository.save(formsDraft);
    }

    public void exportFormToCsv(Form form, HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition",
                "attachment; filename=" + form.getLabel() + "_" + form.getDate() + ".csv");

        CSVWriter writer = new CSVWriter(response.getWriter());

        for (Table table : form.getTables()) {
            List<String> csvHeader = new ArrayList<>();
            csvHeader.add(table.getCommonColumn().getLabel());

            for (SubTable subTable : table.getSubTables()) {
                for (Column column : subTable.getColumns()) {
                    csvHeader.add(column.getLabel());
                }
            }
            writer.writeNext(csvHeader.toArray(new String[0]));
        }

        for (Table table : form.getTables()) {
            int len = table.getCommonColumn().getValues().size();
            for (int i = 0; i < len; i++) {
                List<String> csvLines = new ArrayList<>();
                csvLines.add(table.getCommonColumn().getValues().get(i));

                for (SubTable subTable : table.getSubTables()) {
                    for (Column column : subTable.getColumns()) {
                        csvLines.add(column.getCells().get(i).getValue());
                    }
                }
                writer.writeNext(csvLines.toArray(new String[0]));
            }

            writer.close();
        }
    }
    public Form getFormByDate(String date){
        return formRepository.findByDate(date);
    }

}
