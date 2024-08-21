import { IUser } from '@/interface/IUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
const api = axios.create({
    baseURL: 'https://api.funface.online',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
       
      },
})

api.interceptors.response.use(
    async (response) => {
      console.log("here");
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