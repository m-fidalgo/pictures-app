import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DirectoryList(props) {
  return (
    <View style={styles.directoriesList}>
      {props.directories.map((directory, index) => (
        <Text
          style={styles.directory}
          key={index}
          onPress={() => props.onSelect(directory)}
        >
          {directory.name}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  directoriesList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  directory: {
    backgroundColor: "#0062ac",
    color: "#fff",
    padding: 5,
    margin: 2,
  },
});
