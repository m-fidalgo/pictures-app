import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  RefreshControl,
} from "react-native";
import { FirebaseStorage } from "./services/FirebaseStorage";

import Breadcrumb from "./components/Breadcrumb";
import DirectoryList from "./components/DirectoryList";
import ImageList from "./components/ImageList";
import ImageDialog from "./components/ImageDialog";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [directories, setDirectories] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState({});
  const [imageList, setImageList] = useState([]);
  const [currentImage, setCurrentImage] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    listContent();
  }, []);

  async function listContent(dir) {
    try {
      setIsLoading(true);
      const resp = await FirebaseStorage.listAll(dir);
      setImageList(resp.imgList);
      setDirectories(resp.directoryList);
      setCurrentDirectory(resp.currentDirectory);
      setIsLoading(false);
      return resp;
    } catch (err) {
      console.log("error:", err);
    }
  }

  function onRefresh() {
    listContent(currentDirectory);
  }

  function onSelectImg(img) {
    setIsOpen(true);
    setCurrentImage(img);
  }

  function onCloseDialog() {
    setIsOpen(false);
    setCurrentImage({});
  }

  async function onRemoveImg(img) {
    await FirebaseStorage.removeImg(img);
    onRefresh();
    onCloseDialog();
  }

  async function onAddImg() {
    await FirebaseStorage.uploadImg(currentDirectory);
    onRefresh();
    onCloseDialog();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Breadcrumb onSelect={listContent} currentDirectory={currentDirectory} />
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <DirectoryList onSelect={listContent} directories={directories} />
        <ImageList images={imageList} onSelect={onSelectImg} />
      </ScrollView>
      <Button title="Add" onPress={onAddImg} />
      <ImageDialog
        image={currentImage}
        isOpen={isOpen}
        onClose={onCloseDialog}
        onRemove={onRemoveImg}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5fcff",
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
  },
});
