import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode, useEffect, useState } from "react";

import {
	storageUserGet,
	storageUserRemove,
	storageUserSave,
} from "@storage/storageUser";

import {
	storageAuthTokenGet,
	storageAuthTokenSave,
	storageAuthTokenRemove,
} from "@storage/storageAuthToken";

import { api } from "@services/api";

export type AuthContextDataProps = {
	user: UserDTO;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	isLoadingUserStorageData: boolean;
};

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps,
);

type AuthContextProviderProps = {
	children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<UserDTO>({} as UserDTO);
	const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
		useState(true);

	async function userAndTokenUpdate(userData: UserDTO, token: string) {
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

		setUser(userData);
	}

	async function storageUserAndTokenSave(userData: UserDTO, token: string) {
		try {
			setIsLoadingUserStorageData(true);

			await storageUserSave(userData);
			await storageAuthTokenSave(token);
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function signIn(email: string, password: string) {
		try {
			const { data } = await api.post("/sessions", { email, password });

			if (data.user && data.token) {
				setIsLoadingUserStorageData(true);

				await storageUserAndTokenSave(data.user, data.token);

				await userAndTokenUpdate(data.user, data.token);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function signOut() {
		try {
			setIsLoadingUserStorageData(true);
			setUser({} as UserDTO);

			await storageUserRemove();
			await storageAuthTokenRemove();
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function loadUserData() {
		try {
			setIsLoadingUserStorageData(true);

			const userLogged = await storageUserGet();
			const token = await storageAuthTokenGet();

			if (token && userLogged) {
				await userAndTokenUpdate(userLogged, token);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	useEffect(() => {
		loadUserData();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				signIn,
				signOut,
				isLoadingUserStorageData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
