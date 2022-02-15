import React from 'react';
import Teams from './components/Teams';
import Members from './components/Members';
import Memberships from './components/Memberships';
import SelectedTeam from './components/SelectedTeam';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(255, 255, 255)',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Memberships" component={Memberships} options={{headerShown: false}} />
        <Stack.Screen name="Teams" component={Teams} options={{headerShown: false}} />
        <Stack.Screen name="Members" component={Members} options={{headerShown: false}} />
        <Stack.Screen name="SelectedTeam" component={SelectedTeam} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}