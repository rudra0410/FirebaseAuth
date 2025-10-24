/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  useEffect(() => {
    const onBackPress = () => {
      Alert.alert('Exit App', 'Do you want to exit app?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const handleBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    return () => handleBack.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Main />
          {/* <Text>App</Text> */}
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
