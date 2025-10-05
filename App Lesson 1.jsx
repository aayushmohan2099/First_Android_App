import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  useColorScheme,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const backgroundColor = isDarkMode ? 'darkcyan' : 'lightcyan';
  const textColor = isDarkMode ? 'lightcyan' : 'darkcyan';

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <Text style={[styles.text, { color: textColor }]}>
        Kya scene hai AffA!
      </Text>
      <Image
        style={styles.pic}
        source={{
          uri: 'https://images.unsplash.com/photo-1759333173206-2a1a22f5a5c1?q=80&w=1152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
      />

      <TouchableOpacity
        style={styles.TObutton}
        onPress={() => Alert.alert('Button is working!')}
      >
        <Text style={styles.text}>TouchableOpacity Button</Text>
      </TouchableOpacity>

      <TouchableHighlight
        style={styles.THbutton}
        onPress={() => Alert.alert('Button is working!')}
      >
        <Text style={styles.text}>TouchableHighlight Button</Text>
      </TouchableHighlight>
      <Pressable style={styles.Pbutton}>
        <Text style={styles.btnText}>Press Me</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'lightcyan',
    padding: 20,
    gap: 10,
  },
  text: {
    color: 'darkcyan',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pic: {
    width: 200,
    height: 150,
  },
  Pbutton: {
    width: 200,
    padding: 10,
    backgroundColor: 'lightcyan',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10,
    borderWidth: 2.5,
    borderColor: 'darkcyan',
  },
  TObutton: {
    width: 300,
    padding: 10,
    backgroundColor: 'lightcyan',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10,
    borderWidth: 2.5,
    borderColor: 'darkcyan',
  },
  THbutton: {
    width: 300,
    padding: 10,
    backgroundColor: 'lightcyan',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10,
    borderWidth: 2.5,
    borderColor: 'darkcyan',
  },
  btnText: {
    color: 'darkcyan',
    fontSize: 20,
    fontWeight: '500',
  },
});
