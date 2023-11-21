import { useState } from "react";
const useClickNumber = () => {
    const [clickNumber, setClickNumber] = useState({});
    return {
        clickNumber,
        setClickNumber,
    };
};
export { useClickNumber };