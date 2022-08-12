import { useWindowScroll } from "@mantine/hooks";
import { Affix, Button, Text, Transition } from "@mantine/core";
import { useRouter } from "next/router";

export default function ScrollToTop() {
	const [scroll, scrollTo] = useWindowScroll();

	const router = useRouter();

	return (
		<Affix position={{ bottom: 20, right: 20 }}>
			<Transition transition="slide-up" mounted={scroll.y > 2000}>
				{(transitionStyles) => (
					<Button
						leftIcon={<Text>↑</Text>}
						style={transitionStyles}
						onClick={() => scrollTo({ y: 0 })}
					>
						Scroll to top
					</Button>
				)}
			</Transition>
		</Affix>
	);
}
