import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WEB_URL} from '@env';

const WebViewScreen = () => {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const handleNavigationStateChange = navState => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setLoading(navState.loading);
  };

  const handleGoBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };

  const handleGoForward = () => {
    if (webViewRef.current && canGoForward) {
      webViewRef.current.goForward();
    }
  };

  const handleReload = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{uri: WEB_URL || 'https://setlone.com'}}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#a9a8d3" />
          </View>
        )}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        sharedCookiesEnabled={true}
        allowsBackForwardNavigationGestures={true}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#a9a8d3" />
        </View>
      )}
      {/* 웹뷰 컨트롤 버튼 (선택사항) */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, !canGoBack && styles.controlButtonDisabled]}
          onPress={handleGoBack}
          disabled={!canGoBack}>
          <Icon name="arrow-back" size={24} color={canGoBack ? '#a9a8d3' : '#666'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleReload}>
          <Icon name="refresh" size={24} color="#a9a8d3" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, !canGoForward && styles.controlButtonDisabled]}
          onPress={handleGoForward}
          disabled={!canGoForward}>
          <Icon name="arrow-forward" size={24} color={canGoForward ? '#a9a8d3' : '#666'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  webview: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a1a',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 10, 26, 0.8)',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(169, 168, 211, 0.3)',
  },
  controlButton: {
    padding: 8,
  },
  controlButtonDisabled: {
    opacity: 0.3,
  },
});

export default WebViewScreen;

