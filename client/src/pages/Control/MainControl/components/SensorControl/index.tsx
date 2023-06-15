import React, { useEffect, useRef, useState } from "react";
import { SensorInfo } from "models/Sensor";
import MultiRangeSlider, { ChangeResult } from "components/MultiRangeSlider";
import Button from "components/Button";

type SensorControlProps = {
  sensorInfo: SensorInfo;
  onChangeInputValue: (value: number, name: string) => void;
  onClickChangeConfig: () => void;
};

const SensorControl = ({
  sensorInfo,
  onChangeInputValue,
  onClickChangeConfig,
}: SensorControlProps) => {
  return (
    <div className="sensor-control-page">
      <div className="control">
        <div className="row-device">
          <div className="col-type control-colum1">
            <p>Nhiệt độ</p>
          </div>
          <div className="col-type control-colum2">
            <p>{sensorInfo.EnvTemp}°C</p>
          </div>
          <div className="col-type control-colum3">
            <MultiRangeSlider
              min={15}
              max={35}
              minValue={sensorInfo.EnvTempMin}
              maxValue={sensorInfo.EnvTempMax}
              step={0.5}
              stepOnly={true}
              onInput={(e: ChangeResult) => {
                onChangeInputValue(e.minValue, "EnvTempMin");
                onChangeInputValue(e.maxValue, "EnvTempMax");
              }}
            />
          </div>
        </div>
        <div className="row-device">
          <div className="col-type control-colum1">
            <p>Độ ẩm</p>
          </div>
          <div className="col-type control-colum2">
            <p>{sensorInfo.EnvHumi}%</p>
          </div>
          <div className="col-type control-colum3">
            <MultiRangeSlider
              min={0}
              max={100}
              minValue={sensorInfo.EnvHumiMin}
              maxValue={sensorInfo.EnvHumiMax}
              step={1}
              stepOnly={true}
              onInput={(e: ChangeResult) => {
                onChangeInputValue(e.minValue, "EnvHumiMin");
                onChangeInputValue(e.maxValue, "EnvHumiMax");
              }}
            />
          </div>
        </div>
        <div className="row-device">
          <div className="col-type control-colum1">
            <p>Độ PH</p>
          </div>
          <div className="col-type control-colum2">
            <p>{sensorInfo.PH}</p>
          </div>
          <div className="col-type control-colum3">
            <MultiRangeSlider
              min={1}
              max={13}
              minValue={sensorInfo.PHMin}
              maxValue={sensorInfo.PHMax}
              step={0.1}
              stepOnly={true}
              onInput={(e: ChangeResult) => {
                onChangeInputValue(e.minValue, "PHMin");
                onChangeInputValue(e.maxValue, "PHMax");
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
