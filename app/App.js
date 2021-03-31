import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Button } from "react-native";

import Breadcrumb from "./components/Breadcrumb";
import DirectoryList from "./components/DirectoryList";
import ImageList from "./components/ImageList";
import ImageDialog from "./components/ImageDialog";

export default function App() {
  const [directories, setDirectories] = useState([{ name: "a" }]);
  const [currentDirectory, setCurrentDirectory] = useState({
    name: "abc",
    parent: {},
  });
  const [imageList, setImageList] = useState([
    {
      uri:
        "https://64.media.tumblr.com/a4879580229187b20d2867306297ffb6/tumblr_oqlqapn66L1u280k8o1_1280.png",
    },
    {
      uri:
        "https://pm1.narvii.com/6482/fef9ad73513c9304925f91ce803a99b0751133d4_hq.jpg",
    },
    {
      uri:
        "https://i.pinimg.com/originals/2a/32/d9/2a32d9c19606ec633b0582fadf187e16.png",
    },
    {
      uri:
        "https://64.media.tumblr.com/a4879580229187b20d2867306297ffb6/tumblr_oqlqapn66L1u280k8o1_1280.png",
    },
    {
      uri:
        "https://pm1.narvii.com/6482/fef9ad73513c9304925f91ce803a99b0751133d4_hq.jpg",
    },
    {
      uri:
        "https://i.pinimg.com/originals/2a/32/d9/2a32d9c19606ec633b0582fadf187e16.png",
    },
  ]);
  const [currentImage, setCurrentImage] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  function onSelectBreadcrumb() {}

  function onSelectDirectory() {}

  function onSelectImg(img) {
    setIsOpen(true);
    setCurrentImage(img);
  }

  function onCloseDialog() {
    setIsOpen(false);
    setCurrentImage({});
  }

  function onRemoveImg() {}

  return (
    <SafeAreaView style={styles.container}>
      <Breadcrumb
        onSelect={onSelectBreadcrumb}
        currentDirectory={currentDirectory}
      />
      <ScrollView style={styles.scrollContainer}>
        <DirectoryList onSelect={onSelectDirectory} directories={directories} />
        <ImageList images={imageList} onSelect={onSelectImg} />
      </ScrollView>
      <Button title="Add" />
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
