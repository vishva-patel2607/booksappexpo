import React, {  useState, useEffect, useRef } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Platform, StatusBar, RefreshControl,Text } from "react-native";
import { logoutUser } from "../actions";
import Actions from "../Components/Actions";
import Horizontalscrollview from "./Horizontalscrollview";
import { useDispatch, useSelector } from "react-redux";
import BookConditions from "./BookConditions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BAheader from "../Components/BAheader";
import Constants from "expo-constants";
import Newbooks from "../Components/Newbooks";
import * as Notifications from "expo-notifications";
import Alert from "../Components/Alerts";
import {styles} from '../Styles/Homestyles';
const HomeRoute = (props) => {
  const [devicePushToken, setDevicePushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  const [lentbooks, setLentbooks] = useState([]);
  const [borrowedbooks, setBorrowedbooks] = useState([]);
  const [boughtbooks, setBoughtbooks] = useState([]);
  const [pickupbooks, setPickupbooks] = useState([]);
  const [dropoffbooks, setDropoffbooks] = useState([]);
  const [soldbooks, setSoldbooks] = useState([]);
  const [count, setCount] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setCount(count + 1);
  };
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  async function requestPermissionsAsync() {
    return await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
  }

  let lent =
    lentbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={lentbooks}
        pagename="Bookdetail"
        title="LENT"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="Have a bunch of books? You can earn money by lending them to others who can read!" />
    );

  let borrowed =
    borrowedbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={borrowedbooks}
        title="BORROWED"
        pagename="Bookdetail"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="All your borrowed collection is here!" />
    );

  let dropoff =
    dropoffbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={dropoffbooks}
        pagename="Bookdetail"
        title="DROPOFF"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="You haven't yet uploaded or read anything? Then must do it and add them to your dropoffs!" />
    );

  let pickup =
    pickupbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={pickupbooks}
        pagename="Bookdetail"
        title="PICKUP"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="Select your choice of books to read and include them in pickups!" />
    );

  let sold =
    soldbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={soldbooks}
        pagename="Bookdetail"
        title="SOLD"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="Make some money by selling your books!" />
    );

  // let pt =
  //   previoustransactions.length !== 0 ? (
  //     <Horizontalscrollview
  //       booklist={previoustransactions}
  //       pagename="B"
  //       navigation={props.navigation}
  //     />
  //   ) : (
  //     <Newbooks text="Some dummy text" />
  //   );

  let bought =
    boughtbooks.length !== 0 ? (
      <Horizontalscrollview
        booklist={boughtbooks}
        pagename="Bookdetail"
        title="BOUGHT"
        navigation={props.navigation}
      />
    ) : (
      <Newbooks text="Have your own collection in bookshelf!" />
    );

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => checkToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(() => {
        
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const checkToken = async (token) => {
    setDevicePushToken(token);
    try {
      const phonetoken = await AsyncStorage.getItem("@storage_token");
      if (phonetoken !== null) {
        
      } else {
        
        if (token !== undefined && devicePushToken.length !== 0) {
          await AsyncStorage.setItem("@storage_token", token);
          
          fetch("https://booksapp2021.herokuapp.com/Notification/Subscribe", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-access-token": user.token,
            },
            body: JSON.stringify({
              usernumber: user.accountNumber,
              devicepushtoken: devicePushToken,
              platform: Platform.OS,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              if (data.status) {
                setMessage(data.message);
              } else {
                setMessage(data.message);
              }
            });
        }
      }
    } catch (e) {
      
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getDevicePushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Pickups", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        if (data.status) {
          
          setPickupbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch(() => {
        
      });

    setPickupbooks([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Borrowed", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
  
        if (data.status) {
          setBorrowedbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch(() => {
        
      });

    setBorrowedbooks([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Sold", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        if (data.status) {
          setSoldbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch(() => {
        
      });

    setSoldbooks([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Bought", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          setBoughtbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch(() => {
        
      });

    setBoughtbooks([]);
    setRefreshing(false);
  }, [count]);

  useEffect(() => {
    fetch("https://booksapp2021.herokuapp.com/Book/Lent", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          setLentbooks(data.response.books);
          
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch(() => {
        
      });

    setLentbooks([]);
    setRefreshing(false);
  }, [count]);

  // useEffect(() => {
  //   fetch("https://booksapp2021.herokuapp.com/Book/Previoustransactions", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "x-access-token": user.token,
  //     },
  //     body: null,
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.status) {
  //         setPrevioustransactions(data.response.books);
  //         
  //       } else {
  //         if (data.message === "Could not verify") {
  //           dispatch(logoutUser());
  //         } else {
  //           
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       
  //     });

  //   setPrevioustransactions([]);
  //   setRefreshing(false);
  // }, [count]);

  useEffect(() => {
    
    fetch("https://booksapp2021.herokuapp.com/Book/Dropoffs", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          
          setDropoffbooks(data.response.books);
        } else {
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          } else {
            
          }
        }
      })
      .catch(() => {
        
      });

    setDropoffbooks([]);
    setRefreshing(false);
  }, [count]);
  let countalert=0;
  useEffect(() => {
    
    fetch("https://booksapp2021.herokuapp.com/Book/Alerts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: null,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        if (data.status) {
          countalert=data.response.books.length;
        } else {
          countalert=0;
          if (data.message === "Could not verify") {
            dispatch(logoutUser());
          }
        }
      })
      .catch(() => {
        
      });
  }, [count]);


  useEffect(() => {
    
    setRefreshing(props.route.params?.refreshing);
    setCount(count + 1);
  }, [props.route.params?.refreshing]);
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <BAheader />
        <BookConditions />
        <Alert />
        
        <Actions text="DROPOFFS" length={dropoffbooks.length} />
        <View style={styles.cardview}>{dropoff}</View>
        <Actions text="PICKUPS" length={pickupbooks.length} />
        <View style={styles.cardview}>{pickup}</View>
        <Actions text="LENT" length={lentbooks.length} />
        <View style={styles.cardview}>{lent}</View>
        <Actions text="BORROWED" length={borrowedbooks.length} />
        <View style={styles.cardview}>{borrowed}</View>
        <Actions text="SOLD" length={soldbooks.length} />
        <View style={styles.cardview}>{sold}</View>
        {/* <Actions
          text="PREVIOUS TRANSACTIONS"
          length={previoustransactions.length}
        />
        <View style={styles.cardview}>{pt}</View> */}
        <Actions text="BOUGHT" length={boughtbooks.length} />
        <View style={styles.cardview}>{bought}</View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default React.memo(HomeRoute);
