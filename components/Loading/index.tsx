import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-full flex justify-center items-center bg-gray-100 bg-opacity-80 z-50">
      <div className="flex">
        <motion.span
          className='gap-1h-2 w-2 rounded-full bg-black'
          animate={{ y: [3, -3], background: ["#111111", "#F7E353"] }}
          transition={{
            repeat: Infinity,
            duration: 0.5,
            repeatType: "reverse",

          }}
        />
        <motion.span
          className='h-2 w-2 rounded-full mx-2 bg-black'
          animate={{ y: [3, -3], background: ["#111111", "#F7E353"] }}
          transition={{
            repeat: Infinity,
            duration: 0.5,
            repeatType: "reverse",
            delay: 0.15,
          }}
        />
        <motion.span
          className='h-2 w-2 rounded-full bg-black'
          animate={{ y: [3, -3], background: ["#111111", "#F7E353"] }}
          transition={{
            repeat: Infinity,
            duration: 0.5,
            repeatType: "reverse",
            delay: 0.3,
          }}
        />
      </div>
    </div>
  );
};

export default Loading;
