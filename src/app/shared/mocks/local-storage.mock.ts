import { LocalStorage } from "../entities/local-storage.model";

export default function localStorageMock() {
    let localStorage: LocalStorage = {};

    return {
        setItem: (key: string, value: string) => {
            localStorage[key] = value;
        },
        getItem: (key: string) => {
            return key in localStorage ? localStorage[key] : null;
        },
        /**
         * NOT IMPLEMENTED BECAUSE NOT BEEN USED
         */
        removeItem: () => {},
        clear: () => {},
        key: () => '',
        length: 0,
    }
}
