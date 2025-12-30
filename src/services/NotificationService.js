import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid, Alert} from 'react-native';

// Firebase 21.x는 자동 초기화를 지원하므로 별도 초기화 불필요

class NotificationService {
  static async requestPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Android notification permission granted');
          return true;
        } else {
          console.log('Android notification permission denied');
          return false;
        }
      } catch (err) {
        console.warn('Android permission error:', err);
        return false;
      }
    } else {
      // iOS
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('iOS notification permission granted');
        return true;
      } else {
        console.log('iOS notification permission denied');
        return false;
      }
    }
  }

  static async getToken() {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  static async initialize() {
    // 권한 요청
    const hasPermission = await this.requestPermission();
    if (!hasPermission) {
      Alert.alert(
        '알림 권한',
        '푸시 알림을 받으려면 알림 권한이 필요합니다.',
      );
      return;
    }

    // FCM 토큰 가져오기
    const token = await this.getToken();
    if (token) {
      // 서버에 토큰 전송 (API 호출)
      // await this.sendTokenToServer(token);
    }

    // 포그라운드 메시지 핸들러
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title || '알림',
        remoteMessage.notification?.body || '',
      );
    });

    // 백그라운드 메시지 핸들러 (앱이 종료된 상태)
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message:', remoteMessage);
    });

    // 알림 탭 핸들러 (앱이 백그라운드에 있을 때)
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened app:', remoteMessage);
      // 네비게이션 처리
    });

    // 앱이 종료된 상태에서 알림 탭으로 앱 열기
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open:', remoteMessage);
          // 네비게이션 처리
        }
      });
  }

  static async sendTokenToServer(token) {
    // API 서버에 FCM 토큰 전송
    // 예시:
    // try {
    //   await fetch('https://api.setlone.com/api/v1/users/fcm-token', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${userToken}`,
    //     },
    //     body: JSON.stringify({fcmToken: token}),
    //   });
    // } catch (error) {
    //   console.error('Error sending token to server:', error);
    // }
  }
}

export {NotificationService};

