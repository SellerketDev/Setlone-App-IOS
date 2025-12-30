import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>프로필</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={{uri: 'https://i.pravatar.cc/150?img=1'}}
              style={styles.avatar}
            />
            <View style={styles.editIconContainer}>
              <Icon name="edit" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.username}>사용자 이름</Text>
          <Text style={styles.uid}>UID: 1234567</Text>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="person" size={24} color="#a9a8d3" style={styles.menuIcon} />
            <Text style={styles.menuText}>내 정보</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="history" size={24} color="#a9a8d3" style={styles.menuIcon} />
            <Text style={styles.menuText}>활동 내역</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="favorite" size={24} color="#a9a8d3" style={styles.menuIcon} />
            <Text style={styles.menuText}>좋아요</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="bookmark" size={24} color="#a9a8d3" style={styles.menuIcon} />
            <Text style={styles.menuText}>저장됨</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(169, 168, 211, 0.3)',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#a9a8d3',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#a9a8d3',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0a0a1a',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e9e8e8',
    marginBottom: 4,
  },
  uid: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(169, 168, 211, 0.1)',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#e9e8e8',
  },
});

export default ProfileScreen;

