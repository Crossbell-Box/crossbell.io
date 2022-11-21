export type Setter<S> = (state: Partial<S>) => void;
export type Getter<S> = () => S;
export type SliceFn<S> = (set: Setter<S>, get: Getter<S>) => S;
