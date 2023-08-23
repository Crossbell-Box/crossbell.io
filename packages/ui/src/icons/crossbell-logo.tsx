import React from "react";

export const CrossbellLogo = React.forwardRef<
	SVGSVGElement,
	React.SVGAttributes<SVGSVGElement>
>((props, ref) => (
	<svg
		fill="none"
		height="34"
		viewBox="0 0 125 34"
		width="125"
		xmlns="http://www.w3.org/2000/svg"
		ref={ref}
		{...props}
	>
		<linearGradient
			id="crossbell-logo-svg-path"
			gradientUnits="userSpaceOnUse"
			x1="4"
			x2="125"
			y1="21.0001"
			y2="21.0001"
		>
			<stop offset="0" stopColor="#f6c549" />
			<stop offset=".234375" stopColor="#e65040" />
			<stop offset=".505208" stopColor="#9688f2" />
			<stop offset=".760417" stopColor="#5b89f7" />
			<stop offset="1" stopColor="#6ad991" />
		</linearGradient>
		<path
			d="m4 17.75h121"
			stroke="url(#crossbell-logo-svg-path)"
			strokeWidth="4.5"
		/>
		<path
			d="m19.669 23.78c-.9893 1.1947-2.156 2.1093-3.5 2.744-1.344.616-2.8467.924-4.508.924-1.4933 0-2.884-.2707-4.172-.812-1.26933-.5413-2.37067-1.2787-3.304-2.212s-1.67067-2.0347-2.212-3.304c-.54133-1.288-.812-2.6693-.812-4.144s.27067-2.8467.812-4.116c.54133-1.288 1.27867-2.3987 2.212-3.332.93333-.93333 2.03467-1.67067 3.304-2.212 1.288-.54133 2.6787-.812 4.172-.812 1.6053 0 3.0147.28 4.228.84 1.232.56 2.324 1.372 3.276 2.436l-2.66 2.576c-.5973-.6907-1.288-1.2413-2.072-1.652-.7653-.4107-1.68-.616-2.744-.616-.9333 0-1.81067.168-2.632.504-.82133.3173-1.54.7747-2.156 1.372-.59733.5973-1.07333 1.3253-1.428 2.184-.35467.84-.532 1.7827-.532 2.828s.17733 1.9973.532 2.856c.35467.84.83067 1.5587 1.428 2.156.616.5973 1.33467 1.064 2.156 1.4.82133.3173 1.6987.476 2.632.476 1.12 0 2.1093-.224 2.968-.672.8773-.4667 1.652-1.12 2.324-1.96zm2.3131-10.5h3.444v1.904h.224c.168-.336.392-.644.672-.924s.588-.5227.924-.728c.3546-.2053.728-.364 1.12-.476.4106-.112.812-.168 1.204-.168.4853 0 .896.0467 1.232.14.3546.0933.6533.2147.896.364l-.98 3.332c-.224-.112-.476-.196-.756-.252-.2614-.0747-.588-.112-.98-.112-.504 0-.9614.1027-1.372.308-.4107.1867-.7654.4573-1.064.812-.28.3547-.504.7747-.672 1.26-.1494.4667-.224.98-.224 1.54v6.72h-3.668zm17.0507-.448c1.064 0 2.0346.1867 2.912.56.896.3547 1.6613.8587 2.296 1.512.6533.6347 1.1573 1.4 1.5119 2.296.3734.896.5601 1.876.5601 2.94s-.1867 2.044-.5601 2.94c-.3546.896-.8586 1.6707-1.5119 2.324-.6347.6347-1.4 1.1387-2.296 1.512-.8774.3547-1.848.532-2.912.532s-2.044-.1773-2.94-.532c-.8774-.3733-1.6427-.8773-2.296-1.512-.6347-.6533-1.1387-1.428-1.512-2.324-.3547-.896-.532-1.876-.532-2.94s.1773-2.044.532-2.94c.3733-.896.8773-1.6613 1.512-2.296.6533-.6533 1.4186-1.1573 2.296-1.512.896-.3733 1.876-.56 2.94-.56zm0 11.228c.4666 0 .9146-.084 1.344-.252.448-.1867.84-.448 1.176-.784s.5973-.7467.784-1.232c.2053-.4853.308-1.036.308-1.652s-.1027-1.1667-.308-1.652c-.1867-.4853-.448-.896-.784-1.232s-.728-.588-1.176-.756c-.4294-.1867-.8774-.28-1.344-.28-.4854 0-.9427.0933-1.372.28-.4294.168-.812.42-1.148.756s-.6067.7467-.812 1.232c-.1867.4853-.28 1.036-.28 1.652s.0933 1.1667.28 1.652c.2053.4853.476.896.812 1.232s.7186.5973 1.148.784c.4293.168.8866.252 1.372.252zm14.932 3.388c-.896 0-1.6986-.112-2.408-.336-.6906-.224-1.2973-.5133-1.82-.868-.504-.3733-.9333-.7933-1.288-1.26-.3546-.4853-.6253-.9707-.812-1.456l3.276-1.4c.3174.7093.7374 1.2413 1.26 1.596.5414.336 1.1387.504 1.792.504.672 0 1.204-.1213 1.596-.364s.588-.532.588-.868c0-.3733-.168-.672-.504-.896-.3173-.2427-.8773-.4573-1.68-.644l-1.932-.42c-.4293-.0933-.8773-.2427-1.344-.448-.448-.2053-.8586-.4667-1.232-.784-.3733-.3173-.6813-.7-.924-1.148-.2426-.448-.364-.9707-.364-1.568 0-.672.14-1.2693.42-1.792.2987-.5227.7-.9613 1.204-1.316.504-.3733 1.092-.6533 1.764-.84.6907-.2053 1.428-.308 2.212-.308 1.3067 0 2.4734.2613 3.5.784 1.0267.504 1.7827 1.316 2.268 2.436l-3.164 1.288c-.2613-.5413-.644-.9333-1.148-1.176s-1.008-.364-1.512-.364c-.5226 0-.98.112-1.372.336-.392.2053-.588.476-.588.812 0 .3173.1587.5693.476.756.336.1867.784.3547 1.344.504l2.1.504c1.4.336 2.436.8773 3.108 1.624.6907.728 1.036 1.596 1.036 2.604 0 .5973-.14 1.1667-.42 1.708s-.6813 1.0267-1.204 1.456c-.504.4107-1.12.7373-1.848.98-.7093.2427-1.5026.364-2.38.364zm13.5352 0c-.896 0-1.6987-.112-2.408-.336-.6907-.224-1.2973-.5133-1.82-.868-.504-.3733-.9333-.7933-1.288-1.26-.3547-.4853-.6253-.9707-.812-1.456l3.276-1.4c.3173.7093.7373 1.2413 1.26 1.596.5413.336 1.1387.504 1.792.504.672 0 1.204-.1213 1.596-.364s.588-.532.588-.868c0-.3733-.168-.672-.504-.896-.3173-.2427-.8773-.4573-1.68-.644l-1.932-.42c-.4293-.0933-.8773-.2427-1.344-.448-.448-.2053-.8587-.4667-1.232-.784s-.6813-.7-.924-1.148-.364-.9707-.364-1.568c0-.672.14-1.2693.42-1.792.2987-.5227.7-.9613 1.204-1.316.504-.3733 1.092-.6533 1.764-.84.6907-.2053 1.428-.308 2.212-.308 1.3067 0 2.4733.2613 3.5.784 1.0267.504 1.7827 1.316 2.268 2.436l-3.164 1.288c-.2613-.5413-.644-.9333-1.148-1.176s-1.008-.364-1.512-.364c-.5227 0-.98.112-1.372.336-.392.2053-.588.476-.588.812 0 .3173.1587.5693.476.756.336.1867.784.3547 1.344.504l2.1.504c1.4.336 2.436.8773 3.108 1.624.6907.728 1.036 1.596 1.036 2.604 0 .5973-.14 1.1667-.42 1.708s-.6813 1.0267-1.204 1.456c-.504.4107-1.12.7373-1.848.98-.7093.2427-1.5027.364-2.38.364zm8.1032-20.496h3.668v6.02l-.224 1.96h.224c.336-.5787.8586-1.0733 1.568-1.484.7093-.4107 1.5866-.616 2.632-.616.8773 0 1.708.1867 2.492.56.8026.3547 1.5026.8587 2.1 1.512.616.6347 1.1013 1.4 1.456 2.296.3546.896.532 1.876.532 2.94s-.1774 2.044-.532 2.94c-.3547.896-.84 1.6707-1.456 2.324-.5974.6347-1.2974 1.1387-2.1 1.512-.784.3547-1.6147.532-2.492.532-1.0454 0-1.9227-.2053-2.632-.616-.7094-.4107-1.232-.9053-1.568-1.484h-.224v1.652h-3.444zm7.112 17.108c.4853 0 .9426-.0933 1.372-.28.448-.1867.84-.448 1.176-.784s.6066-.7467.812-1.232c.2053-.4853.308-1.0267.308-1.624s-.1027-1.1387-.308-1.624c-.2054-.4853-.476-.896-.812-1.232s-.728-.5973-1.176-.784c-.4294-.1867-.8867-.28-1.372-.28-.4854 0-.952.0933-1.4.28-.4294.168-.812.42-1.148.756s-.6067.7467-.812 1.232c-.2054.4853-.308 1.036-.308 1.652s.1026 1.1667.308 1.652c.2053.4853.476.896.812 1.232s.7186.5973 1.148.784c.448.168.9146.252 1.4.252zm22.6688-.364c-.634 1.12-1.493 2.0253-2.576 2.716-1.064.6907-2.37 1.036-3.9198 1.036-1.0453 0-2.016-.1773-2.912-.532-.8773-.3733-1.6426-.8867-2.296-1.54-.6533-.6533-1.1666-1.4187-1.54-2.296-.3546-.896-.532-1.876-.532-2.94 0-.9893.1774-1.9227.532-2.8.3547-.896.8494-1.6707 1.484-2.324.6347-.672 1.3814-1.204 2.24-1.596.8774-.392 1.8387-.588 2.884-.588 1.1014 0 2.0818.1867 2.9398.56.859.3547 1.578.8587 2.156 1.512.579.6347 1.018 1.3907 1.316 2.268.299.8773.448 1.8293.448 2.856v.336c-.018.112-.028.2147-.028.308-.018.0933-.028.196-.028.308h-10.3318c.0747.56.224 1.0453.448 1.456.2427.392.532.728.868 1.008.3547.2613.7374.4573 1.148.588.4107.112.8307.168 1.26.168.84 0 1.5308-.1867 2.0718-.56.56-.392.999-.8773 1.316-1.456zm-3.332-5.32c-.018-.2427-.102-.5133-.252-.812-.13-.2987-.336-.5787-.616-.84-.261-.2613-.597-.476-1.008-.644-.3918-.168-.8678-.252-1.4278-.252-.784 0-1.4746.224-2.072.672-.5973.448-1.0173 1.0733-1.26 1.876zm5.899 8.624v-20.048h3.668v20.048zm6.808 0v-20.048h3.668v20.048z"
			fill="currentColor"
		/>
	</svg>
));