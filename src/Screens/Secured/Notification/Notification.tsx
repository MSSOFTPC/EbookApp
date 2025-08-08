import TopBar from '@/Components/TopBar';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, PanResponder, Image } from 'react-native';

const NotificationScreen = () => {
    const {navigate} = useNavigation()
    const [notifications, setNotifications] = React.useState([
        {
            id: '1',
            title: 'New Update Available',
            message: 'Version 2.5.0 is now available with exciting new features',
            time: '10 minutes ago',
            read: false,
            icon: '🔄',
            type: 'system'
        },
        {
            id: '2',
            title: 'Order Confirmed',
            message: 'Your order #ORD-78945 has been placed successfully',
            time: '1 hour ago',
            read: true,
            icon: '✅',
            type: 'order'
        },
        {
            id: '3',
            title: 'Delivery Update',
            message: 'Your package will arrive today between 2-4 PM',
            time: '3 hours ago',
            read: false,
            icon: '🚚',
            type: 'delivery'
        },
        {
            id: '4',
            title: 'Special Offer!',
            message: 'Flash sale - Get 50% off on all electronics today only',
            time: 'Yesterday',
            read: true,
            icon: '🎁',
            type: 'promo'
        },
    ]);

    const markAsRead = (id) => {
        setNotifications(notifications.map(item => 
            item.id === id ? {...item, read: true} : item
        ));
    };

    const removeNotification = (id) => {
        setNotifications(notifications.filter(item => item.id !== id));
    };

    const renderItem = ({ item }) => (
        <SwipeableNotification 
            item={item} 
            onPress={() => markAsRead(item.id)}
            onRemove={() => removeNotification(item.id)}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigate("Home")} style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:10}}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                    <Text style={styles.headerTitle}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setNotifications([])}>
                    <Text style={styles.clearAll}>Clear All</Text>
                </TouchableOpacity>
            </View>
            
            <FlatList
                data={[] || notifications}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        {/* <Image 
                            source={require('@/assets/images/empty-notifications.png')} 
                            style={styles.emptyImage}
                        /> */}
                        <Text style={styles.emptyTitle}>No notifications yet</Text>
                        <Text style={styles.emptySubtitle}>We'll notify you when something arrives</Text>
                    </View>
                }
            />
        </View>
    );
};

const SwipeableNotification = ({ item, onPress, onRemove }) => {
    const pan = React.useRef(new Animated.ValueXY()).current;

    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dx < -150) {
                    Animated.timing(pan, {
                        toValue: { x: -500, y: 0 },
                        duration: 200,
                        useNativeDriver: false
                    }).start(() => onRemove());
                } else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false
                    }).start();
                }
            }
        })
    ).current;

    const getNotificationStyle = (type) => {
        switch(type) {
            case 'order': return styles.orderNotification;
            case 'delivery': return styles.deliveryNotification;
            case 'promo': return styles.promoNotification;
            default: return styles.systemNotification;
        }
    };

    return (
        <Animated.View
            style={[styles.notificationContainer, { transform: [{ translateX: pan.x }] }]}
            {...panResponder.panHandlers}
        >
            <TouchableOpacity 
                style={[styles.notificationItem, !item.read && styles.unreadNotification, getNotificationStyle(item.type)]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                <View style={[styles.iconContainer, styles[`${item.type}Icon`]]}>
                    <Text style={styles.iconText}>{item.icon}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.notificationHeader}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                    <Text style={styles.message}>{item.message}</Text>
                </View>
                {!item.read && <View style={styles.unreadIndicator} />}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f87751',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    clearAll: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    listContainer: {
        paddingBottom: 20,
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    notificationItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 6,
        marginHorizontal: 12,
        borderRadius: 12,
        elevation: 2,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    unreadNotification: {
        borderLeftWidth: 4,
        borderLeftColor: '#f87751',
    },
    notificationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    systemIcon: {
        backgroundColor: '#e3f2fd',
    },
    orderIcon: {
        backgroundColor: '#e8f5e9',
    },
    deliveryIcon: {
        backgroundColor: '#fff8e1',
    },
    promoIcon: {
        backgroundColor: '#fce4ec',
    },
    iconText: {
        fontSize: 24,
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3436',
        flex: 1,
    },
    message: {
        fontSize: 14,
        color: '#636e72',
        lineHeight: 20,
    },
    time: {
        fontSize: 12,
        color: '#b2bec3',
        fontWeight: '500',
    },
    unreadIndicator: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#f87751',
    },
    deleteBackground: {
        position: 'absolute',
        right: 0,
        width: 80,
        height: '100%',
        backgroundColor: '#ff6b6b',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 6,
        marginRight: 12,
        borderRadius: 12,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3436',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#636e72',
        textAlign: 'center',
    },
    // Notification type specific styles
    systemNotification: {
        borderLeftColor: '#64b5f6',
    },
    orderNotification: {
        borderLeftColor: '#81c784',
    },
    deliveryNotification: {
        borderLeftColor: '#ffd54f',
    },
    promoNotification: {
        borderLeftColor: '#f06292',
    },
});

export default NotificationScreen;