import { REGEX } from "constants/regex";
import React, { RefObject } from "react";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import IMAGES from "themes/images";

type DateTimePickerType = {
  selected?: Date;
  dateFormat?: string;
  maxDate?: Date;
  minDate?: Date;
  onChange: (date: Date) => void;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  timeIntervals?: number;
  timeFormat?: string;
  timeInputLabel?: string;
  className?: string;
  isShowIcon?: boolean;
  innerRef?: React.MutableRefObject<DatePicker>;
  disabled?: boolean;
  selectsRange?: boolean;
  startDate?: Date;
  endDate?: Date;
  placeholderText?: string;
  filterTime?: (time: Date) => boolean;
  showYearPicker?: boolean;
  yearItemNumber?: number;
};

const DateTimePicker = ({
  selected,
  dateFormat = "yyyy-MM-dd",
  maxDate,
  minDate,
  onChange,
  showTimeSelect = false,
  showTimeSelectOnly = false,
  timeIntervals = 30,
  timeFormat = "HH:mm",
  timeInputLabel = "Time:",
  className,
  isShowIcon = true,
  innerRef,
  disabled,
  selectsRange = false,
  startDate,
  endDate,
  placeholderText,
  filterTime,
  showYearPicker,
  yearItemNumber,
}: DateTimePickerType) => {
  const datepickerRef = useRef<DatePicker>(null);

  const handleClickIcon = () => {
    const datepickerElement = datepickerRef.current;
    datepickerElement?.setFocus(true);
  };

  const isValidDate = (year, month, day) => {
    const date = new Date(year, month, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    );
  };

  const replaceSpecialCharracter = (text: string) => {
    if (!text) return "";
    return text.replace(/[^\d]/g, "");
  };

  const parseInputValue = (value) => {
    const dateParts = replaceSpecialCharracter(value).match(REGEX.DATE);
    console.log(minDate, maxDate);
    if (dateParts) {
      const year = parseInt(dateParts[1]);
      const month = parseInt(dateParts[2]) - 1; // month in JavaScript start = 0
      const day = parseInt(dateParts[3]);

      if (isValidDate(year, month, day)) {
        const dateSelect = new Date(year, month, day);
        const dateSelectTime = dateSelect.getTime();

        if (minDate && minDate?.toDateString() !== "Invalid Date") {
          const minDateTime = new Date(minDate).getTime();
          if (minDateTime > dateSelectTime) {
            return null;
          }
        } else if (maxDate && maxDate?.toDateString() !== "Invalid Date") {
          const maxDateTime = new Date(maxDate).getTime();
          if (maxDateTime < dateSelectTime) {
            return null;
          }
        }

        return dateSelect;
      }
    }

    return null;
  };

  const handleOnChangeRaw = (event) => {
    const inputValue = event.target.value;

    if (!inputValue) {
      return;
    }
    const parsedDate = parseInputValue(inputValue);

    if (parsedDate) {
      onChange(parsedDate);
    } else {
      onChange("" as unknown as Date);
    }
  };

  return (
    <div
      className={`${
        disabled ? "calendar--disable" : ""
      } calendar position-relative d-flex`}
    >
      {isShowIcon && (
        <img
          src={IMAGES.icon_date}
          alt=""
          width={20}
          onClick={() => handleClickIcon()}
        />
      )}
      {isShowIcon && (
        <img
          src={IMAGES.icon_date_selected}
          alt=""
          width={20}
          onClick={() => handleClickIcon()}
          className="icon-date-selected"
        />
      )}
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat={dateFormat}
        maxDate={
          maxDate?.toDateString() !== "Invalid Date" ? maxDate : undefined
        }
        minDate={
          minDate?.toDateString() !== "Invalid Date" ? minDate : undefined
        }
        ref={isShowIcon ? datepickerRef : innerRef}
        showTimeSelect={showTimeSelect}
        showTimeSelectOnly={showTimeSelectOnly}
        timeIntervals={timeIntervals}
        timeFormat={timeFormat}
        timeInputLabel={timeInputLabel}
        className={className}
        disabled={disabled}
        onKeyDown={(e) => {
          // if (e.key === 'Backspace' || e.key === 'Delete') {
          //   onChange('' as unknown as Date);
          // } else {
          //   e.preventDefault();
          // }

          if (selectsRange) {
            e.preventDefault();
          }
        }}
        onChangeRaw={handleOnChangeRaw}
        selectsRange={selectsRange}
        startDate={startDate}
        endDate={endDate}
        showMonthDropdown
        showYearDropdown
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        placeholderText={placeholderText}
        filterTime={filterTime}
        showYearPicker={showYearPicker}
        yearItemNumber={yearItemNumber}
      />
    </div>
  );
};

export default DateTimePicker;
