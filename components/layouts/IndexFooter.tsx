const IndexFooter = () => (
  <div className={"flex w-full px-8 bg-[#1A1C1F]"}>
    <div className={"w-full max-w-340 m-auto py-8"}>
      <div className={"text-[#FFDA48] font-bold text-size-[3rem]"}>
        Crossbell protocol
      </div>
      <p className={"text-white text-lg mt-8"}>
        The world’s first and largest digital marketplace for <br />
        crypto collectibles and non-fungible tokens (NFTs). <br />
        Buy, sell, and discover exclusive digital items.
      </p>
      <div className={"flex flex-row text-white gap-8 font-bold text-lg mt-32"}>
        <a>Blog</a>
        <a href={"https://twitter.com/messages/compose?recipient_id=1526291070623023111"} target={"_blank"}>Twitter Help</a>
        <a>Terms of Service</a>
        <a>Privacy Policy</a>
        <a>Feedback</a>
      </div>
    </div>
  </div>
);

export default IndexFooter;
