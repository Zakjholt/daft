import React from "react";
import { StyleSheet, Text, View, Button, Share, Vibration } from "react-native";
import { generateWords, isVowel } from "./utils";

export default class App extends React.Component {
  constructor() {
    super();
    const { word1, word2, word3 } = generateWords();
    this.state = {
      word1: {
        value: word1,
        locked: false
      },
      word2: {
        value: word2,
        locked: false
      },
      word3: {
        value: word3,
        locked: false
      }
    };
  }

  toggleWordLock = key => {
    Vibration.vibrate(1, true);
    const { locked: currentLockState, value: currentWord } = this.state[key];
    this.setState({
      [key]: {
        value: currentWord,
        locked: !currentLockState
      }
    });
  };

  getNewWords = () => {
    const newWords = generateWords();

    Object.keys(this.state).forEach(
      key =>
        !this.state[key].locked &&
        this.setState({ [key]: { value: newWords[key], locked: false } })
    );
  };

  render() {
    const { word1, word2, word3 } = this.state;
    const preposition = isVowel(word1.value) ? "an" : "a";
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.heading}>
            You sir, are {preposition}...
          </Text>
        </View>
        <View style={styles.row}>
          <Text onLongPress={() => this.toggleWordLock("word1")}>
            {word1.value},
          </Text>
        </View>
        <View style={styles.row}>
          <Text onLongPress={() => this.toggleWordLock("word2")}>
            {word2.value},
          </Text>
        </View>
        <View style={styles.row}>
          <Text onLongPress={() => this.toggleWordLock("word3")}>
            {word3.value}
          </Text>
        </View>
        <View style={styles.buttonRow}>
          <Button
            onPress={() => {
              Vibration.vibrate(1, true);
              return this.getNewWords();
            }}
            title="Generate new"
          />
          <Button
            onPress={() => {
              Vibration.vibrate(1, true);
              return Share.share({
                message: `You sir are ${preposition} ${word1.value}, ${word2.value}, ${word3.value}`
              });
            }}
            title="Share"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    fontSize: 20
  },
  buttonRow: {
    flex: 3,
    justifyContent: "space-around"
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  }
});
