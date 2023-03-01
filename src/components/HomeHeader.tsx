import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Heading, HStack, Text, VStack, Icon } from "native-base";

import { useAuth } from "@hooks/useAuth";

import { UserPhoto } from "./UserPhoto";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

export function HomeHeader() {
	const { user } = useAuth();

	return (
		<HStack
			backgroundColor="gray.600"
			pt={16}
			pb="5"
			px={8}
			alignItems="center"
		>
			<UserPhoto
				source={
					user.avatar
						? { uri: "https://github.com/bakajeff.png" }
						: defaultUserPhotoImg
				}
				size={16}
				alt=""
				mr={4}
			/>

			<VStack flex={1}>
				<Text color="gray.100" fontSize="md">
					Olá,
				</Text>

				<Heading color="gray.100" fontSize="md" fontFamily="heading">
					{user.name}
				</Heading>
			</VStack>

			<TouchableOpacity>
				<Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
			</TouchableOpacity>
		</HStack>
	);
}
