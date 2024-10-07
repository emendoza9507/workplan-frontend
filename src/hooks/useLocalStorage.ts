import { useState } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T) ) {
    const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
        try {
            const value = localStorage.getItem(key)

            if(value) {
                return JSON.parse(value)
            } else {
                localStorage.setItem(key, JSON.stringify(defaultValue))
                return defaultValue
            }
        } catch {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue
        }
    });

    function setLocalStorageStateValue(valueOrFn: T | ((v: T) => T)) {
        let newValue = valueOrFn as T;
        if(typeof valueOrFn === 'function') {
            const fn = valueOrFn as Function
            newValue = fn(localStorageValue);
        } 

        localStorage.setItem(key, JSON.stringify(newValue))
        setLocalStorageValue(newValue);
    }

    return [localStorageValue, setLocalStorageStateValue] as const;
}