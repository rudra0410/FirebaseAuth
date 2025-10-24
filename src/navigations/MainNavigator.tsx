/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Home from '../screens/Home';
import Login from '../screens/Login';
import { AuthUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
