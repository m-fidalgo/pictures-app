import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";

export default function ImageList(props) {
  return (
    <View style={styles.imgContainer}>
      {props.images.map((image, index) => (
        <TouchableHighlight key={index} onPress={() => props.onSelect(image)}>
          <Image style={styles.img} source={{ uri: image.uri }} />
        </TouchableHighlight>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  img: {
    margin: 4,
    width: Dimensions.get("screen").width / 3 - 8,
    height: Dimensions.get("screen").width / 3 - 8,
  },
});
