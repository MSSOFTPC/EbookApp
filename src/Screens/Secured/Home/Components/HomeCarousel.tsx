import HeadingBar from "@/Components/Global/Heading/HeadingBar";
import { RootState } from "@/Redux/Store";
import { renderItem } from "@/Utils/render-items";
import * as React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { useSelector } from "react-redux";
 
const defaultDataWith6Colors = [
	"#B0604D",
	"#899F9C",
	"#B3C680",
	"#5C6265",
	"#F5D399",
	"#F1F1F1",
];
 
function HomeCarousel() {
	const scrollOffsetValue = useSharedValue<number>(0);
	const {settings} = useSelector((i:RootState)=>i.AuthSlice)
	const {banners} = settings

 
	return (
		<View
			id="carousel-component"
			dataSet={{ kind: "basic-layouts", name: "normal" }}
            style={{padding:20,overflow:"hidden",borderRadius:20}}
		>
			{banners?.length > 0 && (
				<>
			<HeadingBar title={"#SpecialForYou"} />
			<Carousel
				testID={"xxx"}
				loop={true}
				width={Dimensions.get("screen").width-40}
				height={190}
				snapEnabled={true}
				pagingEnabled={true}
				autoPlayInterval={2000}
				data={defaultDataWith6Colors}
				defaultScrollOffsetValue={scrollOffsetValue}
				style={{ width: "100%" }}
				onScrollStart={() => {
					// console.log("Scroll start");
				}}
				onScrollEnd={() => {
					// console.log("Scroll end");
				}}
				onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
					"worklet";
					g.enabled(false);
				}}
				// onSnapToItem={(index: number) => console.log("current index:", index)}
				renderItem={renderItem({ rounded: true })}
			/>
			</>
			)}
		</View>
	);
}
 
export default HomeCarousel;
 