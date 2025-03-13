// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateNestedState = (state: any, path: string, value: any) => {
    const keys = path.split(".");
    const lastKey = keys.pop();
    if (!lastKey) return state;
    const newState = { ...state };
    let current = newState;
    for (const key of keys) {
      current[key] = { ...current[key] };
      current = current[key];
    }
    current[lastKey] = value;
    return newState;
  };
  