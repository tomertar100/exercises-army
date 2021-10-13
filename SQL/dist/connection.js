"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: "postgres",
    host: "localhost",
    database: "redditDB",
    password: "postgres",
    port: 5432,
});
//# sourceMappingURL=connection.js.map