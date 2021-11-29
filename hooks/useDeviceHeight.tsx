import { useEffect, useState } from "react";
import { Size, useWindowSize } from "./useWindowSize";



const useDeviceHeight = () => {
    const [deviceHeight, setDeviceHeight] = useState(0);
    const size: Size = useWindowSize();

    useEffect(() => {

        setDeviceHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0))
        console.log(window.innerHeight);
    }, [size])

    return deviceHeight
}

export default useDeviceHeight