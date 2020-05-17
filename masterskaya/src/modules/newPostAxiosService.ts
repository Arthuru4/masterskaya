import Axios from "axios";
import {delivery} from "../Components/Order/Order";

let _getCityData = {
    "apiKey": "b18b37481dbca2a475f4b888a7f8f672",
    "modelName": "Address",
    "calledMethod": "searchSettlements",
    "methodProperties": {
        "Language": "ru",
        "CityName": "киев",
        "Limit": 5
}
};

let _getWarehouses = {
    "modelName": "Address",
    "calledMethod": "getWarehouses",
    "methodProperties": {
        "Language": "ru",
        "CityName": "киев"

    },
    "apiKey": "b18b37481dbca2a475f4b888a7f8f672"
};

export const getCity = (CityName: string | delivery | undefined) => {
  // @ts-ignore
    return Axios({
    method: "POST",
    url: "https://api.novaposhta.ua/v2.0/json/",
    data: {..._getCityData, methodProperties: {..._getCityData.methodProperties, CityName} },
  },
      {
      headers: {
          'Content-Type': 'application/json'
      }
  });
};
export const getWarehouses = (CityName: string) => {
  // @ts-ignore
    return Axios({
    method: "POST",
    url: "https://api.novaposhta.ua/v2.0/json/",
    data: {..._getWarehouses, methodProperties: {..._getWarehouses.methodProperties, CityName} },
  },
      {
      headers: {
          'Content-Type': 'application/json'
      }
  });
};