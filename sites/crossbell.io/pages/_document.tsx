// https://mantine.dev/theming/next/
import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from "next/document";
import { ServerStyles, createStylesServer } from "@mantine/next";
import { emotionCache } from "@/components/providers/ThemeProvider";

const stylesServer = createStylesServer(emotionCache);

export default class _Document extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		// https://github.com/mui/material-ui/blob/master/examples/nextjs-with-typescript/pages/_document.tsx

		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: (App: any) =>
					function EnhanceApp(props) {
						return <App emotionCache={emotionCache} {...props} />;
					},
			});

		const initialProps = await Document.getInitialProps(ctx);
		// This is important. It prevents Emotion to render invalid HTML.
		// See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
		const emotionStyles = stylesServer.extractCriticalToChunks(
			initialProps.html
		);
		const emotionStyleTags = emotionStyles.styles.map((style) => (
			<style
				data-emotion={`${style.key} ${style.ids.join(" ")}`}
				key={style.key}
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{ __html: style.css }}
			/>
		));

		return {
			...initialProps,
			emotionStyleTags,
		};
	}

	render() {
		return (
			<Html>
				<Head>
					{/* https://nextjs.org/docs/messages/google-font-display */}
					<link rel="preconnect" href="https://fonts.bunny.net" />
					<link
						href="https://fonts.bunny.net/css?family=lexend-deca:100,200,300,400,500,600,700,800,900|roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
						rel="stylesheet"
					/>
					<meta name="emotion-insertion-point" content="" />
					{(this.props as any).emotionStyleTags}
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
