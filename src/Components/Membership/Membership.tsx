import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import BottomSheetBody from '../Bottomsheet/BottomSheetBody';
import Bottomsheet from '../Bottomsheet/Bottomsheet';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import MembershipQRSubmit from './MembershipQRSubmit';

const Membership = React.forwardRef((props, ref) => {
  const { settings } = useSelector((i: RootState) => i.AuthSlice);
  const [QRSubmitScreen, setQRSubmitScreen] = useState(false);
  const [selected, setSelected] = useState({price:0,type:"sixmonth",duration:0});

  const [timeLeft, setTimeLeft] = useState(getRemainingTime());


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [settings?.Membership?.expiringOffer]);

  function getRemainingTime() {
    const now = new Date().getTime();
    const offerEnd = new Date(settings?.Membership?.expiringOffer).getTime();

    const remaining = offerEnd - now;

    if (remaining <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  const price = settings?.Membership?.SixMonth;
  const regularPrice = settings?.Membership?.regularSixMonthPrice;
  const YearlyPrice = settings?.Membership?.Yearly;
  const regularYearlyPrice = settings?.Membership?.regularYearlyPrice;

  const discountSixPercentage = ((regularPrice - price) / regularPrice) * 100;
  const discountYearPercentage = ((regularYearlyPrice - YearlyPrice) / regularYearlyPrice) * 100;


  return (
    <Bottomsheet ref={ref}  style={{ height: 600 }} snapPoints={['60%',"80%"]}>
      <BottomSheetBody>
        {QRSubmitScreen ? (
          <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
            <MembershipQRSubmit selected={selected} onClose={()=>ref.current?.dismiss()} onCancel={()=>setQRSubmitScreen(false)} />
          </Animated.View>
        ) : (
          <Animated.View style={{justifyContent:"center",alignItems:"center"}} entering={FadeInRight} exiting={FadeOutLeft}>
            {(settings?.Membership?.expiringOffer && timeLeft.days > 0) && (
              <View style={styles.offerBanner}>
                <AntDesign name="clockcircleo" size={16} color="#fff" />
                <Text style={styles.offerText}>
                  Offer Ends In: {String(timeLeft.days).padStart(2, '0')}D : {String(timeLeft.hours).padStart(2, '0')}H : {String(timeLeft.minutes).padStart(2, '0')}M : {String(timeLeft.seconds).padStart(2, '0')}S
                </Text>
              </View>
            )}

            <Text style={styles.title}>🔥 Go Premium</Text>
            <Text style={styles.subtitle}>Access unlimited books & exclusive features</Text>

            <View style={styles.featuresBox}>
              {["All Books Unlocked", "Ad-Free Experience", "Priority Support"].map((item, i) => (
                <View key={i} style={styles.featureItem}>
                  <Entypo name="check" size={16} color="#4caf50" />
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.plansWrapper}>
              <TouchableOpacity activeOpacity={0.8} style={[styles.planCard, styles.gradient6]} onPress={() => {setQRSubmitScreen(true); setSelected({price,type:"sixmonth",duration:274})}}>
                <FontAwesome5 name="fire" size={22} color="white" />
                <View>
                  <Text style={styles.planTitle}>9 Months</Text>
                  <Text style={styles.planSubtitle}>₹{settings?.Membership?.SixMonth} - Save {Math.ceil(discountSixPercentage)}%</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={[styles.planCard, styles.gradient1y]} onPress={() => {setQRSubmitScreen(true); setSelected({price:YearlyPrice,type:"yearly",duration:360})}}>
                <View style={styles.popularTag}>
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
                <FontAwesome5 name="crown" size={22} color="white" />
                <View>
                  <Text style={styles.planTitle}>1 Year</Text>
                  <Text style={styles.planSubtitle}>₹{settings?.Membership?.Yearly} - {discountYearPercentage > 0 ? `Save ${Math.ceil(discountYearPercentage)}%` : "Best Value"}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </BottomSheetBody>
    </Bottomsheet>
  );
});

export default Membership;


const styles = StyleSheet.create({
  offerBanner: {
    marginTop:20,
    flexDirection: 'row',
    backgroundColor: '#f87751',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 15,
  },
  offerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    marginTop:20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3e3e3e',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#777',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresBox: {
    marginBottom: 25,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#444',
  },
  plansWrapper: {
    gap: 20,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 18,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  gradient6: {
    backgroundColor: '#f87751',
  },
  gradient1y: {
    backgroundColor: '#ff5e5b',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  planSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  popularTag: {
    position: 'absolute',
    top: 0,
    right: -3,
    backgroundColor: '#ffc107',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 1,
  },
  popularText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
