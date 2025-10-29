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
import Dashboard from '../screens/Dashboard';
<<<<<<< HEAD
import Calculator from '../screens/Calculator';
=======
>>>>>>> dfae1673e8c1e132b787c3c2387a586e00feac69

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
<<<<<<< HEAD
          <Stack.Screen name="Calculator" component={Calculator} />
=======
>>>>>>> dfae1673e8c1e132b787c3c2387a586e00feac69
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
