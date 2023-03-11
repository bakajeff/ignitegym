import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "@components/UserPhoto";
import {
	Center,
	ScrollView,
	VStack,
	Skeleton,
	Text,
	Heading,
	useToast,
} from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";

import { Controller, useForm } from "react-hook-form";

import { useAuth } from "@hooks/useAuth";

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";

const PHOTO_SIZE = 33;

const profileSchema = yup.object({
	name: yup.string().required("Informe o nome."),
});

type FormDataProps = {
	name: string;
	email: string;
	password: string;
	old_password: string;
	confirm_password: string;
};

export function Profile() {
	const [photoIsLoading, setPhotoIsLoading] = useState(false);
	const [userPhoto, setUserPhoto] = useState("https://github.com/bakajeff.png");

	const toast = useToast();
	const { user } = useAuth();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>({
		defaultValues: {
			name: user.name,
			email: user.email,
		},
		resolver: yupResolver(profileSchema),
	});

	async function handleUserPhotoSelect() {
		setPhotoIsLoading(true);

		try {
			const photoSelected = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
				aspect: [4, 4],
				allowsEditing: true,
			});

			if (photoSelected.canceled) {
				return;
			}

			const photoUri = photoSelected.assets[0].uri;

			if (photoUri) {
				const photoInfo = await FileSystem.getInfoAsync(photoUri);

				if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
					return toast.show({
						title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
						placement: "top",
						bgColor: "red.500",
					});
				}

				setUserPhoto(photoUri);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setPhotoIsLoading(false);
		}
	}

	async function handleProfileUpdate(data: FormDataProps) {
		console.log(data);
	}

	return (
		<VStack flex={1}>
			<ScreenHeader title="Perfil" />

			<ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
				<Center mt={6} px={10}>
					{photoIsLoading ? (
						<Skeleton
							w={PHOTO_SIZE}
							h={PHOTO_SIZE}
							rounded="full"
							startColor="gray.500"
							endColor="gray.400"
						/>
					) : (
						<UserPhoto source={{ uri: userPhoto }} size={PHOTO_SIZE} alt="" />
					)}
					<TouchableOpacity onPress={handleUserPhotoSelect}>
						<Text
							color="green.500"
							fontWeight="bold"
							fontSize="md"
							mt={2}
							mb={8}
						>
							Alterar foto
						</Text>
					</TouchableOpacity>

					<Controller
						control={control}
						name="name"
						render={({ field: { value, onChange } }) => (
							<Input
								onChangeText={onChange}
								value={value}
								placeholder="Nome"
								bg="gray.600"
								errorMessage={errors.name?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="email"
						render={({ field: { value, onChange } }) => (
							<Input
								onChangeText={onChange}
								value={value}
								placeholder="E-mail"
								bg="gray.600"
								isDisabled
							/>
						)}
					/>

					<Heading
						color="gray.200"
						alignSelf="flex-start"
						fontSize="md"
						mb={2}
						mt={12}
						fontFamily="heading"
					>
						Alterar senha
					</Heading>

					<Controller
						control={control}
						name="old_password"
						render={({ field: { onChange } }) => (
							<Input
								bg="gray.600"
								onChangeText={onChange}
								placeholder="Senha antiga"
								secureTextEntry
							/>
						)}
					/>

					<Controller
						control={control}
						name="password"
						render={({ field: { onChange } }) => (
							<Input
								bg="gray.600"
								onChangeText={onChange}
								placeholder="Nova senha"
								secureTextEntry
								errorMessage={errors.password?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="password"
						render={({ field: { onChange } }) => (
							<Input
								bg="gray.600"
								onChangeText={onChange}
								errorMessage={errors.confirm_password?.message}
								placeholder="Confirmar nova senha"
								secureTextEntry
							/>
						)}
					/>

					<Button
						title="Atualizar"
						onPress={handleSubmit(handleProfileUpdate)}
						mt={4}
					/>
				</Center>
			</ScrollView>
		</VStack>
	);
}
