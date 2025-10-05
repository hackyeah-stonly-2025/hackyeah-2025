const inMemoryStorage = new Map<string, any>();

export const setUserSetting = (key: string, value: any) => {
  inMemoryStorage.set(key, value);
};

export const getUserSetting = (key: string) => {
  return inMemoryStorage.get(key);
};
