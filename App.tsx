import React from 'react';
import {StyleSheet, View} from 'react-native';
import Home from './src/Home';
import {localNotificationConfurigation} from './src/utils/notification';

const App = () => {
  localNotificationConfurigation();
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
