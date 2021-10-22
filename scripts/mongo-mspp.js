db = new Mongo().getDB("hha");

db.createCollection('mspp', {capped: false});

// Insert basic MSPP data.
// Shared by Rehab, NICUPaeds, and Maternity.
db.mspp.insert([
    {
        column: {
            label: "MSPP",
            columns: [{
                label: "Quantity",
                columns: null,
                isUsable: true,
                cells: null
            }],
            isUsable: false,
            cells: null
        },
        comCol: {
            label: "MSPP",
            values: [
                "Beds available",
                "Bed days",
                "Patient days",
                "Hospitalized",
                "Discharged alive",
                "Died before 48h",
                "Died after 48h",
                "Days hospitalised",
                "Referrals",
                "Transfers",
                "Self-discharged",
                "Stayed in the ward",
                "Admissions"
            ]
        },
        label: "MSPP"
    }
])