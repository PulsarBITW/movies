/**@returns {string | null} `null` if an error occurs during serialization.*/
export const safeSerializeJson = <T>(value: T): string | null => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const safeDeserializeJson = <T>(json: string, defaultValue: T): unknown | T => {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};
