import { Tabs } from 'expo-router';
import useTheme from '../../hooks/useTheme'
import { House } from 'lucide-react-native';
import { Summary } from 'lucide-react-native';
import { Settings } from 'lucide-react-native';

export default function TabsLayout() {

  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle:{
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          height: 120,
          paddingBottom: 25,
          paddingTop: 10,
          borderTopColor: colors.border
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
