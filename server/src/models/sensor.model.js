const pool = require('../databases/mysql.db');

class DataSensor {
    constructor(EnvTemp, EnvHumi, EnvIllu, Water, PH ) {
        this._id = null;
        this._EnvTemp = EnvTemp;
        this._EnvHumi = EnvHumi;
        this._EnvIllu = EnvIllu;
        this._Water = Water;
        this._PH = PH;
        this._registDt = null;
    }

    static async getLatestData() {
        var sql = `SELECT * FROM sensor_history WHERE 1 = 1 ORDER BY regist_dt DESC limit 1`
        const [rows, fields] = await pool.execute(sql);
        return rows;
    }

    static async filter(options) {
        var datet=  options.searchDate;
        var sql = `SELECT
         AVG(s.EnvTemp) as EnvTemp,
         AVG(s.EnvHumi) as EnvHumi,
         AVG(s.EnvIllu) as EnvIllu,
         AVG(s.Water) as Water,
         AVG(s.PH) as PH,
         TIME_FORMAT(s.regist_dt, '%H:%i') as lable
        FROM sensor_history s
        WHERE 1=1 and 
            Date(s.regist_dt) = '${options.searchDate}'
        GROUP BY lable
        ORDER BY lable`;

        const [rows, fields] = await pool.execute(sql);
        return rows;
    }

    async save() {
        const sql = `INSERT INTO sensor_history
        ( EnvTemp, EnvHumi, EnvIllu, PH, Water) 
        VALUES ("${this.EnvTemp}", "${this.EnvHumi}", "${this.EnvIllu}", "${this.PH}", "${this.Water}")`;
        await pool.execute(sql);
    }

    get id() {
        return this._id;
    }

    get EnvTemp() {
        return this._EnvTemp;
    }

    get EnvHumi() {
        return this._EnvHumi;
    }

    get EnvIllu() {
        return this._EnvIllu;
    }

    get PH() {
        return this._PH;
    }

    get Water() {
        return this._Water;
    }




    set EnvTemp(EnvTemp) {
        return this._EnvTemp = EnvTemp;
    }

    set EnvHumi(EnvHumi) {
        return this._EnvHumi = EnvHumi;
    }

    set EnvIllu(EnvIllu) {
        this._EnvIllu = EnvIllu;
    }

    set PH(PH) {
        this._PH = PH;
    }

    set Water(Water) {
        this._Water = Water;
    }

    set registDt(registDt) {
        this._registDt = registDt;
    }
}

module.exports = DataSensor;
