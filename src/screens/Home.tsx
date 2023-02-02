import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Center, VStack } from "native-base";

export function Home() {
	return (
		<VStack>
			<HomeHeader />
			<Group name="costas" />
		</VStack>
	);
}
