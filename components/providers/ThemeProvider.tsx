import { MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <MantineProvider
      // withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
        fontFamily: "Roboto",
        fontFamilyMonospace: "Monaco, Courier, monospace",
        headings: { fontFamily: "Roboto" },
        colors: {
          brand: [
            "#FFF9E9",
            "#FFF0CA",
            "#FFE9B0",
            "#FFE093",
            "#FFD773",
            "#FFCF55", // <-
            "#E2B542",
            "#C09526",
            "#A67E18",
            "#7C5D0C",
          ],
          ["csb-blue"]: [
            "#5B89F7",
            "#5B89F7",
            "#5B89F7",
            "#5B89F7",
            "#5B89F7",
            "#5B89F7", // <-
            "#5B89F7",
            "#5B89F7",
            "#5B89F7",
            "#5B89F7",
          ],
          ["csb-red"]: [
            "#EB5F5F",
            "#EB5F5F",
            "#EB5F5F",
            "#EB5F5F",
            "#EB5F5F",
            "#EB5F5F", // <-
            "#EB5F5F",
            "#EB5F5F",
            "#EB5F5F",
            "#EB5F5F",
          ],
          ["csb-yellow"]: [
            "#46CEAF",
            "#46CEAF",
            "#46CEAF",
            "#46CEAF",
            "#46CEAF",
            "#46CEAF", // <-
            "#46CEAF",
            "#46CEAF",
            "#46CEAF",
            "#46CEAF",
          ],
        },
        primaryColor: "brand",
        primaryShade: 5,
      }}
    >
      {children}
    </MantineProvider>
  );
}

export function usePrimaryShade() {
  return 5;
}
