"use client";
import animationData from "@/assets/LottieSpinner.json";
import { useLottie } from "lottie-react";

const LottieSpinner = () => {
  const options = {
    animationData: animationData,
    loop: true,
    style: { width: 224, height: 224 },
  };
  const { View } = useLottie(options);
  return (
    <div className="flex justify-center items-center h-full drop-shadow-lg bg-gradient-to-b from-amber-50 to-orange-100 rounded-full">
      {View}
    </div>
  );
};

export default LottieSpinner;
