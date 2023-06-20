import * as actionTypes from '../action/actionTypes';
import * as actionPayloadTypes from 'models/SearchChart';

export const initialStateDataSearchChart: actionPayloadTypes.InitialStateDataSearchChart = {
  type: '',
  isProcessing: false,
  statusCode: '',
  message: '',
  listDataChartInfo:{} as actionPayloadTypes.ListDataChartInfo,
};

const chartsSensorReducer = (
  state: actionPayloadTypes.InitialStateDataSearchChart = initialStateDataSearchChart,
  action: actionPayloadTypes.RequestActions,
) => {
  switch (action.type) {
    case actionTypes.SEARCH_CHART_GET_DATA:
      return {
        ...state,
        type: action.type,
        isProcessing: true,
      };

    case actionTypes.SEARCH_CHART_GET_DATA_SUCCESS:
        return {
          ...state,
          type: action.type,
          isProcessing: true,
          listDataChartInfo: action.payload.data.listDataChartInfo || {},
        };

    case actionTypes.SEARCH_CHART_GET_DATA_FALSE:
          return {
            ...state,
            message: 'Get data lỗi!',
            type: action.type,
            isProcessing: true
          };

    default:
      return state;
  }
};

export default chartsSensorReducer;
