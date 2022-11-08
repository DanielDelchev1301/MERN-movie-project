import { useState } from "react";

export function useLocalStorage(key, defaultValue) {
    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem(key);

        return storedData ? JSON.parse(storedData) : defaultValue;
    });

    function setLocalStorageValue(userData) {
        localStorage.setItem(key, JSON.stringify(userData));

        setData(userData);
    }

    return [
        data,
        setLocalStorageValue
    ];
}