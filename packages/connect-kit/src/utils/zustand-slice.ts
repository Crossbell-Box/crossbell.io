type Setter<S> = (state: Partial<S>) => void;
type Getter<S> = () => S;

export type SliceFn<S, G = S> = (set: Setter<S>, get: Getter<G>) => S;

export type OmitActions<S> = Pick<
	S,
	{
		[K in keyof S]: S[K] extends (...p: any) => any ? never : K;
	}[keyof S]
>;
