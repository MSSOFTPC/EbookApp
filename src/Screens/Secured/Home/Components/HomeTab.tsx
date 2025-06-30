import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import React, { useRef, useState } from 'react';

const tabs = ['About Book', 'Reviews'];
const screenWidth = Dimensions.get('screen').width;

const HomeTab = ({onChange}:{onChange?:(val:number)=>void}) => {
  const [active, setActive] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index) => {
    setActive(index);
    onChange?.(index)

    Animated.spring(slideAnim, {
      toValue: index * (screenWidth / tabs.length),
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <View style={styles.tabView}>
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={item}
            style={styles.tabBtn}
            onPress={() => handleTabPress(index)}
          >
            <Text style={[styles.tabText, active === index && styles.activeText]}>{item}</Text>
          </TouchableOpacity>
        ))}

        {/* Curved Slider */}
        <Animated.View
          style={[
            styles.slider,
            {
              left: slideAnim,
              width: screenWidth / tabs.length - 40,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    marginTop:40,
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#f2f0f0',
    borderBottomWidth: 7,
    paddingTop: 20,
    paddingBottom: 10,
    zIndex:999999
  },
  tabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: '#5b5a5b',
    fontSize: 16,
    fontWeight: '500',
  },
  activeText: {
    color: '#da6d4d',
    fontWeight: '600',
  },
  slider: {
    position: 'absolute',
    bottom: -6,
    height: 5,
    backgroundColor: '#FF4D00',
    borderRadius: 50,
    marginHorizontal: 20,
    zIndex:-1
  },
});

export default HomeTab;
