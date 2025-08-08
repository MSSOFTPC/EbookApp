import React, { useEffect, useState, useRef } from 'react';
import { useWindowDimensions, View, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { manageAdvancedSettings } from '@/Redux/Slice/AuthSlice';
import { RootState } from '@/Redux/Store';
import { BookReadBackend } from '@/Api/Books/Actions/BookAction';
import { Header } from '../BookReader/Header';
import { BookmarksList } from '../BookReader/BookmarksList';
import { SearchList } from '../BookReader/SearchList';
import { TableOfContents } from '../BookReader/TableOfContents';
import { Footer } from '../BookReader/Footer';

function BookReaderPdf() {
  const { width, height } = Dimensions.get("window");
  const { params } = useRoute();
  const { item } = params;
  const { _id } = item;
  const dispatch = useDispatch();
  const { bookAdvancedSettings } = useSelector((i: RootState) => i.AuthSlice);

  const savedSettings = bookAdvancedSettings?.[_id] || {};
  const pdfRef = useRef<Pdf>(null);


  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentPage, setCurrentPage] = useState(savedSettings.currentPage || 10);


  useEffect(()=>{
          // after some sec call read api
          setTimeout(() => {
            BookReadBackend({id:_id})
          }, 3000);
  },[])


  const handlePageChanged = (page: number, pageCount: number) => {
    setCurrentPage(page);
     // setmeta data
    dispatch(manageAdvancedSettings({ bookId: _id, settings: { bookdata:item,meta: {currentPage:page,totalPage:pageCount} } }));
  };


  return (
    <View
      style={[
        styles.container,
      ]}
    >

      <Pdf
        ref={pdfRef}
        trustAllCerts={false}
        source={{ uri: item?.media, cache:true }}
        style={[styles.pdf, { height: !isFullScreen ? height * 0.75 : height }]}
        onPageChanged={handlePageChanged}
        onError={(error) => console.log('PDF error:', error)}
        enablePaging={true}
        enableAnnotationRendering={true}
        enableAntialiasing={true}
        fitPolicy={0}
        minScale={1.0}
        maxScale={3.0}
        enableDoubleTapZoom
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default BookReaderPdf;