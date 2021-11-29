


const checkToday = async(date: string) => {
    const now = new Date().toISOString();
    const tomorrow = new Date();

    const deviceHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    console.log(deviceHeight)
    return typeof deviceHeight
}


export const helperFunc = {
    checkToday
}