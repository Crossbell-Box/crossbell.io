import React from "react";
import confetti from "canvas-confetti";

import { Congrats } from "../components/congrats";
import { useModalStore } from "../stores";
import { useAccountCharacter } from "../../../hooks";
import { composeCharacterHref } from "~/shared/url/href";

export function InputEmailToRegister4() {
	const { hide: hideModal } = useModalStore();
	const character = useAccountCharacter();

	React.useEffect(showConfetti, []);

	return (
		<Congrats
			title="Congrats!"
			desc="Now you can return into the feed and enjoy Crossbell."
			tips="Welcome to new Crossbell"
			timeout="15s"
			btnText={character ? "Check Character" : "Close"}
			onClose={hideModal}
			onClickBtn={() => {
				if (character) {
					window.open(composeCharacterHref(character.handle), "_blank");
				}
				hideModal();
			}}
		/>
	);
}

function showConfetti() {
	const end = Date.now() + 100;
	const config: confetti.Options = {
		particleCount: 25,
		startVelocity: 90,
		angle: 60,
		spread: 60,
		origin: { x: 0, y: 1 },
		zIndex: 300,
		gravity: 1.5,
		colors: ["#6AD991", "#F6C549", "#E65040", "#5B89F7", "#9688F2"],
	};

	(function frame() {
		confetti({
			...config,
			angle: 60,
			origin: { x: 0, y: 1 },
		});

		confetti({
			...config,
			angle: 120,
			origin: { x: 1, y: 1 },
		});

		if (Date.now() < end) {
			requestAnimationFrame(frame);
		}
	})();
}
