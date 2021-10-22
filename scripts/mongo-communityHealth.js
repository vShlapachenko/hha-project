db.createCollection('communityHealth', {capped: false});

// TODO: 3 tables left
db.communityHealth.insert([
    {
        // Insert table Deliveries
        column: {
            label: "Deliveries",
            columns: [{
                label: "Matrons trained",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Others",
                columns: null,
                isUsable: true,
                cells: null
            }],
            isUsable: false,
            cells: null
        },
        comCol: {
            label: "Age of Mothers",
            values: [
                "< 15 years",
                "15-19 years",
                "20-24 years",
                "25-29 years",
                "30 years plus",
                "Unknown"
            ]
        },
        label: "Age of Mothers"
    }, {
        // Insert table Birth
        column: {
            label: "Birth",
            columns: [{
                label: "Matrons",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Others",
                columns: null,
                isUsable: true,
                cells: null
            }],
            isUsable: false,
            cells: null
        },
        comCol: {
            label: "Birth",
            values: [
                "Weight < 1.5kg",
                "1.5kg <= Weight < 2.5kg",
                "2.5kg and over",
                "No weighted",
                "Immediately breastfed",
                "Skin to skin therapy"
            ]
        },
        label: "Birth"
    }, {
        // Insert table Post Natal
        column: {
            label: "Post Natal",
            columns: [{
                label: "Matrons",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Others",
                columns: null,
                isUsable: true,
                cells: null
            }],
            isUsable: false,
            cells: null
        },
        comCol: {
            label: "Post Natal",
            values: [
                "Breastfeeding women receiving vitamin A",
                "Breastfeeding women with MUAC <210mm",
                "Breastfeeding women with malnutrition support",
                "Domestic visits in 0-3 days"
            ]
        },
        label: "Post Natal"
    }, {
        // Insert table Birth Control
        // TODO: figure out the female / male label
        // TODO: figure out how the unit row accept String value
        column: {
            label: "Birth Control",
            columns: [{
                label: "Accepting",
                columns: [{
                    label: "<25 years",
                    columns: null,
                    isUsable: true,
                    cells: null
                }, {
                    label: "25 years and more",
                    columns: null,
                    isUsable: true,
                    cells: null
                }],
                isUsable: false,
                cells: null
            }, {
                label: "Total users",
                columns: [{
                    label: "<25 years",
                    columns: null,
                    isUsable: true,
                    cells: null
                }, {
                    label: "25 years and more",
                    columns: null,
                    isUsable: true,
                    cells: null
                }],
                isUsable: false,
                cells: null
            }],
            isUsable: false,
            cells: null
        },
        comCol: {
            label: "Birth Control",
            values: [
                "Methods/ Sex",
                "?? OCP",
                "?? Patch",
                "Depo injection",
                "Implant",
                "Inter uterine devices (IUD)",
                "Vaginal ring",
                "Breastfeeding as birth control",
                "Female condom",
                "Sterlisation",
                "Male condom",
                "Vasectomy"
            ]
        },
        label: "Birth Control"
    }, {
        // Insert table Birth Control (CCV operations)
        column: {
            label: "Birth Control",
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
            label: "CCV operations",
            values: [
                "Sterlisation",
                "Vasectomy"
            ]
        },
        label: "CCV operations"
    }, {
        // Insert table Vaccines and consumables (Type of Vaccine)
        column: {
            label: "Vaccines and consumables",
            columns: [{
                label: "Quantity available during the month",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Balance at the end of the month",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Number of days out of stock",
                columns: null,
                isUsable: true,
                cells: null
            }],
            isUsable: false,
            cells: null
        },
        comCol: {
            label: "Type of Vaccine",
            values: [
                "BCG",
                "VPO",
                "Penta",
                "Rota",
                "RR",
                "dT",
                "VPI",
                "Flu",
                "DTP",
                "COVID-19"
            ]
        },
        label: "Type of Vaccine"
    }, {
        // Insert table Vaccines and consumables (Consumables)
        column: {
            label: "Vaccines and consumables",
            columns: [{
                label: "Quantity available during the month",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Balance at the end of the month",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Number of days out of stock",
                columns: null,
                isUsable: true,
                cells: null
            }],
            isUsable: false,
            cells: null
        },
        comCol: {
            label: "Consumables",
            values: [
                "SAB 0.05ml",
                "SAB 0.5ml",
                "Sdil_2ml",
                "Sdil_5ml",
                "Boîtes Séc",
                "Coton"
            ]
        },
        label: "Consumables"
    }
])