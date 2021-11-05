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
        deparment: null,
        activationStatus: "ACTIVATED",
        confirmationLink: null
    }
])

db = db.getSiblingDB('caseStudy');

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
            "Case study/story: (add more personal elements to the story, " +
            "quote from the patient/family member, etc.)"
        ]
    }, {
        name: "Staff Recognition",
        questions: [
            "Staff name?",
            "Role/Job Title?",
            "What department does this staff member work in?",
            "How long have they been working at HCBH?",
            "What do they enjoy most about working at HCBH?",
            "Case study/story (why is this person being recognized? " +
            "act of kindness? anniversary? etc.)"
        ]
    }, {
        name: "Training Session",
        questions: [
            "Training date?",
            "What was the training on?",
            "Who conducted the training?",
            "Who attended the training?",
            "How will the training benefit HCBH and its staff?",
            "Case study/story (include a general summary of the training, its success, etc.)"
        ]
    }, {
        name: "Equipment Received",
        questions: [
            "What equipment was received?",
            "What department received the equipment?",
            "Who was the equipment from?",
            "Was the equipment donated or purchased?",
            "What does this new equipment do?",
            "Case study/story (include who will benefit from this equipment, " +
            "what value it adds to HCBH, etc.)"
        ]
    }, {
        name: "Other Story",
        questions: [
            "Case study/story"
        ]
    }
])
