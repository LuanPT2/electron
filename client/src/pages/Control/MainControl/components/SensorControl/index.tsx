import React, { useEffect, useRef, useState } from "react";
import Button from "components/Button";
import { sensorInfo } from "models/Sensor";
import MultiRangeSlider, { ChangeResult } from "components/MultiRangeSlider";

type SensorControlProps = {
  sensorInfo: sensorInfo;
};

const SensorControl = ({ sensorInfo }: SensorControlProps) => {
  const [minMonthValue, setMinMonthValue] = useState(0);
  const [maxMonthValue, setMaxMonthValue] = useState(100);

  const ref = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState(25);
  const [maxValue, setMaxValue] = useState(75);
  const [minValue2, setMinValue2] = useState(25);
  const [maxValue2, setMaxValue2] = useState(75);
  const [minValue3, setMinValue3] = useState(0);
  const [maxValue3, setMaxValue3] = useState(6);
  const [minValue4, setMinValue4] = useState(0);
  const [maxValue4, setMaxValue4] = useState(0);
  const [minValue5, setMinValue5] = useState(0);
  const [maxValue5, setMaxValue5] = useState(0);
  const [minValue6, setMinValue6] = useState(0);
  const [maxValue6, setMaxValue6] = useState(0);
  useEffect(() => {
    const div = ref.current;
    console.log(div);
  }, []);
  const [minCaption, set_minCaption] = useState("");

  const [maxCaption, set_maxCaption] = useState("");

  const changeConfigEnv = () => {
    // todo
  };

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
              minValue={30}
              maxValue={60}
              step={0.5}
              stepOnly={true}
              onInput={(e: ChangeResult) => {
                setMinValue(e.minValue);
                setMaxValue(e.maxValue);
              }}
            />
          </div>
        </div>
        <div className="row-device">
          <div className="col-type control-colum1">
            <p>Độ ẩm</p>
          </div>
          <div className="col-type control-colum2">
            <p>{sensorInfo.EnvTemp}%</p>
          </div>
          <div className="col-type control-colum3">
            <MultiRangeSlider
              min={0}
              max={100}
              minValue={30}
              maxValue={60}
              step={1}
              stepOnly={true}
              onInput={(e: ChangeResult) => {
                setMinValue(e.minValue);
                setMaxValue(e.maxValue);
              }}
            />
          </div>
        </div>
        <div className="row-device">
          <div className="col-type control-colum1">
            <p>Độ PH</p>
          </div>
          <div className="col-type control-colum2">
            <p>{sensorInfo.EnvTemp}</p>
          </div>
          <div className="col-type control-colum3">
            <MultiRangeSlider
              min={1}
              max={13}
              minValue={5}
              maxValue={6}
              step={0.1}
              stepOnly={true}
              onInput={(e: ChangeResult) => {
                setMinValue(e.minValue);
                setMaxValue(e.maxValue);
              }}
            />
          </div>
        </div>
        <Button
          onClick={() => changeConfigEnv()}
          customClass="btns_general btns__edit"
        >
          Thay đổi cấu hình
        </Button>
      </div>
    </div>
  );
};

export default SensorControl;
