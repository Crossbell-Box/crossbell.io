import { PropsWithChildren } from "react";
import { Title, Button } from "@mantine/core";
import Link from "next/link";

interface TrendingBaseProps extends PropsWithChildren {
  title: string;
  intro: string;
  viewMoreLink: string;
}

const TrendingBase = ({ title, intro, viewMoreLink, children }: TrendingBaseProps) => (
  <div className={"flex flex-col items-center text-center my-24"}>
    <div className={"flex flex-col"}>
      <Title order={2} className={"text-size-[3rem] font-semibold"}>
        {title}
      </Title>
      <span className={"mt-6"}>
        {intro}
      </span>
    </div>
    <div className={"mt-18 mb-12 w-full"}>
      {children}
    </div>
    <div>
      <Link href={viewMoreLink}>
        <Button color={"dark"}>
          View More
        </Button>
      </Link>
    </div>
  </div>
);

export default TrendingBase;
