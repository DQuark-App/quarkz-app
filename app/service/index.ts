import axios, {AxiosInstance} from 'axios';
// @ts-ignore
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as fs from 'react-native-fs';
export type FolderResponse = {
  name: string;
  uid: string;
  created_at: string;
  updated_at: string;
};

export type FileResponse = {
  cid: string;
  album_uid: string;
  created_at: string;
};

export type ModelResponse = {
  name: string;
  image: string;
};
class DQService {
  private static _instance: DQService;
  private static API: AxiosInstance;
  private constructor() {
    DQService.API = axios.create({
      baseURL: API_URL,
    });

    DQService.API.interceptors.request.use(async config => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return config;
      }
      config.headers.Authorization = token;
      return config;
    });

    DQService.API.interceptors.response.use(response => {
      if (response.data) {
        console.log(response.request.responseURL, response.data);
      }
      return response;
    });
  }

  public getFolder(lastestTimestamp: number = 0) {
    return DQService.API.get(
      '/api/album?lastest_timestamp=' + lastestTimestamp,
    );
  }

  public createFolder(name: string) {
    return DQService.API.put('/api/album', {name});
  }

  public editFolder(uid: string, name: string) {
    return DQService.API.post('/api/album', {uid, name});
  }

  public deleteFolder(uid: string) {
    return DQService.API.delete('/api/album?uid=' + uid);
  }

  public async uploadFile(albumUid: string, image: string) {
    const data = await fs.readFile(image, 'base64');

    return DQService.API.post('/api/file', {
      data,
      album_uid: albumUid,
    });
  }

  public async uploadMetadata(data: object) {
    return DQService.API.post('/api/metadata', data);
  }

  public async createArt(text: string, model: string, isHD: boolean) {
    return DQService.API.post('/api/art', {text, model, isHD});
  }

  public getFiles(albumUid: string, lastestTimestamp: number = 0) {
    return DQService.API.get(
      '/api/file?album_uid=' +
        albumUid +
        '&lastest_timestamp=' +
        lastestTimestamp,
    );
  }

  public getModels() {
    return DQService.API.get('/api/model');
  }
  public static get instance() {
    if (!this._instance) {
      this._instance = new DQService();
    }
    return this._instance;
  }
}

export default DQService;
