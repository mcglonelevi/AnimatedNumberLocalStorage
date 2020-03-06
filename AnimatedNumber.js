import { Animated, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";

function useAnimatedNumber(initialValue, to) {
  const [displayValue, setDisplayValue] = useState(initialValue);
  const animationValue = useRef(new Animated.Value(initialValue));

  useEffect(() => {
    animationValue.current.addListener(({ value }) =>
      setDisplayValue(parseInt(value))
    );
  }, [animationValue.current, setDisplayValue]);

  useEffect(() => {
    if (initialValue != to) {
      Animated.timing(animationValue.current, {
        toValue: to,
        duration: 2000
      }).start();
    }
  }, [animationValue.current, to, initialValue]);

  return displayValue;
}

export default function AnimatedNumber({ initialValue, to }) {
  const displayValue = useAnimatedNumber(initialValue, to);
  return <Text>{displayValue}</Text>;
}
