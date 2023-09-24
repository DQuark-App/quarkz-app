import axios, {AxiosInstance} from 'axios';
import auth from '@react-native-firebase/auth';
// @ts-ignore
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FolderResponse = {
  name: string;
  uid: string;
  created_at: Date;
};
class DQService {
  private static _instance: DQService;
  private static API: AxiosInstance;
  private constructor() {
    DQService.API = axios.create({
      baseURL: API_URL,
    });

    DQService.API.interceptors.request.use(async config => {
      if (!auth().currentUser) {
        return config;
      }
      config.headers.Authorization = await AsyncStorage.getItem('idToken');
      return config;
    });
  }

  public getFolder() {
    return DQService.API.get('/api/album');
  }

  public createFolder(name: string) {
    return DQService.API.put('/api/album', {name});
  }

  public getFiles() {
    return DQService.API.get('/api/file');
  }
  public static get instance() {
    if (!this._instance) {
      this._instance = new DQService();
    }
    return this._instance;
  }
}

export default DQService;
