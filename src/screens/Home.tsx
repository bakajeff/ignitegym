import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { HStack, VStack } from "native-base";
import { useState } from "react";

export function Home() {
	const [groupSelected, setGroupSelected] = useState("costa");

	return (
		<VStack>
			<HomeHeader />
			<HStack>
				<Group
					name="costa"
					isActive={groupSelected === "costa"}
					onPress={() => setGroupSelected("costa")}
				/>
				<Group
					name="ombro"
					isActive={groupSelected === "ombro"}
					onPress={() => setGroupSelected("ombro")}
				/>
			</HStack>
		</VStack>
	);
}