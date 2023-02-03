import { useState } from "react";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, FlatList, HStack, Heading, Text } from "native-base";

export function Home() {
	const [groups, setGroups] = useState([
		"costas",
		"biceps",
		"triceps",
		"ombro",
	]);
	const [groupSelected, setGroupSelected] = useState("costa");

	return (
		<VStack>
			<HomeHeader />

			<FlatList
				data={groups}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<Group
						name={item}
						isActive={groupSelected === item}
						onPress={() => setGroupSelected(item)}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				_contentContainerStyle={{ px: 8 }}
				my={10}
				maxH={10}
			/>

			<VStack px={8}>
				<HStack justifyContent="space-between" mb={5}>
					<Heading color="gray.200" fontSize="md">
						Exercicios
					</Heading>
					<Text color="gray.200" fontSize="sm">
						4
					</Text>
				</HStack>
			</VStack>
		</VStack>
	);
}
