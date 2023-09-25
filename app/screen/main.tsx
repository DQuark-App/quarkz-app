import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonActions} from '@react-navigation/native';
import Setting from './tab/setting';
import HomeWrap from './tab/homewrap';
const Tab = createBottomTabNavigator();

export default function Main() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          style={{backgroundColor: theme.colors.elevation.level4}}
          activeColor={theme.colors.primary}
          inactiveColor={theme.colors.onSurface}
          navigationState={state}
          safeAreaInsets={insets}
          labeled={false}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 24});
            }

            return null;
          }}
        />
      )}>
      <Tab.Screen
        name="Home"
        component={HomeWrap}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => {
            return <Icon name="home" size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.onBackground,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => {
            return <Icon name="cog" size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.onBackground,
        }}
      />
    </Tab.Navigator>
  );
}
