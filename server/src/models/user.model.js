const pool = require('../databases/mysql.db');

class User {
    constructor(account, password, phone, name, avatar) {
        this._account = account;
        this._password = password;
        this._phone = phone;
        this._name = name;
        this._avatar = avatar;
    }

    static async find() {
        const sql = 'SELECT * FROM users';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }

    static async find() {
        const sql = 'SELECT * FROM users';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }
     
    async save() {
        const sql = `INSERT INTO users (account, password, phone, name, avatar) VALUES (UUID(), "${this.account}", "${this.password}", "${this.phone}", "${this.name}", "${this.avatar}")`;
        await pool.execute(sql);
    }

    static async update(id, options) {
        const sql = `UPDATE users SET password = "${options.password}", last_name = "${options.phone}", name = "${options.name}", avatar = "${options.avatar}" WHERE id = "${id}"`;
        await pool.execute(sql);
    }

    static async delete(id) {
        const sql = `DELETE FROM users WHERE id = "${id}"`;
        await pool.execute(sql);
    }

    
    get firstName() {
        return this._firstName;
    }

    set firstName(firstName) {
        if (!firstName) throw new Error('Invalid first name value.');

        firstName = firstName.trim();
        if (firstName === '') throw new Error('Invalid first name value.');

        this._firstName = firstName;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(lastName) {
        if (!lastName) throw new Error('Invalid last name value.');

        lastName = lastName.trim();
        if (lastName === '') throw new Error('Invalid last name value.');

        this._lastName = lastName;
    }

    get age() {
        return this._age;
    }

    set age(age) {
        if (age < 0) throw new Error('Invalid age value.');

        this._age = age;
    }
}

module.exports = User;
