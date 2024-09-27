import { IUser } from '@/interface/IUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
// import axiosLogger from 'axios-logger';

// axios.interceptors.request.use(axiosLogger.requestLogger);
// axios.interceptors.response.use(axiosLogger.responseLogger);

const api = axios.create({
    baseURL: 'https://api.funface.online',
    headers: {
        'Access-Control-Allow-Origin': ['*','$http_origin'],
        'Access-Control-Allow-Headers': ['*','DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range'],
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT, PATCH',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': 1728000,
        'Content-Type':'multipart/form-data'


       
      },
      // interceptors: {
      //   request: [axiosLogger.requestLogger],
      //   response: [axiosLogger.responseLogger],
      // },
})




api.interceptors.response.use(
    async (response) => {
      const storedUser = await AsyncStorage.getItem("user");
      const user: IUser = storedUser ? JSON.parse(storedUser) : null;
      const token = user?.token as string;
      if (token) {
        response.headers.Authorization = `Bearer ${token}`;
      }
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

export default api