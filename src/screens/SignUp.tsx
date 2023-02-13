import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
	const navigation = useNavigation();

	const { control, handleSubmit } = useForm();

	function handleGoBack() {
		navigation.goBack();
	}

	function handleSignUp(data: any) {
		console.log(data);
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			showsVerticalScrollIndicator={false}
		>
			<VStack flex={1} px={10} pb={16}>
				<Image
					source={BackgroundImg}
					defaultSource={BackgroundImg}
					alt="Pessoas treinando"
					resizeMode="contain"
					position="absolute"
				/>
				<Center my={24}>
					<LogoSvg />
					<Text color="gray.100" fontSize="sm">
						Treine sua mente e seu corpo
					</Text>
				</Center>
				<Center>
					<Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
						Crie sua conta
					</Heading>

					<Controller
						control={control}
						name="name"
						render={({ field: { onChange, value } }) => (
							<Input placeholder="Nome" onChangeText={onChange} value={value} />
						)}
					/>

					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Email"
								keyboardType="email-address"
								autoCapitalize="none"
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>

					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Senha"
								secureTextEntry
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>

					<Controller
						control={control}
						name="passwordConfirm"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Confirmar a senha"
								secureTextEntry
								onChangeText={onChange}
								value={value}
								onSubmitEditing={handleSubmit(handleSignUp)}
								returnKeyType="send"
							/>
						)}
					/>

					<Button
						title="Criar e acessar"
						onPress={handleSubmit(handleSignUp)}
					/>
				</Center>
				<Button
					mt={24}
					title="Voltar para o login"
					variant="outline"
					onPress={handleGoBack}
				/>
			</VStack>
		</ScrollView>
	);
}
