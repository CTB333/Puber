import AsyncStorage from "@react-native-async-storage/async-storage";

const useRememberUser = () => {
  const store = (userId: number) => {
    (async () => {
      try {
        await AsyncStorage.setItem(`userId`, `${userId}`);
      } catch (e: any) {
        console.log(`Error Remembering User`);
      }
    })();
  };

  const clear = () => {
    (async () => {
      await AsyncStorage.clear();
    })();
  };

  const getStore = async () => {
    let str = await AsyncStorage.getItem(`userId`);
    if (!str) return null;
    return parseInt(str);
  };

  return { store, getStore, clear };
};

export default useRememberUser;
