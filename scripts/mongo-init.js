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
            new DBRef('role', roles[0]._id)
        ],
        deparment: null,
        activationStatus: "ACTIVATED"
    }
])
