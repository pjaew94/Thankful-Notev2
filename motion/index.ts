export const fadeUpVariant = {
    initial: {
        y: 20,
        opacity: 0,
    
    },
    animate: (custom?: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 1,
            bounce: 0,
            delay: custom
        }
    })
}

export const fadeUpQuickVariant = {
    initial: {
        y: 20,
        opacity: 0,
    
    },
    animate: (custom?: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.5,
            bounce: 0,
            delay: custom
        }
    })
}
