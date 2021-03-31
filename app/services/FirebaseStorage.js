import firebase from "firebase";

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
};
