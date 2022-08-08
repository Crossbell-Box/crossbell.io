import { SNSIcons } from "@/components/Sync/Cover/SNSIcons";
import { IntroText } from "@/components/Sync/Cover/IntroText";
import { ActivateButton } from "@/components/Sync/Cover/ActivateButton";

const OperatorSyncCover = () => (
  <div>
    <div className={"relative"}>
      <SNSIcons/>
      <IntroText/>
    </div>
    <div className={"mt-32"}>
      <ActivateButton/>
    </div>
  </div>
);

export default OperatorSyncCover;
