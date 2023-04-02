db.createUser({
    user: 'dbuser',
    pwd: 'PASSWORD',
    roles: [
        {
            role: 'readWrite',
            db: 'experimentdb',
        },
    ],
});

// Creates the database that stores all relevant data.
db = db.getSiblingDB('experimentdb');

// Creates a collection for example experiment results.
db.createCollection('exampleresults', { capped : false, autoIndexId : true});

// Insert example solutions into exampleresults collection.
db.exampleresults.insert([
    [[10758, 716, 8, 70, 16], []], 
    [[12646, 666, 3, 62, 8], []], 
    [[13485, 513, 4, 83, 93], []], 
    [[14820, 977, 4, 42, 10], []], 
    [[12850, 750, 0, 88, 23], []], 
    [[14750, 561, 8, 8, 18], []], 
    [[13538, 502, 0, 60, 67], []], 
    [[13244, 690, 4, 70, 89], []], 
    [[14551, 956, 5, 0, 51], []], 
    [[11102, 600, 9, 50, 91], []], 
    [[14596, 816, 5, 89, 11], []], 
    [[10382, 736, 0, 14, 5], []], 
    [[12754, 723, 2, 89, 17], []], 
    [[13047, 566, 1, 78, 14], []], 
    [[13142, 728, 4, 3, 81], []], 
    [[14443, 735, 1, 27, 93], []], 
    [[14329, 805, 9, 54, 81], []], 
    [[12224, 789, 7, 35, 83], []], 
    [[11843, 776, 0, 12, 89], []], 
    [[13877, 777, 8, 87, 76], []] 
]);