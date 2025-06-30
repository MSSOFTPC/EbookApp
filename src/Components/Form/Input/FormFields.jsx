import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, Switch, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, Chip, RadioButton, useTheme,TextInput, Divider, Surface, HelperText } from 'react-native-paper';
import Dropdown from 'react-native-input-select';
import CardBox from '@/Components/CardBox/CardBox';

const FormInput = ({
  title,
  labelStyle,
  handleChange,
  handleBlur,
  values,
  name,
  icon,
  errors,
  placeholder,
  numeric,
  onChange,
  style,
  transform,
  multiline,
  numberOfLines,
  disabled,
  placeholderTextColor,
  ref,
  onKeyPress,
  secureTextEntry,
  maxLength,
  leftIcon
}) => {
  const isError = errors?.[name];

  // Numeric keyboard
  const inputProps = numeric ? { keyboardType: 'numeric' } : {};

  // Value transform
  let value = values?.[name]?.toString();
  
  // Change handler
  const changeHandler = (val) => {
    let transformedVal = val;
    if (transform === 'upperCase') transformedVal = val.toUpperCase();
    else if (transform === 'lowerCase') transformedVal = val.toLowerCase();
    else if (transform === 'capitalize') transformedVal = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  
    handleChange?.(name)(transformedVal);
    if (onChange) onChange(transformedVal);
  };

  return (
    <View style={[{width:"100%",marginBottom:20},isError ? { height:70 } : {height:50},style]}>
      {/* {title && <Text style={[styles.label, labelStyle]}>{title}</Text>} */}

      <Surface style={[styles.inputContainer, isError && styles.errorBorder]}>
        {icon && <View style={{ marginRight: 10 }}>{icon}</View>}

        <TextInput
          ref={ref}
          style={styles.input}
          label={title}
          labelStyle={labelStyle}
          mode="flat"
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={changeHandler}
          onBlur={handleBlur?.(name)}
          onKeyPress={onKeyPress}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          error={!!isError}
          left={leftIcon}
          {...inputProps}
        />
      </Surface>

      <HelperText type="error" visible={!!isError}>
        {isError}
      </HelperText>
    </View>
  );
};

const FormSwitch = ({title,labelStyle,handleChange,values,name,icon,errors,style,disabled}) => {
  const isError = errors ? errors[name] && {borderWidth:3,borderColor:"red"} : false

  const changeHandler = (val)=>{
      handleChange?.(name)(val)
    }

  return (
    <View style={{position:"relative"}}>
      <CardBox noAutoWidth>
        <View style={[{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',paddingHorizontal:10},style]}>
        <View >
          {icon}
          {title && <Text style={[{fontSize:16, fontWeight:'400', color:"#000"},labelStyle]}>{title}</Text> }
        </View>
          <Switch
            trackColor={{false: '#767577', true: '#D242A8'}}
            thumbColor={values[name] ? '#FFFFFF' : '#f4f3f4'}
            onValueChange={changeHandler}
            value={values[name]}
            disabled={disabled}
          />
        </View>
      </CardBox>
    {isError && <Text style={{textTransform:"capitalize",color:"red",fontSize:16,backgroundColor:"white",zIndex:999,transform:"translateY(0px)",position:"absolute",bottom:-10,left:10,paddingHorizontal:5,paddingVertical:2}}>{errors[name]}</Text>}
    </View>
  )
}

// Radio Selector
const RadioInput = ({title,labelStyle,handleChange,values,name,errors,style,disabled})=>{
  const isError = errors ? errors[name] && {borderWidth:3,borderColor:"red"} : false

      const changeHandler = (val)=>{
        if(values[name]){
          handleChange?.(name)(false)
        }else{
          handleChange?.(name)(true)
        }
        
      }
      return (
        <View style={[{flexDirection: 'row', justifyContent: 'space-around'},style]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {title && <TouchableOpacity onPress={changeHandler}>
            <Text style={labelStyle}>{title}</Text>
          </TouchableOpacity> }
          <View style={{marginTop: 5}}>
            <RadioButton value={values[name]} status={   values[name] ? 'checked' : 'unchecked' } disabled={disabled} onPress={changeHandler} color={'#D242A8'} />
          </View>
        </View>
        {isError && <Text style={{textTransform:"capitalize",color:"red",fontSize:16,backgroundColor:"white",zIndex:999,transform:"translateY(0px)",position:"absolute",bottom:-10,left:10,paddingHorizontal:5,paddingVertical:2}}>{errors[name]}</Text>}
      </View>
      )
}

// Select
// [{label:String,value:String}]
const SelectInput = ({
  title,
  labelStyle,
  handleChange,
  values,
  name,
  icon,
  errors,
  placeholder,
  items,
  onChange,
  style
}) => {
  const isError = errors[name];
  const handleChangeVal = (val) => {
    handleChange(name)(val);
    if (onChange) onChange(val);
  };

  return (
    <View style={{ marginVertical: 8 }}>
      {title && <Text style={[styles.label, labelStyle]}>{title}</Text>}
      <View
        style={[
          styles.selectContainer,
          isError && styles.errorBorder,
          style
        ]}
      >
        {icon}
        <Dropdown
          placeholder={placeholder}
          options={items}
          selectedValue={values?.[name]}
          onValueChange={handleChangeVal}
          primaryColor={'#5A189A'} // Modern purple tone
          placeholderStyle={{ color: '#999' }}
          textStyle={{ fontSize: 16 }}
        />
      </View>
      {isError && (
        <Text style={styles.errorText}>
          {errors[name]}
        </Text>
      )}
    </View>
  );
};


// Button
const FormBtn = ({
  title,
  style,
  btnStyle,
  textStyle,
  onPress,
  danger,
  icon,
  add,
  disabled,
  errors,
  name,
  children,
  loading,
  percentage
}) => {
  const isError = errors ? errors[name] : false;
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      {/* If it's an upload animation button */}
      {add ? (
        <Button
          mode="contained"
          onPress={onPress}
          style={[styles.addBtn, btnStyle]}
          contentStyle={{ flexDirection: 'row', justifyContent: 'center' }}
        >
          <LottieView
            source={require('@/Assets/Lotties/Animation - 1725706078489.json')}
            autoPlay
            loop
            style={{ width: 60, height: 60 }}
          />
        </Button>
      ) : (
        <Button
          mode="contained"
          onPress={onPress}
          disabled={disabled}
          icon={icon}
          loading={loading}
          style={[
            styles.uploadBtn,
            danger && { backgroundColor: theme.colors.error },
            isError && styles.errorBorder,
            btnStyle
          ]}
          contentStyle={{ paddingVertical: 8 }}
          labelStyle={[styles.label, textStyle]}
        >
          {children ? children : title}
        </Button>
      )}

      {/* Upload Progress */}
      {percentage > 0 && percentage < 100 && (
        <ProgressBar progress={percentage / 100} color={theme.colors.primary} style={styles.progress} />
      )}

      {/* Error */}
      {isError && (
        <Text style={styles.errorText}>
          {errors[name]}
        </Text>
      )}
    </View>
  );
};



const AutoCompleteInput = ({
  title,
  labelStyle,
  handleChange,
  values,
  name,
  icon,
  errors,
  placeholder,
  items = [],
  onChange,
  style,
  onClickCreateBtn,
  onSearch,
  numeric
}) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchTimout, setsearchTimout] = useState(null);
  const [isFocus, setisFocus] = useState(false);

  const isError = errors?.[name]
    ? { borderWidth: 2, borderColor: 'red' }
    : {};

  const handleSearch = (text) => {
    if(!text){ setisFocus(false) }else{ setisFocus(true) }
      onSearch?.(text)
  };

  const handleSelect = (val) => {
    setQuery(val.label);
    setFilteredData([]);
    if (handleChange) handleChange(name)(val.value);
    if (onChange) onChange(val.value);
    setisFocus(false)
    Keyboard.dismiss();
  };

  return (
    <View style={styles.AutoCompleteInputContainer}>
      <View style={[styles.AutoCompleteInputWrapper, isError, style]}>
        {icon}
        <TextInput
          label={title}
          placeholder={placeholder}
          value={values[name]}
          keyboardType={numeric ? "numeric" : numeric}
          onChangeText={handleSearch}
          mode="outlined"
          style={[styles.AutoCompleteInputField,labelStyle]}
          onFocus={()=>{
              setisFocus(true)
          }}
        />
      </View>

      {(isFocus) && (
        <Card style={styles.AutoCompleteInputDropdown}>
          <FlatList
            data={items}
            scrollEnabled={false}
            keyExtractor={(item, index) => item.value + index}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <>
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <Card.Content style={styles.AutoCompleteInputItem}>
                    <Text style={styles.AutoCompleteInputItemText}>{item.label}</Text>
                  </Card.Content>
                </TouchableOpacity>
                <Divider />
              </>
            )}
            ListFooterComponent={() =>
                <>
                {values[name] && items.length === 0 && <>
                  {filteredData.length > 0 && <Divider />}
                  <TouchableOpacity
                    onPress={onClickCreateBtn}>
                    <Card.Content style={styles.AutoCompleteInputItem}>
                      <Text style={styles.AutoCompleteInputCreateText}>
                        + Create "{values[name]}"
                      </Text>
                    </Card.Content>
                  </TouchableOpacity>
                  </>
                  }
                </>
            }
          />
        </Card>
      )}

      {isError.borderColor === 'red' && (
        <Text style={styles.AutoCompleteInputErrorText}>{errors?.[name]}</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 4,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    overflow:"hidden",
    elevation: 2,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  errorBorder: {
    borderWidth: 1.5,
    borderColor: 'red',
  },
  AutoCompleteInputContainer: {
    position: 'relative',
    zIndex: 10,
  },
  AutoCompleteInputWrapper: {
    flexDirection: 'row',
    borderRadius: 10,
  },
  AutoCompleteInputField: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  AutoCompleteInputDropdown: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 9999999,
    elevation: 5,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  AutoCompleteInputItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  AutoCompleteInputItemText: {
    fontSize: 16,
  },
  AutoCompleteInputCreateText: {
    fontWeight: 'bold',
    color: '#6200ee',
    fontSize: 16,
  },
  AutoCompleteInputErrorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 10,
  },
  blankButtonwhiteContainer: {
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
  },
  blankButtonContainer: {
    width: 300,
    height: 46,
    borderRadius: 10,
    backgroundColor: 'rgba(122, 122, 122, 1)',
    justifyContent: 'center',
    alignItems: 'start',
    alignSelf: 'center',
    elevation: 4,
    overflow:"hidden"
  },
  blankButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize:20,
    textAlign:"center",
  },
  loginButtonContainer: {
    width: 355,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#FF3C44',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 4,
  },
  active:{
    backgroundColor:"#FF3C44"
  },
  container: {
    marginVertical: 8,
  },
  uploadBtn: {
    borderRadius: 10,
    elevation: 2,
  },
  addBtn: {
    borderRadius: 100,
    backgroundColor: '#fff',
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progress: {
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    paddingTop: 4,
    paddingLeft: 2,
  },
  errorBorder: {
    borderWidth: 2,
    borderColor: 'red',
  },
});

export {SelectInput,RadioInput,FormSwitch,AutoCompleteInput,FormBtn}
export default FormInput