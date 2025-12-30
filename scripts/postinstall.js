#!/usr/bin/env node

/**
 * Post-install script
 * iOS Pod 설치 (macOS에서만 실행)
 */

const {execSync} = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const platform = os.platform();
const iosPath = path.join(__dirname, '..', 'ios');

// macOS에서만 pod install 실행
if (platform === 'darwin') {
  if (fs.existsSync(iosPath)) {
    try {
      console.log('Running pod install for iOS...');
      process.chdir(iosPath);
      execSync('pod install', {stdio: 'inherit'});
      console.log('✅ iOS pods installed successfully');
    } catch (error) {
      console.warn('⚠️  pod install failed. You may need to run it manually:');
      console.warn('   cd ios && pod install');
    }
  } else {
    console.log('ℹ️  iOS directory not found, skipping pod install');
  }
} else {
  console.log('ℹ️  Skipping pod install (not on macOS)');
  console.log('   Run "cd ios && pod install" manually on macOS');
}
