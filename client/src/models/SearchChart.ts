
import * as actionTypes from 'pages/Control/redux/action/actionTypes';

export type InitialStateDataSearchChart = {
  type: string;
  isProcessing: boolean;
  statusCode: string;
  message: string;
  listDataChartInfo: ListDataChartInfo;
}

export type ListDataChartInfo = {
  envTemps: string[],
  envHumis: string[],
  staLights: string[],
  pHs: string[],
  lables: string[]
};

export type errorConnectServer = {
  message: string;
}

export type SearchRequestPayload = {
  searchDate: string,
  // searchDateFrom: Date,
  // searchDateTo: Date,
};

export type SearchChartSuccessPayload = {
  statusCode: string;
  statusMessage: string;
  message: string;
  data: {
    listDataChartInfo: ListDataChartInfo;
  }
};

export type SearchChartFalsePayload = {
  statusCode: string;
  message: string;
};

export type SearchChartRequestAction = {
  type: typeof actionTypes.SEARCH_CHART_GET_DATA;
  payload: SearchRequestPayload;
};

export type SearchChartSuccessAction = {
  type: typeof actionTypes.SEARCH_CHART_GET_DATA_SUCCESS;
  payload: SearchChartSuccessPayload;
};

export type SearchChartFalseAction = {
  type: typeof actionTypes.SEARCH_CHART_GET_DATA_FALSE;
  payload: SearchChartFalsePayload;
};
export type RequestActions =
  | SearchChartRequestAction
  | SearchChartSuccessAction
  | SearchChartFalseAction;