import React from 'react';
import {NativeModules, Text, TouchableOpacity, View} from 'react-native';

const {WebViewModule} = NativeModules;

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          WebViewModule.convertHTML('<h1>Hello guys</h1>', (result: number) => {
            console.log(result);
          });
        }}>
        <Text>demo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
