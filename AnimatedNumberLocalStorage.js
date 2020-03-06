import React, { useState, useEffect } from "react";
import AnimatedNumber from "./AnimatedNumber";
import { AsyncStorage } from "react-native";

function useStorageInitialValue(storageKey, to) {
  const [storageValue, setStorageValue] = useState(null);

  useEffect(() => {
    (async () => {
      const asyncStorageValue = parseInt(
        await AsyncStorage.getItem(storageKey)
      );
      setStorageValue(asyncStorageValue ? asyncStorageValue : 0);
      AsyncStorage.setItem(storageKey, to.toString());
    })();
  }, [storageKey, to]);

  return storageValue;
}

export default function AnimatedNumberLocalStorage({ storageKey, to }) {
  const storageValue = useStorageInitialValue(storageKey, to);

  if (storageValue == null) {
    return null;
  }

  return <AnimatedNumber initialValue={storageValue} to={to} />;
}
