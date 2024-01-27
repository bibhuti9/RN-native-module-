import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {getFcmToken} from '../utils/notification';

export default function Home() {
  return (
    <View>
      <TouchableOpacity
        onPress={async () => {
          // localNotification();
          const result = await getFcmToken();
          console.log(result);
        }}>
        <Text>Push notification</Text>
      </TouchableOpacity>
    </View>
  );
}
