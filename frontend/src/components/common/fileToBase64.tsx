const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result?.toString() || "";
      resolve(base64String);
    };
    reader.readAsDataURL(file);
  });
};

export default fileToBase64;
