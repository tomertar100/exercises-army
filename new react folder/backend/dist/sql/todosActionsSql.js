"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoSql = exports.updateEditingTodoSql = exports.updateCompleteSql = exports.updateTodoSql = exports.addTodoSql = exports.getAllTodosSql = void 0;
const connections_1 = require("./connections");
function getAllTodosSql(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connections_1.pool.connect();
        try {
            const result = yield connected.query(`SELECT * FROM todos where user_id = '${user_id}' order by date ASC`);
            return result.rows;
        }
        catch (error) {
            console.log("error querying: " + error);
            return;
        }
        finally {
            yield connected.release();
        }
    });
}
exports.getAllTodosSql = getAllTodosSql;
function addTodoSql(user_id, text, date, completed, overdue, isEditing) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connections_1.pool.connect();
        try {
            return yield connected.query(`INSERT INTO todos(user_id,text,date,completed,overdue,isEditing) VALUES(${user_id},'${text}','${date}',${completed},${overdue},${isEditing})`);
        }
        catch (error) {
            console.log("error querying: " + error);
            return;
        }
        finally {
            return connected.release();
        }
    });
}
exports.addTodoSql = addTodoSql;
function updateTodoSql(id, text, date) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connections_1.pool.connect();
        try {
            return yield connected.query(`UPDATE todos SET text='${text}',date='${date}' WHERE task_id =${id}`);
        }
        catch (error) {
            console.log("error querying: " + error);
            return;
        }
        finally {
            connected.release();
        }
    });
}
exports.updateTodoSql = updateTodoSql;
function updateCompleteSql(id, completed) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connections_1.pool.connect();
        try {
            return yield connected.query(`UPDATE todos SET completed=${completed} WHERE task_id =${id}`);
        }
        catch (error) {
            console.log("error querying: " + error);
            return;
        }
        finally {
            connected.release();
        }
    });
}
exports.updateCompleteSql = updateCompleteSql;
function updateEditingTodoSql(id, isEditing) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connections_1.pool.connect();
        try {
            return yield connected.query(`UPDATE todos SET isEditing=${isEditing} WHERE task_id =${id}`);
        }
        catch (error) {
            console.log("error querying: " + error);
            return;
        }
        finally {
            connected.release();
        }
    });
}
exports.updateEditingTodoSql = updateEditingTodoSql;
function deleteTodoSql(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connected = yield connections_1.pool.connect();
        try {
            return yield connected.query(`DELETE FROM todos where task_id = ${id}`);
        }
        catch (error) {
            console.log("error querying: " + error);
            return;
        }
        finally {
            connected.release();
        }
    });
}
exports.deleteTodoSql = deleteTodoSql;
//# sourceMappingURL=todosActionsSql.js.map