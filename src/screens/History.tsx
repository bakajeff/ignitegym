import { useState } from "react";
import { Heading, VStack, SectionList } from "native-base";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";

export function History() {
	const [exercises, setExercises] = useState([
		{
			tittle: "26.08.22",
			data: ["Puxada frontal", "Remada unilateral"],
		},
		{
			tittle: "27.08.22",
			data: ["Puxada frontal"],
		},
	]);
	return (
		<VStack>
			<ScreenHeader title="histórico de exercícios" />

			<SectionList
				sections={exercises}
				keyExtractor={(item) => item}
				renderItem={({ item }) => <HistoryCard />}
				renderSectionHeader={({ section }) => (
					<Heading color="gray.200" fontSize="md" mt="10" mb={3}>
						{section.tittle}
					</Heading>
				)}
				px={8}
			/>
		</VStack>
	);
}
