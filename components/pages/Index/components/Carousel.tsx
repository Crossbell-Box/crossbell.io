import { Carousel as Carousel_, Embla } from "@mantine/carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import {
	PropsWithChildren,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

export default function Carousel({
	children,
	index,
	onIndexChange,
}: PropsWithChildren<{
	index: number;
	onIndexChange?: (index: number) => void;
}>) {
	const wheelGesturesPlugin = useRef(WheelGesturesPlugin());

	const [embla, setEmbla] = useState<Embla | null>(null);

	const handleScroll = useCallback(() => {
		if (embla) {
			onIndexChange?.(embla.selectedScrollSnap());
		}
	}, [embla, onIndexChange]);

	const preventEdgeScrolling = () => {
		if (embla) {
			const { limit, target, location, scrollTo } = embla.internalEngine();

			if (limit.reachedMax(target.get())) {
				if (limit.reachedMax(location.get())) location.set(limit.max);
				target.set(limit.max);
				scrollTo.distance(0, false);
			}
			if (limit.reachedMin(target.get())) {
				if (limit.reachedMin(location.get())) location.set(limit.min);
				target.set(limit.min);
				scrollTo.distance(0, false);
			}
		}
	};

	useEffect(() => {
		if (embla) {
			embla.on("select", handleScroll);
			embla.on("scroll", preventEdgeScrolling);
			handleScroll();
		}
	}, [embla]);

	useEffect(() => {
		if (embla) {
			embla.scrollTo(index);
		}
	}, [index]);

	return (
		<Carousel_
			plugins={[wheelGesturesPlugin.current]}
			height="100vh"
			slideSize="100%"
			className="h-screen w-screen"
			orientation="vertical"
			getEmblaApi={setEmbla}
			onScroll={handleScroll}
			speed={20}
			skipSnaps={false}
			withControls={false}
		>
			{children}
		</Carousel_>
	);
}
