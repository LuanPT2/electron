import React, { useEffect, useRef, useState } from "react";
import { SensorInfo } from "models/Sensor";
import MultiRangeSlider, { ChangeResult } from "components/MultiRangeSlider";
import Button from "components/Button";
import {
  getDataSensor,
  changeConfigSensor,
} from "pages/Control/redux/action/actionCreators";
import { useAppDispatch, useAppSelector } from "utils/hook";
import ToggleSwitch from "components/ToggleSwitch";
import IMAGES from "themes/images";
import Modal from "components/Modal";
import { ModalTwoButton } from "models/ModalType";

const SensorControl = () => {
  const [buttonText, setButtonText] = useState("Thay đổi");
  const [isEdit, setIsEdit] = useState(false);

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
    StaPump: "",
    StaLight: "",
    StarDisch: "",
    StaCharge: "",
  });

  const [modalTwoButton, setModalTwoButton] = useState<ModalTwoButton>({
    type: "",
    title: "Xác Nhận Thay Đổi Cấu Hình",
    content: "Bạn muốn thay đổi cấu hình?",
    isShow: false,
    textButtonLeft: "Không",
    textButtonRight: "Có",
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
      if (!isEdit) {
        setSensorInfoState(sensorInfo);
      }
      const interval = setInterval(() => {
        dispatch(getDataSensor());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sensorInfo]);

  const onClickChangeConfig = () => {
    if (isEdit) {
      setButtonText("Thay đổi");
      setModalTwoButton({ ...modalTwoButton, isShow: true });
    } else {
      setButtonText("Lưu");
      setIsEdit(!isEdit);
    }
  };

  return (
    <div className="sensor-control-page">
      <div className={"control " + (isEdit ? "" : "disabledbutton")}>
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
                  "minWater",
                  e.maxValue,
                  "maxWater"
                );
              }}
            />
          </div>
        </div>
        <div className="control-devices">
          <div className="block-device">
            <div className="image-device">
              <img src={IMAGES.divice_pump} alt="" width={120} />
            </div>
            <div className="name-device">
              <p>Phun Sương</p>
            </div>
            <div className="switch-device">
              <ToggleSwitch
                onChange={(e) => {
                  setSensorInfoState({
                    ...sensorInfoState,
                    ["StaPump"]: e.target.checked == true ? "on" : "off",
                  });
                }}
                id="1"
                isChecked={sensorInfoState.StaPump === "on" ? true : false}
                name="rememberMe"
              />
            </div>
          </div>
          <div className="block-device">
            <div className="image-device">
              <img src={IMAGES.divice_light} alt="" width={120} />
            </div>
            <div className="name-device">
              <p>Đèn</p>
            </div>
            <div className="switch-device">
              <ToggleSwitch
                onChange={(e) => {
                  setSensorInfoState({
                    ...sensorInfoState,
                    ["StaLight"]: e.target.checked == true ? "on" : "off",
                  });
                }}
                id="2"
                isChecked={sensorInfoState.StaLight === "on" ? true : false}
                name="StaLight"
              />
            </div>
          </div>
          <div className="block-device">
            <div className="image-device">
              <img src={IMAGES.divice_disch} alt="" width={120} />
            </div>
            <div className="name-device">
              <p>Xả nước</p>
            </div>
            <div className="switch-device">
              <ToggleSwitch
                onChange={(e) => {
                  setSensorInfoState({
                    ...sensorInfoState,
                    ["StarDisch"]: e.target.checked == true ? "on" : "off",
                  });
                }}
                id="3"
                isChecked={sensorInfoState.StarDisch === "on" ? true : false}
                name="StarDisch"
              />
            </div>
          </div>
          <div className="block-device">
            <div className="image-device">
              <img src={IMAGES.divice_charge} alt="" width={120} />
            </div>
            <div className="name-device">
              <p>Bơm nước</p>
            </div>
            <div className="switch-device">
              <ToggleSwitch
                onChange={(e) => {
                  setSensorInfoState({
                    ...sensorInfoState,
                    ["StaCharge"]: e.target.checked == true ? "on" : "off",
                  });
                }}
                id="4"
                isChecked={sensorInfoState.StaCharge === "on" ? true : false}
                name="StaCharge"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="center">
        <Button
          onClick={onClickChangeConfig}
          customClass={
            "btn--primary center " + (isEdit ? "" : "button-changeconfig")
          }
        >
          {buttonText}
        </Button>
      </div>

      <Modal
        isOpen={modalTwoButton.isShow}
        title={modalTwoButton.title}
        handleSubmit={() => {
          setModalTwoButton({ ...modalTwoButton, isShow: false });
          dispatch(changeConfigSensor(sensorInfoState));
          setIsEdit(!isEdit);
        }}
        handleClose={() => {
          setModalTwoButton({ ...modalTwoButton, isShow: false });
          setIsEdit(!isEdit);
        }}
        textBtnRight={modalTwoButton.textButtonRight}
        textBtnLeft={modalTwoButton.textButtonLeft}
        isShowTwoBtn
      >
        {modalTwoButton.content}
      </Modal>
    </div>
  );
};

export default SensorControl;
