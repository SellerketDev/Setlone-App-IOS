import React, {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import {NotificationService} from './services/NotificationService';

const App = () => {
  useEffect(() => {
    // 스플래시 스크린 숨기기
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    } else {
      // iOS는 네이티브에서 처리
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    }

    // 푸시 알림 초기화
    NotificationService.initialize();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#0a0a1a"
        />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

