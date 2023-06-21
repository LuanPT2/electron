const pool = require('../databases/mysql.db');

class ConfigSensor {
    constructor(minTemp, maxTemp, minHumi, maxHumi, minWater, maxWater, minIllu, maxIllu, minPH, maxPH,
         StaPump, StaLight, StarDisch, StaCharge) {
        this._id = null;
        this._minTemp = minTemp;
        this._maxTemp = maxTemp;
        this._minHumi = minHumi;
        this._maxHumi = maxHumi;
        this._minWater = minWater;
        this._maxWater = maxWater;
        this._minIllu = minIllu;
        this._maxIllu = maxIllu;
        this._minPH = minPH;
        this._maxPH = maxPH;
        this._StaPump = StaPump;
        this._StaLight = StaLight;
        this._StarDisch = StarDisch;
        this._StaCharge = StaCharge;

    }

    static async filter(options) {
        var sql = `SELECT * FROM config WHERE 1 = 1`
        const [rows, fields] = await pool.execute(sql);
        return rows;
    }

    static async updateSensor(options) {
        const sql = `UPDATE config SET
            minTemp = "${options.minTemp}", 
            maxTemp = "${options.maxTemp}",
            minHumi = "${options.minHumi}", 
            maxHumi = "${options.maxHumi}",
            minWater = "${options.minWater}", 
            maxWater = "${options.maxWater}",
            minIllu = "${options.minIllu}", 
            maxIllu = "${options.maxIllu}",
            minPH = "${options.minPH}",
            maxPH = "${options.maxPH}",
            status = "${options.status}"
            WHERE 1=1`;
        await pool.execute(sql);
    }

    static async updateDevice(options) {
        const sql = `UPDATE config SET
            StaPump = "${options.StaPump}",
            StaLight = "${options.StaLight}",
            StarDisch = "${options.StarDisch}",
            StaCharge = "${options.StaCharge}",
            status = "${options.status}"
            WHERE 1=1`;
        await pool.execute(sql);
    }

    static async updateStatus(options) {
        const sql = `UPDATE config SET
            status = "${options.status}"
            WHERE 1=1`;
        await pool.execute(sql);
    }

    get id() {
        return this._id;
    }

    get minTemp() {
        return this._minTemp;
    }

    get maxTemp() {
        return this._maxTemp;
    }

    get minHumi() {
        return this._minHumi;
    }

    get maxHumi() {
        return this._maxHumi;
    }

    get minWater() {
        return this._minWater;
    }

    get maxWater() {
        return this._maxWater;
    }

    get minPH() {
        return this._minPH;
    }

    get maxPH() {
        return this._maxPH;
    }

    get StaPump() {
        return this._StaPump;
    }

    get StaLight() {
        return this._StaLight;
    }

    get StarDisch() {
        return this._StarDisch;
    }

    get StaCharge() {
        return this._StaCharge;
    }

    get status() {
        return this._status;
    }



    set id(id) {
        this._id = id;
    }

    set minTemp(minTemp) {
        this._minTemp = minTemp;
    }

    set maxTemp(maxTemp) {
        this._maxTemp = maxTemp;
    }

    set minHumi(minHumi) {
        this._minHumi = minHumi;
    }

    set maxHumi(maxHumi) {
        this._maxHumi = maxHumi;
    }

    set minWater(minWater) {
        this._minWater = minWater;
    }

    set maxWater(maxWater) {
        this._maxWater = maxWater;
    }

    set minIllu(minIllu) {
        this._minIllu = minIllu;
    }

    set maxIllu(maxIllu) {
        this._maxIllu = maxIllu;
    }

    set minPH(minPH) {
        this._minPH = minPH;
    }

    set maxPH(maxPH) {
        this._maxPH = maxPH;
    }

    set StaPump(StaPump) {
        this._StaPump = StaPump;
    }

    set StaLight(StaLight) {
        this._StaLight = StaLight;
    }
    
    set StarDisch(StarDisch) {
        this._StarDisch = StarDisch;
    }

    set StaCharge(StaCharge) {
        this._StaCharge = StaCharge;
    }

    set status(status) {
        this._status = status;
    }
}

module.exports = ConfigSensor;
