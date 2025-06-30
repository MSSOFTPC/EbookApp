import React, { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import {
  Reader,
  useReader,
  Themes,
  Annotation,
} from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from './Header';
import { Footer } from './Footer';
import { MAX_FONT_SIZE, MIN_FONT_SIZE, availableFonts, themes } from './init';
import { BookmarksList } from './BookmarksList';
import { SearchList } from './SearchList';
import { TableOfContents } from './TableOfContents';
import { COLORS } from './AnnotationForm';
import { AnnotationsList } from './AnnotationsList';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { manageAdvancedSettings } from '@/Redux/Slice/AuthSlice';
import { RootState } from '@/Redux/Store';
import { BookReadBackend } from '@/Api/Books/Actions/BookAction';

function Component() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { params } = useRoute();
  const { item } = params;
  const { _id } = item;
  const dispatch = useDispatch();
  const { bookAdvancedSettings } = useSelector((i: RootState) => i.AuthSlice);

  const savedSettings = bookAdvancedSettings?.[_id] || {};


  const {
    theme,
    changeFontSize,
    changeFontFamily,
    changeTheme,
    annotations,
    goToLocation,
    addAnnotation,
    removeAnnotation,
    currentLocation
  } = useReader();

  const bookmarksListRef = React.useRef<BottomSheetModal>(null);
  const searchListRef = React.useRef<BottomSheetModal>(null);
  const tableOfContentsRef = React.useRef<BottomSheetModal>(null);
  const annotationsListRef = React.useRef<BottomSheetModal>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState(savedSettings.fontSize || 14);
  const [currentFontFamily, setCurrentFontFamily] = useState(savedSettings.fontFamily || availableFonts[0]);
  const [currentTheme, setCurrentTheme] = useState(savedSettings.theme || Themes.DARK);
  const [tempMark, setTempMark] = useState<Annotation | null>(null);
  const [selection, setSelection] = useState<{ cfiRange: string; text: string } | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | undefined>(undefined);


  // Apply settings when state changes
  useEffect(() => {
    changeFontSize(`${currentFontSize}px`);
  }, [currentFontSize, changeFontSize]);

  useEffect(() => {
    changeFontFamily(currentFontFamily);
  }, [currentFontFamily, changeFontFamily]);

  useEffect(() => {
    changeTheme(currentTheme);
  }, [currentTheme, changeTheme]);

  const increaseFontSize = () => {
    if (currentFontSize < MAX_FONT_SIZE) {
      const newSize = currentFontSize + 1;
      setCurrentFontSize(newSize);
      dispatch(manageAdvancedSettings({ bookId: _id, settings: { fontSize: newSize } }));
    }
  };

  const decreaseFontSize = () => {
    if (currentFontSize > MIN_FONT_SIZE) {
      const newSize = currentFontSize - 1;
      setCurrentFontSize(newSize);
      dispatch(manageAdvancedSettings({ bookId: _id, settings: { fontSize: newSize } }));
    }
  };

  const switchTheme = () => {
    const index = Object.values(themes).indexOf(currentTheme);
    const nextTheme = Object.values(themes)[(index + 1) % Object.values(themes).length];
    setCurrentTheme(nextTheme);
    dispatch(manageAdvancedSettings({ bookId: _id, settings: { theme: nextTheme } }));
  };

  const switchFontFamily = () => {
    const index = availableFonts.indexOf(currentFontFamily);
    const nextFontFamily = availableFonts[(index + 1) % availableFonts.length];
    setCurrentFontFamily(nextFontFamily);
    dispatch(manageAdvancedSettings({ bookId: _id, settings: { fontFamily: nextFontFamily } }));
  };


  const handleOnReady = ()=>{
        if (savedSettings.fontSize) {
          changeFontSize(`${savedSettings.fontSize}px`);
        }
        if (savedSettings.fontFamily) {
          changeFontFamily(savedSettings.fontFamily);
        }
        if (savedSettings.theme) {
          changeTheme(savedSettings.theme);
        }

        // setmeta data
        dispatch(manageAdvancedSettings({ bookId: _id, settings: { bookdata:item,meta: {currentPage:currentLocation?.end?.displayed?.page || 1,totalPage:currentLocation?.end?.displayed?.total || 1} } }));

        // after some sec call read api
        setTimeout(() => {
          BookReadBackend({id:_id})
        }, 3000);
  }
  const handleSwipe = ()=>{
     const currentPage = currentLocation?.end?.displayed?.page;
     const savedPage = savedSettings?.meta?.currentPage || 0;


      if (currentPage > savedPage) {
          setTimeout(() => {
              dispatch(manageAdvancedSettings({
                  bookId: _id,
                  settings: {
                      currentLocation:currentLocation?.start?.cfi,
                      meta: {
                          currentPage: currentPage || 1,
                          totalPage: currentLocation?.end?.displayed?.total || 1
                      }
                  }
              }));
          }, 2000);
      }
  }



  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: theme.body.background,
      }}
    >
      {!isFullScreen && (
        <Header
          currentFontSize={currentFontSize}
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          switchTheme={switchTheme}
          switchFontFamily={switchFontFamily}
          onPressSearch={() => searchListRef.current?.present()}
          onOpenBookmarksList={() => bookmarksListRef.current?.present()}
          onOpenTableOfContents={() => tableOfContentsRef.current?.present()}
          onOpenAnnotationsList={() => annotationsListRef.current?.present()}
        />
      )}

      <Reader
        src={item?.media}
        width={width}
        height={!isFullScreen ? height * 0.75 : height} 
        fileSystem={useFileSystem}
        defaultTheme={currentTheme}
        initialLocation={savedSettings?.currentLocation || "introduction_001.xhtml"}
        initialAnnotations={savedSettings.annotations || []}
        onReady={handleOnReady}
        onSwipeLeft={handleSwipe}
        onAddAnnotation={(annotation) => {
          if (annotation.type === 'highlight' && annotation.data?.isTemp) {
            setTempMark(annotation);
          }
          const updated = [...(savedSettings.annotations || []), annotation];
          dispatch(manageAdvancedSettings({ bookId: _id, settings: { annotations: updated } }));
        }}
        onPressAnnotation={(annotation) => {
          setSelectedAnnotation(annotation);
          annotationsListRef.current?.present();
        }}
        menuItems={[
          {
            label: '🟡',
            action: (cfiRange) => {
              addAnnotation('highlight', cfiRange, undefined, { color: COLORS[2] });
              return true;
            },
          },
          {
            label: '🔴',
            action: (cfiRange) => {
              addAnnotation('highlight', cfiRange, undefined, { color: COLORS[0] });
              return true;
            },
          },
          {
            label: '🟢',
            action: (cfiRange) => {
              addAnnotation('highlight', cfiRange, undefined, { color: COLORS[3] });
              return true;
            },
          },
          {
            label: 'Add Note',
            action: (cfiRange, text) => {
              setSelection({ cfiRange, text });
              addAnnotation('highlight', cfiRange, { isTemp: true });
              annotationsListRef.current?.present();
              return true;
            },
          },
        ]}
        onLocationChange={(location) => {
          dispatch(manageAdvancedSettings({ bookId: _id, settings: { currentLocation: location } }));
        }}
        onDoubleTap={() => setIsFullScreen((oldState) => !oldState)}
      />

      <BookmarksList ref={bookmarksListRef} onClose={() => bookmarksListRef.current?.dismiss()} />
      <SearchList ref={searchListRef} onClose={() => searchListRef.current?.dismiss()} />
      <TableOfContents
        ref={tableOfContentsRef}
        onClose={() => tableOfContentsRef.current?.dismiss()}
        onPressSection={(selectedSection) => {
          goToLocation(selectedSection.href.split('/')[1]);
          tableOfContentsRef.current?.dismiss();
        }}
      />
      <AnnotationsList
        ref={annotationsListRef}
        selection={selection}
        selectedAnnotation={selectedAnnotation}
        annotations={annotations}
        onClose={() => {
          setTempMark(null);
          setSelection(null);
          setSelectedAnnotation(undefined);
          if (tempMark) removeAnnotation(tempMark);
          annotationsListRef.current?.dismiss();
        }}
      />

      {/* {!isFullScreen && <Footer />} */}
    </View>
  );
}

export default Component;
