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
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&family=Roboto:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
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
