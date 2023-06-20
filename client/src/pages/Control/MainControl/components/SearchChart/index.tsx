import DateTimePicker from "components/DateTimePicker";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "utils/hook";
import { SearchRequestPayload } from "models/SearchChart";
import React, { useState, useEffect, useRef } from "react";
import { searchChartGetData } from "pages/Control/redux/action/chartActionCreators";

const SearchChart = () => {
  const dispatch = useAppDispatch();

  const [searchChartStateInfo, setSearchChartStateInfo] =
    useState<SearchRequestPayload>({
      searchDate: "",
    });

  useEffect(() => {
    dispatch(searchChartGetData(searchChartStateInfo));
  }, [searchChartStateInfo]);

  const handleOnchangeDateSearch = (date: string) => {
    setSearchChartStateInfo({
      ...searchChartStateInfo,
      searchDate: date,
    });
  };

  return (
    <div className="search-chart searchbtn-form">
      <div className="date_time">
        <DateTimePicker
          className="form-employement-change-report-front-side__group-10__col4"
          selected={
            searchChartStateInfo.searchDate
              ? moment(searchChartStateInfo.searchDate, "YYYY-MM-DD").toDate()
              : ("" as unknown as Date)
          }
          onChange={(date: Date) => {
            handleOnchangeDateSearch(
              moment(date).format("YYYY-MM-DD").toString()
            );
          }}
          dateFormat="yyyy-MM-dd"
          isShowIcon={true}
        />
      </div>
    </div>
  );
};

export default SearchChart;
