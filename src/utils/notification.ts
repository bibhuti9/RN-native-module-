import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export interface ScheduleNotificationPropsTypes {
  taskId: string;
  message: string;
  date: number;
}

export const createChannnel = () => {
  PushNotification.createChannel(
    {
      channelId: 'demo', // (required)
      channelName: 'demo', // (required)
      channelDescription: 'demo',
      playSound: true,
      soundName: 'music.mp3',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => {
      if (created) {
        console.log('notification is setted');
        localScheduleNotification();
      } else {
        PushNotification.deleteChannel('demo');
        createChannnel();
      }
    }, // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

export const deleteChannel = () => {
  PushNotification.channelExists('demo', exists => {
    if (exists) {
      PushNotification.deleteChannel('demo');
    }
  });
};

export const localNotificationConfurigation = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
      messaging().onMessage(async remoteMessage => {
        localNotification(remoteMessage?.notification?.title);
      });
      console.log('NOTIFICATION:', notification);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};

export const reminderDate = (targetDate: number) => {
  const currentDate = new Date(targetDate);
  currentDate.setMinutes(currentDate.getMinutes() - 2);
  return currentDate;
};

export const localScheduleNotification = async (): Promise<void> => {
  PushNotification.localNotificationSchedule({
    channelId: 'demo',
    message: 'Demo message', // (required)
    date: reminderDate(new Date().getTime()), // in 60 secs
    allowWhileIdle: false,
    repeatTime: 1,
    vibrate: true,
    vibration: 10,
    priority: 'high',
  });
};

export const createLocationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'tudub', // (required)
      channelName: 'tudub', // (required)
      channelDescription: 'osfiaspdfiojasdfiasdf',
      playSound: true,
      soundName: 'music.mp3',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => {
      if (created) {
        console.log('Notification created');
        localNotification();
      } else {
        console.log('Notification exists');
        PushNotification.deleteChannel('tudub');
      }
    }, // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

export const localNotification = async (): Promise<void> => {
  PushNotification.localNotification({
    channelId: 'tudub',
    bigText: 'this is the demo message',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'music.mp3',
  });
};

export const getFcmToken = async (): Promise<string | null> => {
  try {
    const tokenPromise = messaging().getToken();

    const timeoutPromise = new Promise<null>(resolve => {
      setTimeout(() => resolve(null), 200);
    });

    const result = await Promise.race([tokenPromise, timeoutPromise]);

    return result || null;
  } catch (e) {
    return null;
  }
};

export const askNotificationPermission = async () => {
  await PushNotification.requestPermissions();
};

export const checkNotificationPermission = async () => {
  const permission = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  return permission;
};

export const requestNotificationPermission = async () => {
  const permission = await checkNotificationPermission();
  switch (permission) {
    case RESULTS.GRANTED:
      return true;
    case RESULTS.DENIED: {
      const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      if (result === RESULTS.GRANTED) {
        return true;
      } else {
        return await checkNotificationPermission();
      }
    }
    default:
      return false;
  }
};
