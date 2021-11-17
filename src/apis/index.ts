import axios from '../utils/axios';
import { AxiosResponse } from 'axios';

interface res {
  data: any;
  code: number;
  msg?: string;
}

export function getTodo(params: any) {
  return axios.get('api/todo', { params });
}

export function addTodo(data: any) {
  return axios.post<any, res>('api/todo/add', data);
}

export function deleteTodo(data: any) {
  return axios.post<any, res>('api/todo/delete', data);
}

export function updateMemo(data: any) {
  return axios.post<any, res>('api/memo/update', data);
}

export function getMemo(params: any) {
  return axios.get<any, res>('api/memo/get', { params });
}
