import { useState } from "react";
import { Anchor, Button, Checkbox } from "@mantine/core";

export const ActivateButton = () => {
  const [accept, setAccept] = useState(false);

  return (
    <div className={"text-center"}>
      <Checkbox label={
        <>
          Click to confirm to agree to our{' '}
          <Anchor size={"sm"} color={"blue"}>
            set operator agreement
          </Anchor>
        </>
      } checked={accept} onChange={(event) => setAccept(event.currentTarget.checked)} className={"justify-center"}/>
      <div className={"block mt-8"}>
        <Button color={"blue"} size={"md"} disabled={!accept}>
          <span className={"text-lg font-medium"}>Turn sync on</span>
        </Button>
      </div>
    </div>
  )
};
