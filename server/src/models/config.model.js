const pool = require('../databases/mysql.db');

class ConfigSensor {
    constructor(EnvTempMin, EnvTempMax, EnvHumiMin, EnvHumiMax, PHMin, PHMax) {
        this._id = null;
        this._EnvTempMin = EnvTempMin;
        this._EnvTempMax = EnvTempMax;
        this._EnvHumiMin = EnvHumiMin;
        this._EnvHumiMax = EnvHumiMax;
        this._PHMin = PHMin;
        this._PHMax = PHMax;
    }

    static async update(options) {
        const sql = `UPDATE config SET 
            EnvTempMin = "${options.EnvTempMin}", 
            EnvTempMax = "${options.EnvTempMax}",
            EnvHumiMin = "${options.EnvHumiMin}", 
            EnvHumiMax = "${options.EnvHumiMax}",
            PHMin = "${options.PHMin}", 
            PHMax = "${options.PHMax}"
            WHERE id = "1"`;
        await pool.execute(sql);
    }

    get id() {
        return this._id;
    }

    get EnvTempMin() {
        return this._EnvTempMin;
    }

    get EnvTempMax() {
        return this._EnvTempMax;
    }

    get EnvHumiMin() {
        return this._EnvHumiMin;
    }

    get EnvHumiMax() {
        return this._EnvHumiMax;
    }

    get PHMin() {
        return this._PHMin;
    }

    get PHMax() {
        return this._PHMax;
    }

    
    set id(id) {
        return this._id;
    }

    set EnvTempMin(EnvTempMin) {
        return this._EnvTempMin;
    }

    set EnvTempMax(EnvTempMax) {
        return this._EnvTempMax;
    }

    set EnvHumiMin(EnvHumiMin) {
        this._EnvHumiMin = EnvHumiMin;
    }

    set EnvHumiMax(EnvHumiMax) {
        this._EnvHumiMax = EnvHumiMax;
    }

    set PHMin(PHMin) {
        this._PHMin = PHMin;
    }

    set PHMax(PHMax) {
        this._PHMax = PHMax;
    }
}

module.exports = ConfigSensor;
