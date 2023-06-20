import * as actionTypes from './actionTypes';
import * as actionPayloadChartTypes from 'models/SearchChart';


// Chart get data
export const searchChartGetData = (payload: actionPayloadChartTypes.SearchRequestPayload) => {
  return {type: actionTypes.SEARCH_CHART_GET_DATA, payload:payload};
};

export const searchChartGetDataSuccess = (payload: actionPayloadChartTypes.SearchChartSuccessPayload) => {
  return {type: actionTypes.SEARCH_CHART_GET_DATA_SUCCESS, payload:payload};
};

export const searchChartGetDataFalse = (payload: actionPayloadChartTypes.SearchChartFalsePayload) => {
  return {type: actionTypes.SEARCH_CHART_GET_DATA_FALSE, payload:payload};
};

export const errorConnectServerFalse = (payload: actionPayloadChartTypes.errorConnectServer) => {
  return {type: actionTypes.CONNECT_API_ERROR, payload:payload};
};
