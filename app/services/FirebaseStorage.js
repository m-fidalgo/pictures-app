import firebase from "firebase";
import CameraRoll from "@react-native-community/cameraroll";
import ImagePicker from "react-native-image-picker";
import fs from "react-native-fs";

const firebaseConfig = {
  apiKey: "AIzaSyAbM5DoEKAKsTSftGPkIFZMcVKtiq0Gz5c",
  authDomain: "pictures-app-f86cb.firebaseapp.com",
  projectId: "pictures-app-f86cb",
  storageBucket: "pictures-app-f86cb.appspot.com",
  messagingSenderId: "1076457625595",
  appId: "1:1076457625595:web:0f19e598b080d752d7dd5e",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const storageRef = storage.ref("/");

export const FirebaseStorage = {
  async listAll(currentStorageRef = storageRef) {
    const result = await currentStorageRef.listAll();
    const directoryList = result.prefixes;
    const imgUrlList = await Promise.all(
      result.items.map((item) => item.getDownloadURL())
    );
    const imgList = result.items.map((item, index) =>
      Object.assign(item, { uri: imgUrlList[index] })
    );

    return { imgList, directoryList, currentDirectory: currentStorageRef };
  },
  async uploadImg(currentStorageRef = storageRef) {
    return new Promise((resolve, reject) => {
      ImagePicker.showImagePicker(
        {
          title: "Select a picture",
        },
        async (response) => {
          if (response.uri) {
            const blob = await (await fetch("file://" + response.path)).blob();
            currentStorageRef
              .child(response.fileName)
              .put(blob, { contentType: response.type });
            resolve(currentStorageRef);
          } else {
            reject();
          }
        }
      );
    });
  },
  async downloadImg(imgRef) {
    const fileName = `${fs.DocumentDirectoryPath}/${imgRef.name}`;
    const result = fs.downloadFile({
      fromUrl: imgRef.uri,
      toFile: fileName,
    });

    await result.promise;
    await CameraRoll.save(`file://${fileName}`);

    return fileName;
  },
  async removeImg(imgRef) {
    return imgRef.delete();
  },
};
