import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NotificationService} from '../services/NotificationService';

const SettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleNotificationToggle = async value => {
    setNotificationsEnabled(value);
    if (value) {
      await NotificationService.requestPermission();
    } else {
      // 알림 비활성화 로직
      Alert.alert('알림', '푸시 알림이 비활성화되었습니다.');
    }
  };

  const handleLogout = () => {
    Alert.alert('로그아웃', '로그아웃하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: () => {
          // 로그아웃 로직
          Alert.alert('완료', '로그아웃되었습니다.');
        },
      },
    ]);
  };

  const handleClearCache = () => {
    Alert.alert('캐시 삭제', '캐시를 삭제하시겠습니까?', [
      {text: '취소', style: 'cancel'},
      {
        text: '삭제',
        onPress: () => {
          Alert.alert('완료', '캐시가 삭제되었습니다.');
        },
      },
    ]);
  };

  const SettingItem = ({icon, title, onPress, rightComponent}) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Icon name={icon} size={24} color="#a9a8d3" style={styles.settingIcon} />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>설정</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="notifications" size={24} color="#a9a8d3" style={styles.settingIcon} />
              <Text style={styles.settingTitle}>푸시 알림</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
              trackColor={{false: '#666', true: '#a9a8d3'}}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>일반</Text>
          <SettingItem
            icon="language"
            title="언어 설정"
            onPress={() => Alert.alert('언어 설정', '언어 설정 기능은 준비 중입니다.')}
            rightComponent={<Icon name="chevron-right" size={24} color="#666" />}
          />
          <SettingItem
            icon="dark-mode"
            title="다크 모드"
            onPress={() => Alert.alert('다크 모드', '다크 모드 설정은 준비 중입니다.')}
            rightComponent={<Icon name="chevron-right" size={24} color="#666" />}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>데이터</Text>
          <SettingItem
            icon="storage"
            title="캐시 삭제"
            onPress={handleClearCache}
            rightComponent={<Icon name="chevron-right" size={24} color="#666" />}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정</Text>
          <SettingItem
            icon="logout"
            title="로그아웃"
            onPress={handleLogout}
            rightComponent={<Icon name="chevron-right" size={24} color="#666" />}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>정보</Text>
          <SettingItem
            icon="info"
            title="앱 버전"
            onPress={() => Alert.alert('버전', 'Setlone App v1.0.0')}
            rightComponent={<Text style={styles.versionText}>1.0.0</Text>}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(169, 168, 211, 0.3)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#a9a8d3',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(169, 168, 211, 0.1)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    color: '#e9e8e8',
    flex: 1,
  },
  versionText: {
    fontSize: 14,
    color: '#666',
  },
});

export default SettingsScreen;

