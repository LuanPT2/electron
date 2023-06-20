const pool = require('../databases/mysql.db');

class DataSensor {
    constructor(EnvTemp, EnvHumi, PumTemp, Flow, PH, Illu, StaPump, StaLight, StarDisch, StaCharge) {
        this._id = null;
        this._EnvTemp = EnvTemp;
        this._EnvHumi = EnvHumi;
        this._PumTemp = PumTemp;
        this._Flow = Flow;
        this._PH = PH;
        this._Illu = Illu;
        this._StaPump = StaPump;
        this._StaLight = StaLight;
        this._StarDisch = StarDisch;
        this._StaCharge = StaCharge;
        this._registDt = null;
    }

    static async getLatestData() {
        var sql = `SELECT * FROM sensor_history WHERE 1 = 1 ORDER BY regist_dt DESC limit 1`
        const [rows, fields] = await pool.execute(sql);
        return rows;
    }

    static async filter(options) {
        var datet=  options.searchDate;
        var sql = `SELECT AVG(s.EnvTemp) as EnvTemp, AVG(s.EnvHumi) as EnvHumi, AVG(s.PH) as PH, AVG(s.StaLight) as StaLight, TIME_FORMAT(s.regist_dt, '%H:%i') as lable
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
        ( EnvTemp, EnvHumi, PumTemp, Flow, PH, Illu, StaPump, StaLight, StarDisch, StaCharge) 
        VALUES ("${this.EnvTemp}", "${this.EnvHumi}", "${this.PumTemp}", "${this.Flow}", "${this.PH}", "${this.Illu}",
         "${this.StaPump}", "${this.StaLight}", "${this.StarDisch}", "${this.StaCharge}")`;
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

    get PumTemp() {
        return this._PumTemp;
    }

    get Flow() {
        return this._Flow;
    }

    get PH() {
        return this._PH;
    }

    get Illu() {
        return this._Illu;
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



    set EnvTemp(EnvTemp) {
        return this._EnvTemp = EnvTemp;
    }

    set EnvHumi(EnvHumi) {
        return this._EnvHumi = EnvHumi;
    }

    set PumTemp(PumTemp) {
        this._PumTemp = PumTemp;
    }

    set Flow(Flow) {
        this._Flow = Flow;
    }

    set PH(PH) {
        this._PH = PH;
    }

    set Illu(Illu) {
        this._Illu = Illu;
    }

    set StaPump(StaPump) {
        this._StaPump = StaPump;
    }

    set StaLight(StaLight) {
        this._StaLight = StaLight;
    }

    set StaCharge(StaCharge) {
        this._StaCharge= StaCharge;
    }

    set registDt(registDt) {
        this._registDt = registDt;
    }
}

module.exports = DataSensor;
