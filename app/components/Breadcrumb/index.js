import React from "react";
import { View, Text, StyleSheet } from "react-native";

function listDirectories(dir) {
  if (dir.parent) {
    return [...listDirectories(dir.parent), dir];
  }
  return [dir];
}

export default function Breadcrumb(props) {
  const dirs = listDirectories(props.currentDirectory);

  function onPress(dir, index) {
    if (index !== dirs.length - 1) {
      props.onSelect(dir);
    }
  }

  return (
    <View style={styles.breadcrumb}>
      {dirs.map((dir, index) => (
        <Text
          key={index}
          style={
            index === dirs.length - 1
              ? [styles.breadcrumbItem, styles.currentItem]
              : styles.breadcrumbItem
          }
          onPress={() => onPress(dir, index)}
        >
          {index === 0 ? "Root" : ` > ${dir.name}`}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  breadcrumb: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#ccc",
    paddingVertical: 5,
  },
  breadcrumbItem: {
    padding: 2,
  },
  currentItem: {
    fontWeight: "bold",
  },
});
