// #!/usr/bin/env bash
// echo "Creating mongo users..."
// mongo admin --host localhost -u root -p rootpassword --eval "db.createUser({user: 'user', pwd: 'userpassword', roles: [{role: 'readWrite', db: 'devEventManagement'}]}); db.createUser({user: 'admin', pwd: 'adminpassword', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]});"
// echo "Mongo users created."

var db = connect("mongodb://root:rootpassword@localhost:27016/admin");

db = db.getSiblingDB('new_db'); // we can not use "use" statement here to switch db

db.createUser(
    {
        user: "user",
        pwd: "pass",
        roles: [ { role: "readWrite", db: "new_db"} ],
        passwordDigestor: "server",
    }
)