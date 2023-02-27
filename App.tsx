import { StatusBar } from "react-native";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider } from "native-base";

import { Routes } from "@routes/index";

import { AuthContext } from "@contexts/AuthContext";

import { THEME } from "./src/theme";
import { Loading } from "@components/Loading";

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

	return (
		<NativeBaseProvider theme={THEME}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<AuthContext.Provider
				value={{
					id: "1",
					name: "Jeffte",
					email: "jeffte@mail.com",
					photo: "jeffte.png",
				}}
			>
				{fontsLoaded ? <Routes /> : <Loading />}
			</AuthContext.Provider>
		</NativeBaseProvider>
	);
}
