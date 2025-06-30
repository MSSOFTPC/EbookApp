import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import BottomSheetBody from './BottomSheetBody';

interface sheetProps {
    children:React.ReactNode,
    snapPoints?:[],
    style?:String,
    noloading?:boolean
}

const Bottomsheet = React.forwardRef<BottomSheetModal,sheetProps>(({children,noloading,snapPoints=['100%'],style={height:400}},ref) => {

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('Sheet state changed to:', index);
  }, []);

   const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}   // Sheet jab index >= 0 par ho to backdrop dikhe
      disappearsOnIndex={-1}  // Sheet close hone par backdrop chala jaye
      pressBehavior="close"   // backdrop par tap karne se sheet close ho
    />
  ), []);

  // renders
  return (
    <BottomSheetModal
        detached
        ref={ref}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        >
        <BottomSheetView style={[styles.contentContainer,style]}>
            <BottomSheetBody noloading={noloading}>
                {children}
            </BottomSheetBody>
        </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Bottomsheet;