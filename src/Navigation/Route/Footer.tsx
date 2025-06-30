import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { AntDesign, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = width / TAB_COUNT;

export default function CustomTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const { navigate } = useNavigation();
  const currentRoute = useRoute();

  const routes = ['Home', 'Offline', 'Bookmark', 'Library', 'Profile'];

  const animateIndicator = (index) => {
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  };

  const handleTabPress = (index, route) => {
    setActiveTab(index);
    animateIndicator(index);
    navigate(route);
  };

  // Indicator Sync with Route
  useEffect(() => {
    const index = routes.findIndex(r => r === currentRoute.name);
    if (index !== -1) {
      setActiveTab(index);
      animateIndicator(index);
    }
  }, [currentRoute]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabBarWrapper}>
        <View style={styles.tabBarContainer}>
          <Animated.View
            style={[
              styles.activeIndicator,
              { transform: [{ translateX }] },
            ]}
          />
          {routes.map((route, index) => {
            const isFocused = currentRoute.name === route;

            let iconName = <AntDesign name="home" size={24} color={isFocused ? "#FF5A00" : "black"} />;
            if (route === 'Offline') iconName = <Entypo name="compass" size={24} color={isFocused ? "#FF5A00" : "black"} />;
            if (route === 'Bookmark') iconName = <Feather name="bookmark" size={24} color={isFocused ? "#FF5A00" : "black"} />;
            if (route === 'Library') iconName = <Feather name="book-open" size={24} color={isFocused ? "#FF5A00" : "black"} />;
            if (route === 'Profile') iconName = <FontAwesome5 name="user" size={24} color={isFocused ? "#FF5A00" : "black"} />;

            return (
              <TouchableOpacity
                key={route}
                style={styles.tabItem}
                onPress={() => handleTabPress(index, route)}
              >
                {iconName}
                <Text style={[styles.label, { color: isFocused ? '#FF5A00' : '#999' }]}>
                  {route}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    overflow: "hidden",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
    borderTopColor: "#ededed",
    borderTopWidth: 2,
  },
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  tabItem: {
    width: TAB_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: TAB_WIDTH,
    height: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: '#FF5A00',
  },
});
