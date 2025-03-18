import { API_URL } from '@/constants/constants';
import axios, { type CreateAxiosDefaults } from 'axios';

export const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-type': 'application/json',
	},
	withCredentials: true,
};

export const axiosClassic = axios.create(options);
