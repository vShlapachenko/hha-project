package ca.sfu.cmpt373.pluto.fall2021.hha.services;

import ca.sfu.cmpt373.pluto.fall2021.hha.models.*;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.FormRepository;
import ca.sfu.cmpt373.pluto.fall2021.hha.repositories.FormsDraftRepository;
import lombok.RequiredArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.CsvListWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
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

    // Reference: https://www.codejava.net/frameworks/spring-boot/csv-export-example
    public void exportFormToCsv(String label, HttpServletResponse response) throws IOException {
        Form form = formRepository.findByLabel(label);
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition",
                "attachment; filename=" + form.getLabel() + "_" + form.getDate() + ".csv");

//        ICsvBeanWriter writer = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
//
//        for (Table table : form.getTables()) {
//            List<String> csvHeader = new ArrayList<>();
//            List<String> csvMapping = new ArrayList<>();
//
//            csvHeader.add(table.getCommonColumn().getLabel());
//            csvMapping.add(table.getCommonColumn().getValues().toString());
//
//            for (SubTable subTable : table.getSubTables()) {
//                for (Column column : subTable.getColumns()) {
//                    csvHeader.add(column.getLabel());
//                    csvMapping.add("cells.value");
//                }
//            }
//            writer.writeComment(table.getLabel());
//            writer.writeHeader(String.valueOf(csvHeader));
//            writer.write(table, String.valueOf(csvMapping));
//        }
//
//        writer.close();
    }
}
