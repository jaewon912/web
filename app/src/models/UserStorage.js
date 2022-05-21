"use strict";

class UserStorage {
    static #users = {
        id: ["dong", "aa", "aaa"],
        psword: ["1234", "aa", "aaa"],
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
}

module.exports = UserStorage;