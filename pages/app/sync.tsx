import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import { Button } from "@mantine/core";

const SNSIcons = () => (
  <div className={"absolute w-full h-full overflow-hidden"}>
    <img src={"/logos/twitter.png"} alt={"Twitter Icon"} className={"absolute left-0 top-0"} style={{
      width: "250.7px",
      height: "250.7px",
      left: "-80px",
      top: "-26px",
      transform: "rotate(15deg)",
    }}/>
    <img src={"/logos/instagram.png"} alt={"Instagram Icon"} className={"absolute right-0 top-0"} style={{
      width: "128px",
      height: "128px",
      right: "-20px",
      top: "65px",
      transform: "matrix(-0.97, 0.26, 0.26, 0.97, 0, 0)",
    }} />
    <img src={"/logos/youtube.png"} alt={"Youtube Icon"} className={"absolute left-0 bottom-0"} style={{
      width: "95.95px",
      height: "95.95px",
      left: "-12px",
      bottom: "-8px",
      transform: "rotate(-30deg)",
    }} />
    <img src={"/logos/tiktok.png"} alt={"Tiktok Icon"} className={"absolute right-0 bottom-0"} style={{
      width: "168.28px",
      height: "168.28px",
      right: "-30px",
      bottom: "-16px",
      transform: "matrix(-0.93, -0.36, -0.36, 0.93, 0, 0)",
    }} />
  </div>
);

const OperatorSyncPending = () => (
  <div className={"text-center pt-40 pb-12 relative"}>
    <h2 className={"font-bold text-size-[3rem] text-[#2768E3]"} style={{
      fontFamily: 'Lexend Deca',
    }}>
      Don't just post for Twitter <br />
      Post for yourself
    </h2>
    <span className={"text-lg text-[#082135] block"} style={{
      fontFamily: "Roboto",
    }}>
      OperatorSync is a function that
      helps you sync all your web2 social media onto the Crossbell chain
      that belongs to Y
      <span className={"text-red"}>♥</span>
      U.
    </span>
    <div className={"block mt-8"}>
      <Button color={"dark"} size={"md"}>
        <span className={"text-lg font-medium"} style={{
          fontFamily: "Roboto",
        }}>
          To be continued
        </span>
      </Button>
    </div>
  </div>
);

const Page: NextPageWithLayout = () => {
  return <div>
    <h1 className={"ml-8 mt-4 mb-0 mr-0 font-semibold text-size-4xl"} style={{
      fontFamily: 'Lexend Deca',
    }}>
      Sync
    </h1>
    <div className={"relative"}>
      <SNSIcons />
      <OperatorSyncPending />
    </div>
  </div>;
};

Page.getLayout = getLayout;

export default Page;
