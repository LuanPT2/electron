const pool = require('../databases/mysql.db');

class ConfigSensor {
    constructor(EnvTempMin, EnvTempMax, HumiMin, HumiMax, PHMin, PHMax) {
        this._id = null;
        this._EnvTempMin = EnvTempMin;
        this._EnvTempMax = EnvTempMax;
        this._HumiMin = HumiMin;
        this._HumiMax = HumiMax;
        this._PHMin = PHMin;
        this._PHMax = PHMax;
    }

    static async update(options) {
        const sql = `UPDATE config SET 
            EnvTempMin = "${options.EnvTempMin}", 
            EnvTempMax = "${options.EnvTempMax}",
            HumiMin = "${options.HumiMin}", 
            HumiMax = "${options.HumiMax}",
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

    get HumiMin() {
        return this._HumiMin;
    }

    get HumiMax() {
        return this._HumiMax;
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

    set HumiMin(HumiMin) {
        this._HumiMin = HumiMin;
    }

    set HumiMax(HumiMax) {
        this._HumiMax = HumiMax;
    }

    set PHMin(PHMin) {
        this._PHMin = PHMin;
    }

    set PHMax(PHMax) {
        this._PHMax = PHMax;
    }
}

module.exports = ConfigSensor;
