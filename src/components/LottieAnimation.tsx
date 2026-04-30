"use client";

import Lottie from "lottie-react";

interface LottieAnimationProps {
  animationData: object;
  className?: string;
  loop?: boolean;
}

export default function LottieAnimation({ animationData, className = "", loop = true }: LottieAnimationProps) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      className={className}
    />
  );
}
