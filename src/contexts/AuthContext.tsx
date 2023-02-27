import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode } from "react";

export type AuthContextDataProps = {
	user: UserDTO;
};

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps,
);

type AuthContextProviderProps = {
	children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	return (
		<AuthContext.Provider
			value={{
				user: {
					id: "1",
					name: "Jeffte",
					email: "jeffte@mail.com",
					avatar: "jeffte.png",
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
