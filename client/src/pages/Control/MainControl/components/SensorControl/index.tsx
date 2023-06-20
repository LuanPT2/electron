import React, { useEffect, useRef, useState } from "react";
import { SensorInfo } from "models/Sensor";
import MultiRangeSlider, { ChangeResult } from "components/MultiRangeSlider";
import Button from "components/Button";
import {
  getDataSensor,
  changeConfigSensor,
} from "pages/Control/redux/action/actionCreators";
import { useAppDispatch, useAppSelector } from "utils/hook";

const SensorControl = () => {
  const dispatch = useAppDispatch();
  const { sensorInfo } = useAppSelector((state) => state.sensorReducer);
  const [sensorInfoState, setSensorInfoState] = useState<SensorInfo>({
    EnvTemp: 0,
    EnvTempMin: 25,
    EnvTempMax: 28,
    EnvHumi: 0,
    EnvHumiMin: 60,
    EnvHumiMax: 70,
    PH: 0,
    PHMin: 6,
    PHMax: 7,
    StaLight: 0,
    StaLightMin: 0,
    StaLightMax: 0,
    Flow: 0,
    StartPump: 0,
    StartCharge: 0,
    StarDisch: 0,
    PumTemp: 0,
    Illu: 0,
    StaPump: 0,
    StaCharge: 0,
  });

  useEffect(() => {
    dispatch(getDataSensor());
  }, []);

  const handleOnChangeSliderValue = (
    valueMin: number,
    nameMin: string,
    valueMax: number,
    nameMax: string
  ) => {
    setSensorInfoState({
      ...sensorInfoState,
      [nameMin]: valueMin,
      [nameMax]: valueMax,
    });
  };

  useEffect(() => {
    if (sensorInfo) {
      setSensorInfoState(sensorInfo);
      const interval = setInterval(() => {
        console.log("Call interval!");
        dispatch(getDataSensor());
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [sensorInfo]);

  const onClickChangeConfig = () => {
    dispatch(changeConfigSensor(sensorInfoState));
  };

  return (
    <div className="sensor-control-page">
      <div className="control">
        <div className="row-device">
          <div className="col-type control-colum1">
            <p>Nhiệt độ</p>
          </div>
          <div className="col-type control-colum2">
            <p>{sensorInfoState.EnvTemp}°C</p>
          </div>
          <div className="col-type control-colum3">
            <MultiRangeSlider
              min={15}
              max={35}
              minValue={sensorInfoState.EnvTempMin}
              maxValue={sensorInfoState.EnvTempMax}
              step={0.5}
              stepOnly={true}
              onChange={(e: ChangeResult) => {
                handleOnChangeSliderValue(
                  e.minValue,
                  "EnvTempMin",
                  e.maxValue,
                  "EnvTempMax"
                );
              }}
            />
          </div>
        </div>
        <div className="row-device">
          <div className="col-type control-colum1">
            <p>Độ ẩm</p>
          </div>
          <div className="col-type control-colum2">
            <p>{sensorInfoState.EnvHumi}%</p>
          </div>
          <div className="col-type control-colum3">
            <MultiRangeSlider
              min={0}
              max={100}
              minValue={sensorInfoState.EnvHumiMin}
              maxValue={sensorInfoState.EnvHumiMax}
              step={1}
              stepOnly={true}
              onChange={(e: ChangeResult) => {
                handleOnChangeSliderValue(
                  e.minValue,
                  "EnvHumiMin",
                  e.maxValue,
                  "EnvHumiMax"
                );
              }}
            />
          </div>
        </div>
        <div className="row-device">
          <div className="col-type control-colum1">
            <p>Độ PH</p>
          </div>
          <div className="col-type control-colum2">
            <p>{sensorInfoState.PH}</p>
          </div>
          <div className="col-type control-colum3">
            <MultiRangeSlider
              min={1}
              max={13}
              minValue={sensorInfoState.PHMin}
              maxValue={sensorInfoState.PHMax}
              step={0.1}
              stepOnly={true}
              onChange={(e: ChangeResult) => {
                handleOnChangeSliderValue(
                  e.minValue,
                  "PHMin",
                  e.maxValue,
                  "PHMax"
                );
              }}
            />
          </div>
        </div>
        <div className="row-device">
          <div className="col-type control-colum1">
            <p>Độ Sáng</p>
          </div>
          <div className="col-type control-colum2">
            <p>{sensorInfoState.StaLight}</p>
          </div>
          <div className="col-type control-colum3">
            <MultiRangeSlider
              min={1}
              max={100}
              minValue={sensorInfoState.StaLightMin}
              maxValue={sensorInfoState.StaLightMax}
              step={1}
              stepOnly={true}
              onChange={(e: ChangeResult) => {
                handleOnChangeSliderValue(
                  e.minValue,
                  "StaLightMin",
                  e.maxValue,
                  "StaLightMax"
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="center">
        <Button
          onClick={onClickChangeConfig}
          customClass="btn--primary center button-changeconfig"
        >
          Thay đổi cấu hình
        </Button>
      </div>
    </div>
  );
};

export default SensorControl;
