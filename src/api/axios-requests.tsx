import axiosClient from './axios-client';
import { z } from 'zod';

export async function getOne<T>(url: string, schema: z.Schema<T>, id: string): Promise<T> {
  const response = await axiosClient.get(`${url}/${id}`);
  return schema.parse(response.data);
}

export async function searchOne<T>(
  primaryKey: string,
  schema: z.Schema<T>,
  queryParams: URLSearchParams = new URLSearchParams(),
): Promise<T> {
  const url = primaryKey.concat('?', queryParams.toString());
  console.log('url: ', url); // e.g. 'files/uploaded?num_rows=30
  const response = await axiosClient.get(url);
  return schema.parse(response.data);
}

export async function getAll<T>(
  primaryKey: string,
  schema: z.Schema<T>,
  queryParams: URLSearchParams = new URLSearchParams(),
): Promise<T[]> {
  const url = primaryKey.concat('?', queryParams.toString());
  console.log('url: ', url); // e.g. 'files/uploaded?num_rows=30
  const response = await axiosClient.get(url);
  return schema.array().parse(response.data);
}

export async function postRequest<T>(
  primaryKey: string,
  schema: z.Schema<T>,
  data: any,
): Promise<T> {
  const response = await axiosClient.post(primaryKey, data);
  return schema.parse(response.data);
}

export async function postFile<T>(primaryKey: string, file: File, tab: string): Promise<T> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('tab', tab);

  const response = await axiosClient.post(primaryKey, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
}

// Add the new function for file download
export async function downloadFile(url: string, filename: string): Promise<void> {
  try {
    const response = await axiosClient.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: response.headers['content-type'] });

    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = filename;

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error('Error downloading file:', error);
    // Handle the error, e.g., display an error message to the user
  }
}
