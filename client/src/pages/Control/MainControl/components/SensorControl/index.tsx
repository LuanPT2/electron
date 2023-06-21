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
    minTemp: 0,
    maxTemp: 0,
    EnvHumi: 0,
    minHumi: 0,
    maxHumi: 0,
    EnvIllu: 0,
    minIllu: 0,
    maxIllu: 0,
    Water: 0,
    minWater: 0,
    maxWater: 0,
    PH: 0,
    minPH: 0,
    maxPH: 0,
    StaPump: 0,
    StaLight: 0,
    StarDisch: 0,
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
              minValue={sensorInfoState.minTemp}
              maxValue={sensorInfoState.maxTemp}
              step={0.5}
              stepOnly={true}
              onChange={(e: ChangeResult) => {
                handleOnChangeSliderValue(
                  e.minValue,
                  "minTemp",
                  e.maxValue,
                  "maxTemp"
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
              minValue={sensorInfoState.minHumi}
              maxValue={sensorInfoState.maxHumi}
              step={1}
              stepOnly={true}
              onChange={(e: ChangeResult) => {
                handleOnChangeSliderValue(
                  e.minValue,
                  "minHumi",
                  e.maxValue,
                  "maxHumi"
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
            <p>{sensorInfoState.EnvIllu}</p>
          </div>
          <div className="col-type control-colum3">
            <MultiRangeSlider
              min={2000}
              max={8000}
              minValue={sensorInfoState.minIllu}
              maxValue={sensorInfoState.maxIllu}
              step={100}
              stepOnly={true}
              onChange={(e: ChangeResult) => {
                handleOnChangeSliderValue(
                  e.minValue,
                  "minIllu",
                  e.maxValue,
                  "maxIllu"
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
              minValue={sensorInfoState.minPH}
              maxValue={sensorInfoState.maxPH}
              step={0.1}
              stepOnly={true}
              onChange={(e: ChangeResult) => {
                handleOnChangeSliderValue(
                  e.minValue,
                  "minPH",
                  e.maxValue,
                  "maxPH"
                );
              }}
            />
          </div>
        </div>
        <div className="row-device">
          <div className="col-type control-colum1">
            <p>Mức nước</p>
          </div>
          <div className="col-type control-colum2">
            <p>{sensorInfoState.Water}</p>
          </div>
          <div className="col-type control-colum3">
            <MultiRangeSlider
              min={1}
              max={100}
              minValue={sensorInfoState.minWater}
              maxValue={sensorInfoState.maxWater}
              step={0.5}
              stepOnly={true}
              onChange={(e: ChangeResult) => {
                handleOnChangeSliderValue(
                  e.minValue,
                  "minPH",
                  e.maxValue,
                  "maxPH"
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
