interface IBlobToBase {
  blob: Blob;
}

export const blobToBase64 = ({ blob }: IBlobToBase) => {
  type IFileReaderRes = string | ArrayBuffer | null;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const res: IFileReaderRes = reader.result;
      resolve(`${res}`);
    };
    reader.readAsDataURL(blob);
  });
};
