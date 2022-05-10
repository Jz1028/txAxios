import CancelToken from './cancel/CancelToken';
import Axios from './core/Axios';
import mergeConfig from './core/mergeConfig';
import defaults from './default';
import { extend } from './helpers/util';
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types';

function getAxios(defaultsConfig:AxiosRequestConfig):AxiosStatic{
  const context  = new Axios(defaultsConfig)
  const axios = Axios.prototype.request.bind(context) 

  extend(axios, context );

  
  return axios as AxiosStatic
}
const axios = getAxios(defaults)
axios.CancelToken = CancelToken
axios.create = function(config: AxiosRequestConfig) {
  return getAxios(mergeConfig(defaults, config));
};
export default axios
