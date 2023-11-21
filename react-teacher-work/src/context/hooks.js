import { useState } from "react";
const useValue = () => {
    const [value, setValue] = useState(1);
    return {
        value,
        setValue,
    };
};
export { useValue };