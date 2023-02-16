import axios from "axios";
import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

console.log(apiUrl);

export const api = axios.create({
	baseURL: apiUrl,
});
