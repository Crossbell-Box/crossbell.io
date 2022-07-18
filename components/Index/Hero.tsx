import {Button, Title} from "@mantine/core";

const SNSIcons = () => (
  <div className={"absolute w-full h-full overflow-hidden"}>
    <img
      src={"/logos/twitter.png"}
      alt={"Twitter Icon"}
      className={"absolute left-0 top-0"}
      style={{
        width: "413.65px",
        height: "413.65px",
        left: "80px",
        top: "126px",
        transform: "rotate(15deg)",
      }}
    />
    <img
      src={"/logos/instagram.png"}
      alt={"Instagram Icon"}
      className={"absolute right-0 top-0"}
      style={{
        width: "211.2px",
        height: "211.2px",
        right: "180px",
        top: "165px",
        transform: "matrix(-0.97, 0.26, 0.26, 0.97, 0, 0)",
      }}
    />
    <img
      src={"/logos/youtube.png"}
      alt={"Youtube Icon"}
      className={"absolute left-0 bottom-0"}
      style={{
        width: "158.32px",
        height: "158.32px",
        left: "180px",
        bottom: "118px",
        transform: "rotate(-30deg)",
      }}
    />
    <img
      src={"/logos/tiktok.png"}
      alt={"Tiktok Icon"}
      className={"absolute right-0 bottom-0"}
      style={{
        width: "226.47px",
        height: "226.47px",
        right: "120px",
        bottom: "116px",
        transform: "matrix(-0.93, -0.36, -0.36, 0.93, 0, 0)",
      }}
    />
  </div>
);

const HeroTexts = () => (
  <div className={"text-center relative flex flex-col justify-center"}>
    <Title order={2} className={"font-bold text-size-[3rem] md:text-size-[4rem] xl:text-size-[6rem]"}>
      Own your <span className={"text-[#2768E3]"}>profiles!</span>
    </Title>
    <span className={"text-lg text-[#082135] block mt-12"}>
			Crossbell is a platform for owning your social activities, <br />
      composed of an EVM-compatible blockchain and a set of smart contracts.
		</span>
    <div className={"block mt-8"}>
      <Button color={"#FFDA48"} size={"xl"}>
        <span className={"text-lg text-black font-lg mx-11"}>Explore</span>
      </Button>
    </div>
  </div>
);

const IndexHero = () => (
  <div className={"relative h-100vh flex flex-col justify-center"}>
    <SNSIcons />
    <HeroTexts />
    <i className={"i-csb:dropdown flex self-center absolute bottom-0 w-14 h-8"} />
  </div>
)

export default IndexHero;
