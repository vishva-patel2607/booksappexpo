import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Alert,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { styles } from "../Styles/signupstyles";
import Backbutton from "../Components/Backbutton";
import RenderButton from "../Components/Button";
import Error from "../Components/Error";
import StaticBooksApp from "../Components/StaticBooksApp";
import { TextInput } from "react-native-paper";
import UserIcon from "../Svg/User";
import PhoneIcon from "../Svg/Phone";
import { monthswiththirtyone } from "../Components/Checks";

const Signup = (props) => {
  const { colors } = useTheme();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading,setloading] = useState("");
  const [error, setError] = useState("");
  const { email, username, password } = props.route.params;
  

  useEffect(() => {
    let unmounted = false;
    setTimeout(() => {
      if (!unmounted) {
        setError("");
      }
    }, 3000);
    return () => {
      unmounted = true;
    };
  }, [error]);

  const ref_day = useRef();
  const ref_month = useRef();
  const ref_year = useRef();

  const SignUpRequest = () => {
   
    if (
      firstname.length === 0 ||
      lastname.length === 0 ||
      phoneNumber.length === 0
    ) {
      alert("Please enter all the details");
      return;
    } else if (!/^\d+$/.test(phoneNumber)) {
      alert("Check your Phonenumber");
      return;
    } else if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
      alert("Enter valid date");
      return;
    } else {
      setloading(true);
      fetch("https://booksapp2021.herokuapp.com/User/Signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          username: username.trim().toLowerCase(),
          email: email.trim().toLowerCase(),
          firstname: firstname,
          lastname: lastname,
          year: year,
          month: month,
          day: day,
          phonenumber: phoneNumber,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setloading(false);
          if (data.status) {
            
            Alert.alert(
              "Verification email has been sent to your email",
              "Please Verify."[
                {
                  text: "OK",
                }
              ]
            );
          } else {
            setError(data.message);
          }

          props.navigation.navigate("PhonenumberVerification", {
            usernumber: data.response.user.usernumber,
            phonenumber: data.response.user.phonenumber,
          });
        })
        .catch((error) => {
          
        });
    }
  };

  const handleChangeDay = (value) => {
    if((/^\d+$/.test(value) || value == "") && value <=28){
    setDay(value);
    }
    else if ((value>29 && month=='02') || (value>31) || (value==31 &&  monthswiththirtyone.includes(month) === false)){
      setError('Enter a valid date')
    }
   else{
     setDay(value);
   }
  }

  const handleChangeMonth = (value) => {
    if ((/^\d+$/.test(value) || value == "") && value <= 12) {
      setMonth(value);
      if (value.length === 2) {
        ref_day.current.focus();
      }
    }
  };

  const handleChangeYear = (value) => {
    if (/^\d+$/.test(value) || value == "") {
      setYear(value);
      if (value.length === 2) {
        ref_year.current.focus();
      }
    }
  };
  return (
    <SafeAreaView style={styles.loginlayout}>
      
      <View style={{ flex: 1, alignSelf: "flex-start", marginLeft: 10 }}>
        <Pressable onPress={() => props.navigation.navigate("InitialSignup")}>
          <Backbutton />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      >
        
        <View
          style={{
            flex: 2,
            marginTop: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StaticBooksApp />
        </View>

        <View
          style={{
            flex: 15,
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: 11,
          }}
        >
          <View
            style={{
              height: 59,
              overflow: "hidden",
            }}
          >
            <TextInput
              style={styles.inputtextbox}
              theme={{
                colors: {
                  primary: colors.background,
                  placeholder: "#8e8e8e",
                },
                roundness: 120,
              }}
              // theme={{ colors: { primary: "transparent" } }}
              placeholder="FirstName"
              value={firstname}
              onChangeText={(text) => setFirstname(text)}
              autoCapitalize="none"
              autoCompleteType="username"
              autoCorrect={false}
              underlineColor="transparent"
              maxLength={20}
              left={<TextInput.Icon name={() => <UserIcon />} />}
            />
          </View>
          <View
            style={{
              height: 59,
              overflow: "hidden",
            }}
          >
            <TextInput
              style={styles.inputtextbox}
              theme={{
                colors: {
                  primary: colors.background,
                  placeholder: "#8e8e8e",
                },
                roundness: 120,
              }}
              // theme={{ colors: { primary: "transparent" } }}
              placeholder="Lastname"
              value={lastname}
              onChangeText={(text) => setLastname(text)}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColor="transparent"
              maxLength={20}
              left={<TextInput.Icon name={() => <UserIcon />} />}
            />
          </View>
          <View
            style={{
              height: 59,
              overflow: "hidden",
            }}
          >
            <TextInput
              style={styles.inputtextbox}
              theme={{
                colors: {
                  primary: colors.background,
                  placeholder: "#8e8e8e",
                },
                roundness: 120,
              }}
              // theme={{ colors: { primary: "transparent" } }}
              placeholder="Phonenumber"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              autoCapitalize="none"
              autoCompleteType="username"
              
              autoCorrect={false}
              underlineColor="transparent"
              keyboardType="number-pad"
              maxLength={20}
              left={<TextInput.Icon name={() => <PhoneIcon />} />}
            />
          </View>
          <View style={{ overflow: "hidden", overflow: "hidden" }}>
            <View style={{ flexDirection: "row", marginTop: 11 }}>
              <TextInput
                style={styles.datetextbox}
                theme={{
                  colors: {
                    primary: colors.background,
                    placeholder: "#8e8e8e",
                  },
                  roundness: 120,
                }}
                underlineColor="transparent"
                placeholder="MM"
                
                value={month}
                onChangeText={(text) => handleChangeMonth(text)}
                autoCorrect={false}
                maxLength={2}
                // left={<TextInput.Icon name="calendar-month" />}
                ref={ref_month}
                keyboardType="number-pad"
              />

              <TextInput
                style={styles.datetextbox}
                theme={{
                  colors: {
                    primary: colors.background,
                    placeholder: "#8e8e8e",
                  },
                  roundness: 120,
                }}
                placeholder="DD"
                
                value={day}
                onChangeText={(text) => handleChangeDay(text)}
                autoCorrect={false}
                maxLength={2}
                underlineColor="transparent"
                // left={<TextInput.Icon name="calendar-today" />}
                ref={ref_day}
                keyboardType="number-pad"
              />

              <TextInput
                style={styles.yeartextbox}
                placeholder="YYYY"
                underlineColor="#ECEFEE"
                theme={{
                  colors: {
                    primary: colors.background,
                    placeholder: "#8e8e8e",
                  },
                  roundness: 120,
                }}
                value={year}
                
                onChangeText={(text) => handleChangeYear(text)}
                autoCorrect={false}
                maxLength={4}
                // left={<TextInput.Icon name="calendar-blank" />}
                ref={ref_year}
                keyboardType="number-pad"
              />
            </View>

            <View style={{ alignSelf: "center" }}>
              {error !== "" && (
                <View style={{ marginTop: 30 }}>
                  <Error text={error} />
                </View>
              )}
            </View>
          </View>
        </View>

        <View
          behaviour="position"
          style={{
            flex: 4,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <RenderButton title="SignUp" Click={SignUpRequest} />
        </View>
        <View style={{ marginTop: 10 }}></View>
      </KeyboardAvoidingView>
      
    </SafeAreaView>
  );
};

export default React.memo(Signup);
