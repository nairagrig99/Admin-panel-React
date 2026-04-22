import {useEffect, useState} from "react";

export default function useWindowSize() {
    const [isWindowSize, setWindowSize] = useState<boolean>(window.innerWidth <= 900)

    useEffect(() => {
        const windowResize = () => {
            setWindowSize(window.innerWidth <= 900)
        }

        window.addEventListener('resize', windowResize)

        return () => window.removeEventListener('resize', windowResize)
    }, []);

    return {width: isWindowSize};
}