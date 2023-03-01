import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode, useState } from "react";

import { storageUserSave } from "@storage/storageUser";

import { api } from "@services/api";

export type AuthContextDataProps = {
	user: UserDTO;
	signIn: (email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps,
);

type AuthContextProviderProps = {
	children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<UserDTO>({} as UserDTO);

	async function signIn(email: string, password: string) {
		try {
			const { data } = await api.post("/sessions", { email, password });

			if (data.user) {
				setUser(data.user);
				storageUserSave(data.user);
			}
		} catch (error) {
			throw error;
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				signIn,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
