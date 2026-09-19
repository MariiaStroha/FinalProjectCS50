import { Tabs } from 'expo-router';
import React from 'react';
import { House } from 'lucide-react-native';
import { Summary } from 'lucide-react-native';
import { Settings } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'blue',
        tabBarStyle:{
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: 'gray'
        },
        headerShown: false,
      }}>
        <Tabs.Screen
          name='index'
          options={{
            title:'Home',
            tabBarIcon: ({color, size}) => (
              <House color={color} size={size}/>
            )
          }}
          />
          <Tabs.Screen
          name='portraits'
          options={{
            title:'Portraits',
            tabBarIcon: ({color, size}) => (
              <Summary color={color} size={size}/>
            )
          }}
          />
          <Tabs.Screen
          name='menu'
          options={{
            title:'Settings',
            tabBarIcon: ({color, size}) => (
              <Settings color={color} size={size}/>
            )
          }}
          />
    </Tabs>
  );
}
