type Setter<S> = (state: Partial<S>) => void;
type Getter<S> = () => S;
export type SliceFn<S> = (set: Setter<S>, get: Getter<S>) => S;
