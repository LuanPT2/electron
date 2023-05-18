const pool = require('../databases/mysql.db');

class User {
    constructor(account, password, phone, name, avatar) {
        this._id = null;
        this._account = account;
        this._password = password;
        this._phone = phone;
        this._name = name;
        this._avatar = avatar;
        this._registDt = null;
    }

    static async find(id) {
        const sql = `SELECT * FROM users WHERE id = "${id}"`;
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }

    static async find() {
        const sql = 'SELECT * FROM users';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }
  
    async save() {
        const sql = `INSERT INTO users (account, password, phone, name, avatar) VALUES ("${this.account}", "${this.password}", "${this.phone}", "${this.name}", "${this.avatar}")`;
        await pool.execute(sql);
    }

    static async update(id, options) {
        const sql = `UPDATE users SET password = "${options.password}", phone = "${options.phone}", name = "${options.name}", avatar = "${options.avatar}" WHERE id = "${id}"`;
        await pool.execute(sql);
    }

    static async delete(id) {
        const sql = `DELETE FROM users WHERE id = "${id}"`;
        await pool.execute(sql);
    }

    get id() {
        return this._id;
    }

    get account() {
        return this._account;
    }

    get password() {
        return this._password;
    }

    get phone() {
        return this._phone;
    }

    get name() {
        return this._name;
    }

    get avatar() {
        return this._avatar;
    }

    get registDt() {
        return this._registDt;
    }

    
    set id(id) {
        return this._id;
    }

    set account(account) {
        return this._account;
    }

    set password(password) {
        return this._password;
    }

    set phone(phone) {
        this._phone = phone;
    }

    set name(name) {
        this._name = name;
    }

    set avatar(avatar) {
        this._avatar = avatar;
    }

    set registDt(registDt) {
        this._registDt = registDt;
    }
}

module.exports = User;
