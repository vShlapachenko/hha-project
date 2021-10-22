db = new Mongo().getDB("hha");

db.createCollection('role', {capped: false});

db.role.insert([
    {"name": "ROLE_STAFF"},
    {"name": "ROLE_ADMIN"},
    {"name": "ROLE_HEAD_OF_DEP"},
])

roles = db.role.find().toArray()

db.createCollection('hhaUser', {capped: false});

//default password of default user is 1234
db.hhaUser.insert([
    {
        email: "cmpt373.hha.project@gmail.com", firstName: "firstName", lastName: "lastName",
        password: "$2a$10$f/W5HK1BU/97RztYfZ531u/jxXb3GuPDlE6Qao/FOVSldXaXQSg3S",
        activationLink: null, roles: [
            new DBRef('role', roles[1]._id)
        ],
        department: null,
        activationStatus: "ACTIVATED",
        confirmationLink: null
    }
])

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

db.createCollection('maternity', {capped: false});

db.insert.maternity([
    {
        // Insert table Birth
        column: {
            label: "Birth",
            columns: [{
                label: "Normal",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Cesarean",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Instrumentals",
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
                label: "Quantity",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "0-6 hours",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "7h-6 days",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "7-42 days",
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
                "Domestic visits in 0-3 days",
                "Post natal consultations"
            ]
        },
        label: "Post Natal"
    }, {
        // Insert table Complications
        column: {
            label: "Complications",
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
            label: "Complications",
            values: [
                "Number of obstetric complications recorded",
                "Number of obstetric complications referred"
            ]
        },
        label: "Complications"
    }, {
        // Insert table Number of Stillborns
        column: {
            label: "Number of Stillborns",
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
            label: "Number of Stillborns",
            values: [
                "Macerated",
                "Non Macerated"
            ]
        },
        label: "Number of Stillborns"
    }, {
        // Insert table Number of Maternal death in the hospital
        column: {
            label: "Maternal death in the hospital",
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
            label: "Maternal death in the hospital",
            values: [
                "In hospital",
                "In the community"
            ]
        },
        label: "Maternal death in the hospital"
    }, {
        // Insert table Support for wife and mother
        column: {
            label: "Support for wife and mother",
            columns: [{
                label: "1st Visit",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "2nd Visit",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "3rd Visit",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "4th Visit",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "5th plus visit",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Total",
                columns: null,
                isUsable: true,
                cells: null
            }],
            isUsable: false,
            cells: null
        },
        comCol: {
            label: "Period of pregnancy",
            values: [
                "0-3 months",
                "4-6 months",
                "7-9 months",
                "Total visits"
            ]
        },
        label: "Period of pregnancy"
    }, {
        // Insert table Support for women hospital
        column: {
            label: "Support for women hospital",
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
        label: "Support for women hospital"
    }, {
        // Insert table Other services
        column: {
            label: "Other services",
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
            label: "Other services",
            values: [
                "Other women receiving iron folate",
                "Women receiving acetic acid inspection",
                "Positive women after smear test",
                "Women positive smear test taken care of",
                "Women receiving postabortion care"
            ]
        },
        label: "Other services"
    }, {
        // Insert table Deliveries (Age of Mothers)
        column: {
            label: "Deliveries",
            columns: [{
                label: "Normal",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Cesarean",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Instrumentals",
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
        // Insert table Deliveries (Labor management)
        column: {
            label: "Deliveries",
            columns: [{
                label: "Normal",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Cesarean",
                columns: null,
                isUsable: true,
                cells: null
            }, {
                label: "Instrumentals",
                columns: null,
                isUsable: true,
                cells: null
            }],
            isUsable: false,
            cells: null
        },
        comCol: {
            label: "Labor management",
            values: [
                "Use of partograph",
                "Active management of the 3rd phase of labor"
            ]
        },
        label: "Labor management"
    }
])
