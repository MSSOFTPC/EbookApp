import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '@/Redux/Store'
import Membership from '@/Components/Membership/Membership'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

const AboutMembershipBtn = () => {
  const { navigate } = useNavigation()
  const { params } = useRoute()
  const { item } = params
  const { user, bookAdvancedSettings } = useSelector((i: RootState) => i.AuthSlice)
  const isMembershipExist = user.membership?.expiredOn
  const membershipref = useRef<BottomSheetModal>(null)

  let currentBookReadData = Object.entries(bookAdvancedSettings)?.find(([key]) => key === item._id)
  const currentPage = currentBookReadData?.[1]?.meta?.currentPage
  const totalPage = currentBookReadData?.[1]?.meta?.totalPage
  const percentage = (currentPage / totalPage) || 0
  const btnText =
    currentBookReadData?.[0] && percentage === 1
      ? "Read Again"
      : currentBookReadData?.[0] && percentage !== 1
      ? "Reading Continue"
      : !currentBookReadData?.[0]
      ? "Read Now"
      : ""

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        style={Styles.wrapper}
        onPress={() => {
          if (!item.isFree && !isMembershipExist) {
            membershipref.current?.present()
            return
          }

          // Agar pdf ho
          if(item?.media?.toLowerCase()?.endsWith('.pdf')){
            navigate("BookReaderPdf", { item })
          }else{
            navigate("BookReader", { item })
          }
        }}
      >

        {/* Paid Book & No Membership => Lock Icon */}
        {!item.isFree && !isMembershipExist && (
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10 }}>
            <FontAwesome5 name="lock" size={20} color="white" />
            <Text style={Styles.wrapperText}>Read Now</Text>
          </View>
        )}

        {/* Free Book OR Paid Book with Membership */}
        {(item.isFree || (!item.isFree && isMembershipExist)) && (
          <Text style={Styles.wrapperText}>
            {item.isFree ? "Read Now" : btnText}
          </Text>
        )}

      </TouchableOpacity>

      <Membership ref={membershipref} />
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  wrapper: {
    position: "absolute",
    width: "100%",
    height: 50,
    backgroundColor: "#f9410a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    bottom: 20
  },
  wrapperText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500"
  }
})

export default AboutMembershipBtn
