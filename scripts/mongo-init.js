db = new Mongo().getDB("hha");

db.createCollection('role', {capped: false});

db.role.insert([
    {"name": "ROLE_STAFF"},
    {"name": "ROLE_ADMIN"},
    {"name": "ROLE_HEAD_OF_DEP"},
])

roles = db.role.find().toArray()

db.createCollection('hhaUser', {capped: false});

db.createCollection('department', {capped: false});

db.department.insert([
    {"name": "NICUPEAD"},
    {"name": "MAT"},
    {"name": "REHAB"},
    {"name": "COMMUNITY HEALTH"}
])

departments = db.department.find().toArray()

//default password of default user is 1234
db.hhaUser.insert([
    {
        email: "cmpt373.hha.project@gmail.com", firstName: "firstName", lastName: "lastName",
        password: "$2a$10$f/W5HK1BU/97RztYfZ531u/jxXb3GuPDlE6Qao/FOVSldXaXQSg3S",
        activationLink: null, roles: [
            new DBRef('role', roles[1]._id)
        ],
        department: new DBRef('department', departments[0]._id),
        activationStatus: "ACTIVATED",
        confirmationLink: null
    }
])

db.createCollection('departmentPoints', {capped: false});

db.departmentPoints.insert([
    {
        department: new DBRef('department', departments[0]._id),
        monthPoints: 50,
        yearPoints: 0
    }, {
        department: new DBRef('department', departments[1]._id),
        monthPoints: 20,
        yearPoints: 0
    }, {
        department: new DBRef('department', departments[2]._id),
        monthPoints: 30,
        yearPoints: 0
    }, {
        department: new DBRef('department', departments[3]._id),
        monthPoints: 0,
        yearPoints: 0
    },
])

db.createCollection('caseTemplate', {capped: false});

db.caseTemplate.insert([
    {
        name: "Patient Story",
        questions: [
            "Patient's name?",
            "Patient's age?",
            "Where is the patient from?",
            "Why did the patient choose to come to HCBH?",
            "How long were they at HCBH?",
            "What was their diagnosis?",
            "Case study/story: (add more personal elements to the story;quote from the patient/family member etc.)"
        ]
    }, {
        name: "Staff Recognition",
        questions: [
            "Staff name?",
            "Role/Job Title?",
            "What department does this staff member work in?",
            "How long have they been working at HCBH?",
            "What do they enjoy most about working at HCBH?",
            "Case study/story (why is this person being recognized? Act of kindness? anniversary? etc.)"
        ]
    }, {
        name: "Training Session",
        questions: [
            "Training date?",
            "What was the training on?",
            "Who conducted the training?",
            "Who attended the training?",
            "How will the training benefit HCBH and its staff?",
            "Case study/story (include a general summary of the training and its success etc)"
        ]
    }, {
        name: "Equipment Received",
        questions: [
            "What equipment was received?",
            "What department received the equipment?",
            "Who was the equipment from?",
            "Was the equipment donated or purchased?",
            "What does this new equipment do?",
            "Case study/story (include who will benefit from this equipment and what value it adds to HCBH etc.)"
        ]
    }, {
        name: "Other Story",
        questions: [
            "Case study/story"
        ]
    }
])

db.createCollection('communityHealth', {capped: false});
db.communityHealth.insert([
    {
    name: "Community Health",
    date: "September 2021",
    tables: [
        {
        label: "Age Of Mothers",
        commonColumn: {
            label: "Age Of Mothers",
            values: [
            "<15 years",
            "15-19 years",
            "20-24 years",
            "25-29 years",
            "30 years plus",
            "Unknown"
            ]
        },
        subTables: [
            {
            label: "",
            columns: [
                {
                label: "Matrones",
                cells: []
                },
                {
                label: "Autres",
                cells: []
                }
            ]
            }
        ]
        },
        {
        label: "Births",
        commonColumn: {
            label: "Births",
            values: [
            "Weight < 1.5kg",
            "1.5kg < Weight < 2.5kg",
            "2.5kg and over",
            "Not weighed",
            "Immediately breastfed",
            "Skin to skin therapy"
            ]
        },
        subTables: [
            {
            label: "",
            columns: [
                {
                label: "Matrones",
                cells: []
                },
                {
                label: "Autres",
                cells: []
                }
            ]
            }
        ]
        },
        {
        label: "Postal Natal",
        commonColumn: {
            label: "Postal Natal",
            values: [
            "Breastfeeding women receiving vitamin A",
            "Breastfeeding women with MUAC <210mm",
            "Breastfeeding women with malnutrition support",
            "Domestic visits in 0-3 days"
            ]
        },
        subTables: [
            {
            label: "",
            columns: [
                {
                label: "Matrones",
                cells: []
                },
                {
                label: "Autres",
                cells: []
                }
            ]
            }
        ]
        },
        {
        label: "Birth Control",
        commonColumn: {
            label: "Methods/Sex",
            values: [
            "OCP",
            "Patch",
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
        subTables: [
            {
            label: "Acceptants",
            columns: [
                {
              label: "< 25 years",
                cells: []
                },
                {
                label: "25 years plus",
                cells: []
                }
            ]
            },
            {
            label: "Total utilisateurs",
            columns: [
                {
                label: "< 25 years",
                cells: []
                },
                {
                label: "25 years plus",
                cells: []
                }
            ]
            },
            {
            label: "Contraceptives distributed",
            columns: [
                {
                label: "Unit",
                cells: [
                    {
                    disabled: true,
                    value: "Cycle",
                    type: "text"
                    },
                    {
                    disabled: true,
                    value: "Cycle",
                    type: "text"
                    },
                    {
                    disabled: true,
                    value: "Vial",
                    type: "text"
                    },
                    {
                    disabled: true,
                    value: "Paquet",
                    type: "text"
                    },
                    {
                    disabled: true,
                    value: "Piece",
                    type: "text"
                    },
                    {
                    disabled: true,
                    value: "Piece",
                    type: "text"
                    },
                    {
                    disabled: true,
                    value: null,
                    type: "text"
                    },
                    {
                    disabled: true,
                    value: "Piece",
                    type: "text"
                    }
                ]
                },
                {
                label: "Quantity",
                cells: [
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: true,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    }
                ]
                },
                {
                label: "Number of days out of stock / month",
                cells: [
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: true,
                    value: null,
                    type: "number"
                    },
                    {
                    disabled: false,
                    value: null,
                    type: "number"
                    }
                ]
                }
            ]
            }
        ]
        },
        {
        label: "Vaccination",
        commonColumn: {
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
        subTables: [
            {
            label: "Type Of Vaccines",
            columns: [
                {
                label: "Quantité disponible au cours du mois",
                cells: []
                },
                {
                label: "Balance en fin de mois",
                cells: []
                },
                {
                label: "Quantité disponible au cours du mois",
                cells: []
                }
            ]
            }
        ]
        },
        {
        label: "Vaccination",
        commonColumn: {
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
        subTables: [
            {
            label: "Consumables",
            columns: [
                {
                label: "Quantité disponible au cours du mois",
                cells: []
                },
                {
                label: "Balance en fin de mois",
                cells: []
                },
                {
                label: "Quantité disponible au cours du mois",
                cells: []
                }
            ]
            }
        ]
        },
        {
        label: "Vaccines",
        commonColumn: {
            label: "Vaccines",
            values: [
            "BCG",
            "VPO (Polio)",
            "VPO 1 (Polio)",
            "VPO 2 (Polio)",
            "Rappel VPO (Polio)",
            "VPI",
            "Penta 1",
            "Penta 2",
            "Penta 3",
            "Rota 1",
            "Rota 2",
            "RR 1",
            "RR 2",
            "Pneumo 1",
            "Pneumo 2",
            "Pneumo 3",
            "DTp Rappel",
            "ECV"
            ]
        },
        subTables: [
            {
            label: "Men 0-11 Years",
            columns: [
                {
                label: "Inst.",
                cells: []
                },
                {
                label: "Comm.",
                cells: []
                },
                {
                label: "Total",
                cells: []
                }
            ]
            },
            {
            label: "Men 12-23 Years",
            columns: [
                {
                label: "Inst.",
                cells: []
                },
                {
                label: "Comm.",
                cells: []
                },
                {
                label: "Total",
                cells: []
                }
            ]
            },
            {
            label: "Women 0-11 Years",
            columns: [
                {
                label: "Inst.",
                cells: []
                },
                {
                label: "Comm.",
                cells: []
                },
                {
                label: "Total",
                cells: []
                }
            ]
            },
            {
            label: "Women 12-23 Years",
            columns: [
                {
                label: "Inst.",
                cells: []
                },
                {
                label: "Comm.",
                cells: []
                },
                {
                label: "Total",
                cells: []
                }
            ]
            },
            {
            label: "Total",
            columns: [
                {
                label: "Total doses",
                cells: []
                },
                {
                label: "Utilisees",
                cells: []
                },
                {
                label: "Administrees",
                cells: []
                }
            ]
            }
        ]
        },
        {
        label: "Vaccines dT1, dT2+",
        commonColumn: {
            label: "Vaccines",
            values: [
            "dT1",
            "dT2+"
            ]
        },
        subTables: [
            {
            label: "Femmes Enceintes",
            columns: [
                {
                label: "Inst.",
                cells: []
                },
                {
                label: "Comm.",
                cells: []
                },
                {
                label: "Total",
                cells: []
                }
            ]
            }
        ]
        },
        {
        label: "Vaccines dT1, dT2+",
        commonColumn: {
            label: "Total doses",
            "values": [
            "dT1 + dT2+"
            ]
        },
        subTables: [
            {
            label: "Total",
            columns: [
                {
                label: "Utilisees",
                cells: []
                },
                {
                label: "Administrees",
                cells: []
                }
            ]
            }
        ]
        }
    ]
    }    
])

db.createCollection('NICUPaeds', {capped: false});
db.NICUPaeds.insert([
    {
        name: "NICU/PAED MONTHLY DATA COLLECTION",
        date: "September 2021",
        tables: [
            {
                commonColumn: {
                    label: "MSPP DATA",
                    values: [
                    "Beds available",
                    "Bed days",
                    "Patient days",
                    "Hospitalized NICU",
                    "Hospitalised Paeds",
                    "Discharged alive",
                    "OF Total discharged no: NICU discharged",
                    "Died before 48h",
                    "Died in NICU",
                    "Died in Paed",
                    "Died after 48h",
                    "Died in NICU",
                    "Died in Paed",
                    "Days hospitalised",
                    "Referrals",
                    "Transfers",
                    "Self-discharged",
                    "Stayed in the ward",
                    "Admissions"
                    ]
                },
                subTables: [
                    {
                    label: "",
                    columns: [
                        {
                        label: "Quantity(number)",
                        cells: []
                        }
                    ]
                    }
                ]
                },
                {
                    commonColumn: {
                        label: "Where do patients come from?",
                        values: [
                        "Quarter Morin",
                        "Cap Haitian",
                        "Department Nord",
                        "Other departments: IF YES TEXT BOX WHERE"
                        ]
                    },
                    subTables: [
                        {
                        columns: [
                            {
                            label: "",
                            cells: []
                            }
                        ]
                        }
                    ]
                    },

                    {
                        commonColumn: {
                            label: "Age of infant admitted",
                            values: [
                            "extremely preterm (less than 28 weeks)",
                            "very preterm (28 to 32 weeks)",
                            "moderate to late preterm (32 to 37 weeks)",
                            "Full term (37 weeks plus)",
                            "Older than neonate (>4 weeks old)",
                            "Age 4 weeks -5",
                            "Age 6-11",
                            "Age 12-18"
                            ]
                        },
                        subTables: [
                            {
                            columns: [
                                {
                                label: "",
                                cells: []
                                }
                            ]
                            }
                        ]
                        },

                        {
                            commonColumn: {
                                label: "Gendre",
                                values: [
                                "Male",
                                "Female"
                                ]
                            },
                            subTables: [
                                {
                                columns: [
                                    {
                                    label: "",
                                    cells: []
                                    }
                                ]
                                }
                            ]
                            },

                            {
                                commonColumn: {
                                    label: "Main Condition",
                                    values: [
                                    "Respiratory arrest",
                                    "Traumatic injury",
                                    "Septic Shock",
                                    "Hypovolemic shock",
                                    "Seizures/convulsions",
                                    "Poisoning",
                                    "Altered mental status",
                                    "Gastroenteritis",
                                    "Hemorrhage",
                                    "Hypothermia",
                                    "Cardiac congenital anomaly",
                                    "Other congenital anomaly",
                                    "Malnutrition",
                                    "Meningitis",
                                    "Community acquired pneumonia",
                                    "Aspiration pneumonia",
                                    "Moderate prematurity (32-36 weeks gestation)",
                                    "Severe prematurity (<32 weeks)",
                                    "Other medical: TEXT BOX"
                                    ]
                                },
                                subTables: [
                                    {
                                    columns: [
                                        {
                                        label: "",
                                        cells: []
                                        }
                                    ]
                                    }
                                ]
                                },

                                {
                                    label: "Number of outpatients",
                                    commonColumn: {
                                        label: "Age",
                                        values: [
                                        "extremely preterm (less than 28 weeks)",
                                        "very preterm (28 to 32 weeks)",
                                        "moderate to late preterm (32 to 37 weeks)",
                                        "Full term (37 weeks plus)",
                                        "Older than neonate (>4 weeks old)",
                                        "Age 4 weeks -5",
                                        "Age 6-11",
                                        "Age 12-18"
                                        ]
                                    },
                                    subTables: [
                                        {
                                        columns: [
                                            {
                                            label: "",
                                            cells: []
                                            }
                                        ]
                                        }
                                    ]
                                    },

                                    {
                                        commonColumn: {
                                            label: "Main Condition",
                                            values: [
                                            "Respiratory arrest",
                                            "Traumatic injury",
                                            "Septic Shock",
                                            "Hypovolemic shock",
                                            "Seizures/convulsions",
                                            "Poisoning",
                                            "Altered mental status",
                                            "Gastroenteritis",
                                            "Hemorrhage",
                                            "Hypothermia",
                                            "Cardiac congenital anomaly",
                                            "Other congenital anomaly",
                                            "Malnutrition",
                                            "Meningitis",
                                            "Community acquired pneumonia",
                                            "Aspiration pneumonia",
                                            "Moderate prematurity (32-36 weeks gestation)",
                                            "Severe prematurity (<32 weeks)",
                                            "Other medical: TEXT BOX"
                                            ]
                                        },
                                        subTables: [
                                            {
                                            columns: [
                                                {
                                                label: "",
                                                cells: []
                                                }
                                            ]
                                            }
                                        ]
                                        },

                                        {
                                            commonColumn: {
                                                label: "Gendre",
                                                values: [
                                                "Boy",
                                                "Girl"
                                                ]
                                            },
                                            subTables: [
                                                {
                                                columns: [
                                                    {
                                                    label: "",
                                                    cells: []
                                                    }
                                                ]
                                                }
                                            ]
                                            },
        ]  
    }
])

db.createCollection('maternity', {capped: false});
db.maternity.insert([
    {
        name: "MATERNITY DATA COLLECTION",
        date: "Septemper 2021",
        tables: [
            {
                commonColumn: {
                    label: "MSPP DATA",
                    values: [
                    "Beds available",
                    "Bed days",
                    "Patient days",
                    "Hospitalized NICU",
                    "Hospitalised Paeds",
                    "Discharged alive",
                    "OF Total discharged no: NICU discharged",
                    "Died before 48h",
                    "Died in NICU",
                    "Died in Paed",
                    "Died after 48h",
                    "Died in NICU",
                    "Died in Paed",
                    "Days hospitalised",
                    "Referrals",
                    "Transfers",
                    "Self-discharged",
                    "Stayed in the ward",
                    "Admissions"
                    ]
                },
                subTables: [
                    {
                    label: "",
                    columns: [
                        {
                        label: "Quantity(number)",
                        cells: []
                        }
                    ]
                    }
                ]
                },
                {
                label: "Births",
                commonColumn: {
                label: "Births",
                values: [
                "Weight < 1.5kg",
                "1.5kg < Weight < 2.5kg",
                "2.5kg and over",
                "Not weighed",
                "Immediately breastfed",
                "Skin to skin therapy"
                 ]
                },
                subTables: [
                {
                columns: [
                {
                label: "Normal",
                cells: []
                },
                {
                label: "Césarienne",
                cells: []
                },
                {
                    label: "Instrumentalsé",
                    cells: []
                    }
                ]
            }
        ]},
        {
            commonColumn: {
                label: "Postal Natal",
                values: [
                "Breastfeeding women receiving vitamin A",
                "Breastfeeding women with MUAC <210mm",
                "Breastfeeding women with malnutrition support",
                "Domestic visits in 0-3 days"
                ]
            },
            subTables: [
                {
                columns: [
                    {
                    label: "Quantity (number)",
                    cells: []
                    }
                ]
                }
            ]
            },
            {
                commonColumn: {
                    label: "Complications",
                    values: [
                    "Number of obstetric complications recorded",
                    "Number of obstetric complications referred",
                    ]
                },
                subTables: [
                    {
                    columns: [
                        {
                        label: "Quantity (number)",
                        cells: []
                        }
                    ]
                    }
                ]
                },
                {
                    commonColumn: {
                        label: "Number of Stillborns",
                        values: [
                        "Macérés",
                        "Non Macérés",
                        ]
                    },
                    subTables: [
                        {
                        columns: [
                            {
                            cells: []
                            }
                        ]
                        }
                    ]
                    },
                    {
                        commonColumn: {
                            label: "Maternal death in the hospital",
                            values: [
                            "In hospital",
                            "In the community",
                            ]
                        },
                        subTables: [
                            {
                            columns: [
                                {
                                cells: []
                                }
                            ]
                            }
                        ]
                        },
                        {
                            label: "Support for wife and mother",
                            commonColumn: {
                                label: "Period of pregnancy",
                                values: [
                                "0-3 months",
                                "4-6 months",
                                "7-9 months",
                                "Total visits"
                                ]
                            },
                            subTables: [
                                {
                                columns: [
                                    {
                                    label: "1st Visit",
                                    cells: []
                                    }
                                ]
                                },
                                {
                                    columns: [
                                        {
                                        label: "2nd Visit",
                                        cells: []
                                        }
                                    ]
                                    },
                                    {
                                        columns: [
                                            {
                                            label: "3rd Visit",
                                            cells: []
                                            }
                                        ]
                                        },
                                        {
                                            columns: [
                                                {
                                                label: "4th Visit",
                                                cells: []
                                                }
                                            ]
                                            },
                                            {
                                                columns: [
                                                    {
                                                    label: "5th plus Visit",
                                                    cells: []
                                                    }
                                                ]
                                                },
                                                {
                                                    columns: [
                                                        {
                                                        label: "Total",
                                                        cells: []
                                                        }
                                                    ]
                                                    }
                            ]
                            },

                            {
                                commonColumn: {
                                    label: "Support for women hospital",
                                    values: [
                                    "Number of pregnancies at risk",
                                    "Case of anemia in pregnant women",
                                    "Pregnant women receiving iron folate",
                                    "Pregnant women being treated for iron deficiency anemia",
                                    "Pregnant women with a birth plan",
                                    "Pregnant women with confirmed malaria treated with chloroquine",
                                    "Pregnant women who received an impregnated mosquito net",
                                    "Pregnant women MUAC<210mm",
                                    "MAM / MAS supported"
                                    ]
                                },
                                subTables: [
                                    {
                                    columns: [
                                        {
                                        cells: []
                                        }
                                    ]
                                    }
                                ]
                                },  
                                {
                                    commonColumn: {
                                        label: "Other services",
                                        values: [
                                        "Other women receiving iron folate",
                                        "Women receiving acetic acid inspection",
                                        "Positive women after smear test",
                                        "Women positive smear test taken care of",
                                        "Women receiving postabortion care",  
                                        ]
                                    },
                                    subTables: [
                                        {
                                        columns: [
                                            {
                                            cells: []
                                            }
                                        ]
                                        }
                                    ]
                                    },  
                                    {
                                        label: "Deliveries",
                                        commonColumn: {
                                            label: "Age Of Mothers",
                                            values: [
                                            "<15 years",
                                            "15-19 years",
                                            "20-24 years",
                                            "25-29 years",
                                            "30 years plus",
                                            "Unknown"
                                            ]
                                        },
                                        subTables: [
                                            {
                                                columns: [
                                                    {
                                                    label: "Normal",
                                                    cells: []
                                                    },
                                                    {
                                                    label: "Césarienne",
                                                    cells: []
                                                    },
                                                    {
                                                        label: "Instrumentalsé",
                                                        cells: []
                                                        }
                                                    ]
                                            }
                                        ]
                                        },
                                        {
                                            commonColumn: {
                                                label: "Labor management",
                                                values: [
                                                "Use of partograph",
                                                "Active management of the 3rd phase of labor"
                                                ]
                                            },
                                            subTables: [
                                                {
                                                columns: [
                                                    {
                                                    cells: []
                                                    }
                                                ]
                                                },
                                                {
                                                    columns: [
                                                        {
                                                        cells: []
                                                        }
                                                    ]
                                                    }
                                            ]
                                            },
                                            {
                                                commonColumn: {
                                                    label: "Main Condition of Patient",
                                                    values: [
                                                    "Uncomplicated Labour/ C-section",
                                                    "Heart failure",
                                                    "Pre-eclampsia",
                                                    "Respiratory problems",
                                                    "C-section site infection",
                                                    "Other medical",
                                                    "Trauma"
                                                    ]
                                                },
                                                subTables: [
                                                    {
                                                    columns: [
                                                        {
                                                        cells: []
                                                        }
                                                    ]
                                                    }
                                                ]
                                                },
        ]
    }
])

db.createCollection('rehab', {capped: false});
db.rehab.insert([
    {
    name: "REHAB MONTHLY DATA COLLECTION",
    date: "Septemper 2021",
    tables: [
        {
            commonColumn: {
                label: "",
                values: [
                "Beds available",
                "Bed days",
                "Patient days",
                "Hospitalized",
                "30 years plus",
                "Discharged alive"
                ]
            },
            subTables: [
                {
                columns: [
                    {
                    label: "Quantity (number)",
                    cells: []
                    }
        
                ]
                }
            ]
            },
            {
                label: "PATIENT 1 DISCHARGED DIAGNOSIS:",
                commonColumn: {
                    values: [
                    "SCI",
                    "Stroke",
                    "Other"
                    ]
                },
                subTables: [
                    {
                    columns: [
                        {
                        cells: []
                        }
            
                    ]
                    }
                ]
                },
                {
                    label: "Patient 1: No. Days in Rehab Unit from admission to discharge: TEXT BOX",
                    commonColumn: {
                        label: "Discharge Reason",
                        values: [
                        "All goals met",
                        "Goals partially met, sufficient for discharge",
                        "Goals not met, discharged for alternate reason"
                        ]
                    },
                    subTables: [
                        {
                        columns: [
                            {
                            cells: []
                            }
                
                        ]
                        }
                    ]
                    },
                    {
                        
                        commonColumn: {
                            label: "Discharge Outcome (ADLs/Self-Care)",
                            values: [
                            "Independent",
                            "Modified Independent ",
                            "Supervision",
                            "Minimum Assistance",
                            "Moderate Assistance",
                            "Maximum Assistance",
                            "Dependent"


                            ]
                        },
                        subTables: [
                            {
                            columns: [
                                {
                                cells: []
                                }
                    
                            ]
                            }
                        ]
                        },
                        {
                        
                            commonColumn: {
                                label: "Discharge Outcome (Transfers and Mobility)",
                                values: [
                                "Independent",
                                "Modified Independent ",
                                "Supervision",
                                "Minimum Assistance",
                                "Moderate Assistance",
                                "Maximum Assistance",
                                "Dependent"
    
    
                                ]
                            },
                            subTables: [
                                {
                                columns: [
                                    {
                                    cells: []
                                    }
                        
                                ]
                                }
                            ]
                            },
                            {
                        
                                commonColumn: {
                                    label: "Mobility Aid/Assistive Device Given?",
                                    values: [
                                    "Wheelchair",
                                    "Walker",
                                    "Cane",
                                    "Crutches"
                                    ]
                                },
                                subTables: [
                                    {
                                    columns: [
                                        {
                                        cells: []
                                        }
                            
                                    ]
                                    }
                                ]
                                },
                                {
                                commonColumn: {
                                    label: "Discharge Location",
                                    values: [
                                    "Return home, alone",
                                    "Return home, with family/caregiver(s)",
                                    "Admitted to hospital",
                                    ]
                                },
                                subTables: [
                                    {
                                    columns: [
                                        {
                                        cells: []
                                        }
                            
                                    ]
                                    }
                                ]
                                },
                                {
                                commonColumn: {
                                    label: "Discharge Employment Status",
                                    values: [
                                    "Employed",
                                    "Unemployed, unable to find work",
                                    "Unemployed, due to condition",
                                    "Retired, not working due to age"
                                    ]
                                },
                                subTables: [
                                    {
                                    columns: [
                                        {
                                        cells: []
                                        }
                            
                                    ]
                                    }
                                ]
                                },
                                {
                                    commonColumn: {
                                        label: "",
                                        values: [
                                        "Died before 48h",
                                        "Died after 48h",
                                        "Days hospitalised",
                                        "Referrals",
                                        "Transfers",
                                        "Self-discharged",
                                        "Stayed in the ward",
                                        "Admissions",
                                        "Number of outpatients",
                                        "Returning outpatients",
                                        "New outpatient initial evaluations"

                                        ]
                                    },
                                    subTables: [
                                        {
                                        columns: [
                                            {
                                            cells: []
                                            }
                                
                                        ]
                                        }
                                    ]
                                    },

    ]
}
])

