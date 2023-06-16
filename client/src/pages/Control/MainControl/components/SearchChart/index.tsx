import DateTimePicker from "components/DateTimePicker";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "utils/hook";
import { SearchChartInfo } from "models/SearchChart";
import React, { useState, useEffect, useRef } from "react";

const SearchChart = () => {
  const dispatch = useAppDispatch();
  const [searchChartInfo, setSearchChartInfo] = useState<SearchChartInfo>({
    searchDate: "",
  });

  const handleOnchangeDateSearch = (date: Date) => {
    console.log(date);
  };

  return (
    <div className="search-chart searchbtn-form">
      <div className="date_time">
        <DateTimePicker
          className="form-employement-change-report-front-side__group-10__col4"
          selected={
            searchChartInfo.searchDate
              ? moment(searchChartInfo.searchDate, "YYYY-MM-DD").toDate()
              : ("" as unknown as Date)
          }
          showTimeSelect
          onChange={(date: Date) => {
            handleOnchangeDateSearch(date);
          }}
          dateFormat="yyyy.MM.dd"
          isShowIcon={true}
        />
      </div>
    </div>
  );
};

export default SearchChart;
