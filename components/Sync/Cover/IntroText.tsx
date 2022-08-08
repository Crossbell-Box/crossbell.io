import { Title } from "@mantine/core";

export const IntroText = () => (
  <div className={"text-center pt-40 pb-12 relative"}>
    <Title order={2} className={"font-bold text-size-[3rem] text-[#2768E3]"}>
      Don&apos;t just post for Twitter <br/>
      Post for yourself
    </Title>
    <span className={"text-lg text-[#082135] block"}>
			OperatorSync is a function that helps you sync all your web2 social media
			onto the Crossbell chain that belongs to Y
			<span className={"text-red"}>♥</span>
			U.
		</span>
  </div>
);
