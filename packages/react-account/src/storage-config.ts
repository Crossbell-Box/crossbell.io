import { createJSONStorage, StateStorage } from "zustand/middleware";

let getStorage = (): StateStorage => localStorage;

export function setupStorage(storage: StateStorage) {
	getStorage = () => storage;
}

export function createStorage<T>() {
	return createJSONStorage<T>(getStorage);
}
