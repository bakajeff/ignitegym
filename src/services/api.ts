import axios from "axios";
import Constants from "expo-constants";

import { AppError } from "@utils/AppError";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

const api = axios.create({
	baseURL: apiUrl,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.data) {
			return Promise.reject(new AppError(error.response.data.message));
		} else {
			return Promise.reject(error);
		}
	},
);

export { api };
