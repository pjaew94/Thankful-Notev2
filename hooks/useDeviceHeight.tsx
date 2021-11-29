import { useEffect, useState } from "react";



const useDeviceHeight = () => {
    const [deviceHeight, setDeviceHeight] = useState("0");

    useEffect(() => {
        setDeviceHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0).toString())
    }, [])

    return "min-h-[" + deviceHeight + "px]"
}

export default useDeviceHeight