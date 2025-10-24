/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MainNavigator from './navigations/MainNavigator';
import { AuthUser } from './services/authService';
import {
  getUserFromStorage,
  removeUserFromStorage,
  saveUserToStorage,
} from './services/storageService';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { AuthProvider, useAuth } from './context/AuthContext';

const Main = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return <MainNavigator />;
};

export default Main;

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
