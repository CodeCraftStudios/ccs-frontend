import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { SERVER_ENDPOINT } from './consts';

const api = axios.create({
	baseURL: SERVER_ENDPOINT,
	timeout: 25000,
	headers: {
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
	},
	withCredentials: true,
});

api.interceptors.request.use(
	(config) => {
		if (typeof window !== 'undefined') {
			// Log cookies for debug
			console.log('Request headers:', config.headers);
			console.log('Current cookies:', document.cookie);

			// Get CSRF token from cookie and attach to headers
			const csrfToken = Cookies.get('csrftoken');
			if (csrfToken) {
				config.headers['X-CSRFToken'] = csrfToken;
			}
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => {
		if (typeof window !== 'undefined') {
			console.log('Response received with cookies:', document.cookie);
		}
		return response;
	},
	(error) => {
		console.error('API Error:', error?.response?.status, error?.response?.data);
		return Promise.reject(error);
	}
);

export const getData = async <T>(url: string): Promise<T> => {
	try {
		const response: AxiosResponse<T> = await api.get(url);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const postData = async <T, U>(url: string, data: U): Promise<T> => {
	try {
		// No need to manually add the CSRF token — it's handled by the interceptor
		const response: AxiosResponse<T> = await api.post(url, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};



// Remove the useEffect from here - it doesn't belong in a utility file
export const getCsrfToken = async (): Promise<void> => {
    try {
        await api.get('api/get-csrf-token');
    } catch (error) {
        console.error(error);
    }
};



export const postFormData = async <T>(url: string, formData: FormData): Promise<T> => {
	try {
		const response: AxiosResponse<T> = await api.post(url, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};