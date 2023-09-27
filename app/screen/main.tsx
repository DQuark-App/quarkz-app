import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonActions} from '@react-navigation/native';
import Setting from './tab/setting';
import LibraryWrap from './tab/librarywrap';
import Generate from './tab/generate';
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
          labeled={true}
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
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel.toString()
                : options.title !== undefined
                ? options.title.toString()
                : '';

            return label;
          }}
        />
      )}>
      <Tab.Screen
        name="Generate"
        component={Generate}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({color, size}) => {
            return <Icon name="palette" size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.onBackground,
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryWrap}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({color, size}) => {
            return <Icon name="folder-home" size={size} color={color} />;
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
            return <Icon name="account" size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.onBackground,
        }}
      />
    </Tab.Navigator>
  );
}
