import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, IconButton, useTheme } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FormBtn } from './Form/Input/FormFields';
import MediaUploader from './MediaUploader';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { MediaUploadAction } from '../Api/Actions/Media/MediaActions';
import ImageLoader from './Global/Image/Image';


const FormMediaUploaderBtn = ({
  title,
  values,
  multiple,
  allowsEditing,
  mediaTypes,
  quality,
  selectionLimit,
  handleChange,
  errors,
  name,
  btnStyle,
  btnIcon,
  btnTextStyle,
  children,
  style,
  disabled,
}) => {
  const [isOpen, setisOpen] = useState(false);
  const [media, setmedia] = useState(null);
  const [percentage, setpercentage] = useState(0);
  const [mediaList, setMediaList] = useState(values?.[name] || []);
  const theme = useTheme();

 useEffect(() => {
  if (!media || media.length === 0) return;

  const files = media.map(val => ({
    uri: val.uri,
    name: val.fileName || val.uri.split('/').pop(),
    type: val.mimeType || 'image/jpeg',
  }));

  const uploads = multiple
    ? files.map(file => {
        const formData = new FormData();
        formData.append('media', file);

        return new Promise(resolve => {
          MediaUploadAction({
            data: formData,
            onSuccess: res => resolve(res?.Preview_Urls?.[0] || res[0]),
            onUploadProgress: percent => setpercentage(percent),
          });
        });
      })
    : [
        new Promise(resolve => {
          const formData = new FormData();
          formData.append('media', files[0]);

          MediaUploadAction({
            data: formData,
            onSuccess: res => resolve(res?.Preview_Urls?.[0] || res[0]),
            onUploadProgress: percent => setpercentage(percent),
          });
        }),
      ];

  Promise.all(uploads).then(uploadedFiles => {
    const updatedList = multiple ? [...mediaList, ...uploadedFiles] : [uploadedFiles[0]];
    setMediaList(updatedList);
    handleChange?.({ target: { name, value: updatedList } });
    setpercentage(0);
  });
}, [media]);

  const deleteImage = (index) => {
    const updatedList = mediaList.filter((_, i) => i !== index);
    setMediaList(updatedList);
    handleChange?.({
      target: {
        name,
        value: updatedList,
      },
    });
  };

  const handleDragEnd = ({ data }) => {
    if (!multiple) return; // single ke case me drag disable
    setMediaList(data);
    handleChange?.({
      target: {
        name,
        value: data,
      },
    });
  };

  return (
    <View style={[styles.wrapper, style]}>
      <FormBtn
        title={title}
        onPress={() => setisOpen(true)}
        errors={errors}
        textStyle={btnTextStyle}
        name={name}
        style={{ marginBottom: 12 }}
        btnStyle={btnStyle}
        children={children}
        disabled={disabled}
        percentage={percentage}
        icon={btnIcon}
      />

      {mediaList.length > 0 && (
        <DraggableFlatList
          data={mediaList}
          onDragEnd={handleDragEnd}
          keyExtractor={(item, index) => `${item}_${index}`}
          horizontal
          contentContainerStyle={{ gap: 12 }}
          scrollEnabled={multiple}
          renderItem={({  item, index, drag, getIndex }) => (
            <View style={styles.mediaContainer}>
              <Card style={styles.mediaCard} onLongPress={multiple ? drag : undefined}>
                <ImageLoader source={{ uri: item }} style={styles.mediaImage} />
                <View style={styles.overlay}>
                  <IconButton
                    icon={() => <AntDesign name="delete" size={18} color="#fff" />}
                    onPress={() => deleteImage(getIndex())}
                    style={styles.deleteIcon}
                  />
                </View>
              </Card>
            </View>
          )}
        />
      )}

      <MediaUploader
        onChange={setmedia}
        multiple={multiple}
        allowsEditing={allowsEditing}
        mediaTypes={mediaTypes}
        quality={quality}
        selectionLimit={selectionLimit}
        isOpen={isOpen}
        setisOpen={() => setisOpen(!isOpen)}
      />
    </View>
  );
};

export default FormMediaUploaderBtn;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  mediaContainer: {
    position: 'relative',
  },
  mediaCard: {
    width: 120,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 4,
    backgroundColor: '#222',
    elevation: 5,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
  },
  deleteIcon: {
    margin: 0,
    elevation: 6,
  },
});
