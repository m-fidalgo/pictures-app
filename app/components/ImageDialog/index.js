import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Dialog from "react-native-dialog";
import { FirebaseStorage } from "../../services/FirebaseStorage";

export default function ImageDialog(props) {
  async function download() {
    await FirebaseStorage.downloadImg(props.image);
  }

  function cutTitle(title) {
    const limit = 30;
    if (title.length > limit) {
      title = title.substring(0, limit) + "...";
    }

    return title;
  }

  return (
    <View>
      <Dialog.Container visible={props.isOpen}>
        <Dialog.Title>{cutTitle(props.image.name || "")}</Dialog.Title>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: props.image.uri }} />
        </View>
        <Dialog.Button label="Close" onPress={props.onClose} />
        <Dialog.Button
          label="Delete"
          onPress={() => props.onRemove(props.image)}
        />
        <Dialog.Button label="Download" onPress={download} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    alignItems: "center",
  },
  img: {
    width: 250,
    height: 250,
  },
});
