import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  StatusBar
} from "react-native";

import {
  Title,
  Text,
  Button,
  TextInput,
} from "react-native-paper";
import { Path, Svg } from "react-native-svg";

const URL = `https://booksapp2021.herokuapp.com/`;

const PhonenumberVerification = (props) => {
  const { setTheme, Theme } = React.useContext(ThemeContext);
  const { usernumber, phonenumber } = props.route.params;

  const [otp, setOTP] = useState({ s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, s6: 0 });
  const [newphonenumber, setNewPhonenumber] = useState(phonenumber || null);
  const [showOTPButton, setShowOTPButton] = useState(false);
  const [loading, setLoading] = useState(false);

  let otpArray = [];
  const smsRef = useRef([]);

  const sendOTP = async () => {
    console.log("Send OTP", usernumber, newphonenumber);
    try {
      setLoading(true);
      const response = await fetch(
        `${URL}User/Verify/Phonenumber/${usernumber}/${newphonenumber}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      let jsonData = await response.json();
      console.log(jsonData);

      setLoading(false);
      alert(jsonData.message);
    } catch (e) {
      console.log(e);
    }
  };

  const verifyOTP = async () => {
    console.log("Verify OTP", usernumber, newphonenumber, otp);
    try {
      const response = await fetch(
        `${URL}/User/Verify/Phonenumber/${usernumber}/${newphonenumber}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usernumber,
            phonenumber: newphonenumber,
            otp,
          }),
        }
      );


      const jsonData = await response.json();
      setLoading(false);

      if (jsonData.status === true) {
        alert("Your phone number has been verified!");
        // redirect it to home page
        // props.navigation.navigate("Mainpage");
      } else {
        alert(jsonData.message);
        setShowOTPButton(!showOTPButton);
        setOTP(null);
      }
    } catch (e) {
      console.log("Error encountered : ", e);
    }
  };

  return (
    <ScrollView style={styles.main}>
      <SafeAreaView style={{flex:1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10: 0}}>
        <View style={styles.logo}>
          <BooksappLogo />
        </View>

        <View>
          <Title style={styles.title}>
            We have sent the code verification on {"\n"}your phone number
          </Title>
          <View style={styles.otpInput}>
            <TextInput
              style={styles.inputtextbox}
              underlineColor="transparent"
              keyboardType="number-pad"
              maxLength={1}
              ref={(element) => {
                smsRef.current[1] = element;
              }}
              onChangeText={(text) => {
                if (!text) smsRef.current[1].focus();
                else {
                  smsRef.current[2].focus();
                  setOTP({ ...otp, s1: text });
                }
              }}
            />
            <TextInput
              style={styles.inputtextbox}
              underlineColor="transparent"
              keyboardType="number-pad"
              maxLength={1}
              ref={(element) => {
                smsRef.current[2] = element;
              }}
              onChangeText={(text) => {
                if (!text) smsRef.current[1].focus();
                else {
                  smsRef.current[3].focus();
                  setOTP({ ...otp, s2: text });
                }
              }}
            />
            <TextInput
              style={styles.inputtextbox}
              underlineColor="transparent"
              keyboardType="number-pad"
              maxLength={1}
              ref={(element) => {
                smsRef.current[3] = element;
              }}
              onChangeText={(text) => {
                if (!text) smsRef.current[2].focus();
                else {
                  smsRef.current[4].focus();
                  otpArray[2] = text;
                  setOTP({ ...otp, s3: text });
                }
              }}
            />
            <TextInput
              style={styles.inputtextbox}
              underlineColor="transparent"
              keyboardType="number-pad"
              maxLength={1}
              ref={(element) => {
                smsRef.current[4] = element;
              }}
              onChangeText={(text) => {
                if (!text) smsRef.current[3].focus();
                else {
                  smsRef.current[5].focus();
                  otpArray[3] = text;
                  setOTP({ ...otp, s4: text });
                }
              }}
            />
            <TextInput
              style={styles.inputtextbox}
              underlineColor="transparent"
              keyboardType="number-pad"
              maxLength={1}
              ref={(element) => {
                smsRef.current[5] = element;
              }}
              onChangeText={(text) => {
                if (!text) smsRef.current[4].focus();
                else {
                  smsRef.current[6].focus();
                  otpArray[4] = text;
                  setOTP({ ...otp, s5: text });
                }
              }}
            />
            <TextInput
              style={styles.inputtextbox}
              underlineColor="transparent"
              keyboardType="number-pad"
              maxLength={1}
              ref={(element) => {
                smsRef.current[6] = element;
              }}
              onChangeText={(text) => {
                if (!text) smsRef.current[5].focus();
                else {
                  smsRef.current[6].focus();
                  otpArray[5] = text;
                  setOTP({ ...otp, s6: text });
                }
              }}
            />
          </View>
          <View style={styles.text}>
            <Text style={styles.textTitle}>Want to change Phone Number</Text>
          </View>

          <View style={styles.buttonView}>
            <Button
              color="#ffffff"
              style={styles.button}
              disabled={loading || !otp}
              onPress={() => {
                setOTP(Object.values(otp).join(""));
                verifyOTP();
              }}
            >
              Enter
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const BooksappLogo = () => {
  return (
    <View style={styles.logosvg}>
      <Svg
        width="150"
        height="39"
        viewBox="0 0 150 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M0.625 2.87721C3.5 2.62548 6.125 2.62549 8.25 2.62549C14.375 2.62549 17.5 4.76517 17.5 8.91866C17.5 10.429 17 11.8135 16.125 12.9463C15.25 14.0791 13.75 14.8342 11.75 15.2118C13.625 15.4636 15.125 15.967 16.25 16.9739C17.375 17.855 17.875 19.4912 17.875 21.8826C17.875 26.7912 14.75 29.1827 8.625 29.1827H0.625V2.87721ZM8.25 2.87721C6.75 2.87721 5.25 3.00308 3.625 3.12894V14.9601H9.125C12.625 14.8342 14.375 12.8204 14.375 8.79279C14.375 6.90484 13.875 5.39448 12.75 4.38758C12 3.38067 10.375 2.87721 8.25 2.87721ZM3.75 28.5533H8.75C11 28.5533 12.5 27.924 13.5 26.7913C14.5 25.6585 14.875 23.7705 14.875 21.3791C14.875 18.9877 14.375 17.3515 13.5 16.5963C12.625 15.8411 11.125 15.3377 9.25 15.3377H3.75V28.5533Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M29.75 29.1825C27.125 29.1825 25 28.4273 23.375 26.917C21.75 25.4066 20.875 23.1411 20.875 19.9945C20.875 16.8479 21.75 14.4565 23.5 12.6944C25.25 10.9323 27.375 10.0513 30 10.0513C32.625 10.0513 34.75 10.8064 36.375 12.3168C38 13.8272 38.875 16.0927 38.875 19.2393C38.875 22.3859 38 24.7773 36.25 26.5394C34.625 28.3015 32.375 29.1825 29.75 29.1825ZM30 10.303C28.125 10.303 26.5 11.184 25.25 12.8203C24 14.4565 23.375 16.8479 23.375 19.8686C23.375 22.8893 24 25.1549 25.125 26.6652C26.25 28.1756 27.75 28.8049 29.75 28.8049C31.625 28.8049 33.25 27.9239 34.5 26.2876C35.75 24.5256 36.375 22.26 36.375 19.2393C36.375 16.2186 35.75 13.953 34.625 12.4427C33.5 10.9323 31.875 10.303 30 10.303Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M50.75 29.1825C48.125 29.1825 46 28.4273 44.375 26.917C42.75 25.4066 41.875 23.1411 41.875 19.9945C41.875 16.8479 42.75 14.4565 44.5 12.6944C46.25 10.9323 48.375 10.0513 51 10.0513C53.625 10.0513 55.75 10.8064 57.375 12.3168C59 13.8272 59.875 16.0927 59.875 19.2393C59.875 22.3859 59 24.7773 57.25 26.5394C55.625 28.3015 53.375 29.1825 50.75 29.1825ZM51 10.303C49.125 10.303 47.5 11.184 46.25 12.8203C45 14.4565 44.375 16.8479 44.375 19.8686C44.375 22.8893 45 25.1549 46.125 26.6652C47.25 28.1756 48.75 28.8049 50.75 28.8049C52.625 28.8049 54.25 27.9239 55.5 26.2876C56.75 24.5256 57.375 22.26 57.375 19.2393C57.375 16.2186 56.75 13.953 55.625 12.4427C54.5 10.9323 52.875 10.303 51 10.303Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M65.125 0.611572V19.3652L73.375 10.0513H73.75L67.625 16.9738L75.75 28.9308H73.125L66.25 18.61L65.25 19.7428V28.8049H62.5V0.611572H65.125Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M89.125 11.4359C88.75 11.0583 88.125 10.8066 87.25 10.5549C86.375 10.3031 85.75 10.1773 85.25 10.1773C84.75 10.1773 84.5 10.1773 84.5 10.1773C83.125 10.1773 82.125 10.5549 81.625 11.1842C81 11.8135 80.75 12.5687 80.75 13.4497C80.75 14.3308 81 14.9601 81.5 15.5894C82 16.2187 82.625 16.5963 83.5 16.848C84.25 17.2256 85.125 17.4773 86 17.9808C86.875 18.3584 87.75 18.736 88.5 19.2394C89.25 19.617 90 20.2463 90.5 21.0015C91 21.7567 91.25 22.7636 91.25 24.0222C91.25 25.155 90.875 26.1619 90 27.043C89.125 27.924 88.25 28.4275 87.25 28.6792C86.25 28.9309 85.125 29.0568 84 29.0568C81.5 29.0568 79.5 28.4275 78.25 27.4205L78.5 27.1688C79 27.6723 79.75 28.0499 80.75 28.3016C81.75 28.5533 82.75 28.805 83.625 28.805C85.125 28.805 86.375 28.4275 87.25 27.5464C88.25 26.7912 88.75 25.6585 88.75 24.5257C88.75 23.3929 88.375 22.2602 87.625 21.6308C86.875 20.8757 86 20.3722 85 19.8687C84 19.3653 82.875 18.9877 81.875 18.6101C80.875 18.2325 80 17.6032 79.25 16.848C78.5 16.0928 78.125 15.2118 78.125 14.2049C78.125 13.198 78.375 12.4428 78.75 11.8135C79.25 11.1842 79.75 10.8066 80.5 10.5549C81.75 10.1773 83 9.92554 84.375 9.92554C86.5 9.92554 88.25 10.3031 89.375 11.1842L89.125 11.4359Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M109.5 28.9308C107.75 28.9308 106.625 28.5532 106 27.9239C105.375 27.4204 105.125 26.917 105.125 26.5394V25.7842C103.875 28.0497 102 29.1825 99.25 29.1825C96.125 29.1825 94.25 27.798 93.875 24.9032C93.875 24.6514 93.75 24.2738 93.75 24.0221C93.75 23.7704 93.75 23.3928 93.875 23.0152C94 22.6376 94.25 22.26 94.75 21.7566C95.75 20.8755 97.75 20.2462 101 20.1203C101.75 19.9945 102.5 19.9945 103.25 19.9945C104 19.9945 104.5 19.9945 105.125 20.1203V13.8272C105.125 13.8272 105.125 13.7013 105.125 13.4496C105.125 13.1979 105.125 12.9461 105 12.5685C104.875 12.1909 104.625 11.9392 104.5 11.5616C104.25 11.184 103.875 10.9323 103.25 10.6806C102.625 10.4289 101.875 10.303 101 10.303C100.125 10.303 99 10.4289 97.75 10.8064C96.5 11.184 95.625 11.4358 95 11.8134L94.875 11.5616C97.125 10.5547 99.375 10.0513 101.625 10.0513C104.25 10.0513 105.875 10.5547 106.75 11.4358C107.375 12.1909 107.75 12.9461 107.75 13.7013V26.2876C107.75 27.0428 107.875 27.5463 108.125 27.9239C108.375 28.3015 108.75 28.5532 109 28.5532L109.375 28.6791H110.5V28.9308H109.5ZM99.75 28.8049C101.125 28.8049 102.25 28.3015 103.375 27.4204C104.375 26.5394 105 25.6583 105.125 24.7773V20.2462C104.5 20.2462 103.75 20.1203 103.125 20.1203C102.5 20.1203 101.75 20.1203 101.125 20.2462C99.25 20.4979 98 20.8755 97.375 21.5048C96.75 22.1342 96.5 23.0152 96.5 24.148C96.5 24.3997 96.5 24.5256 96.5 24.7773C96.75 27.5463 97.75 28.8049 99.75 28.8049Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M113 10.0514H115.625V14.7083C116 13.5756 116.875 12.4428 118 11.4359C119.125 10.429 120.5 9.92554 121.875 9.92554C127 9.92554 129.5 12.9463 129.5 18.8618C129.5 25.6585 126.25 29.0568 119.625 29.0568C118.5 29.0568 117.125 28.805 115.625 28.1757V38.2448H113V10.0514ZM121.875 10.3031C120.375 10.3031 118.875 10.9324 117.625 12.3169C116.375 13.7014 115.75 14.8342 115.625 15.967V28.0499C117.125 28.6792 118.5 28.9309 119.625 28.9309C124.5 28.9309 126.875 25.6585 126.875 18.9877C126.875 13.198 125.25 10.3031 121.875 10.3031Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
        <Path
          d="M132.875 10.0514H135.5V14.7083C135.875 13.5756 136.75 12.4428 137.875 11.4359C139 10.429 140.375 9.92554 141.75 9.92554C146.875 9.92554 149.375 12.9463 149.375 18.8618C149.375 25.6585 146.125 29.0568 139.5 29.0568C138.375 29.0568 137 28.805 135.5 28.1757V38.2448H132.875V10.0514ZM141.75 10.3031C140.25 10.3031 138.75 10.9324 137.5 12.3169C136.25 13.7014 135.625 14.8342 135.5 15.967V28.0499C137 28.6792 138.375 28.9309 139.5 28.9309C144.375 28.9309 146.75 25.6585 146.75 18.9877C146.75 13.198 145.125 10.3031 141.75 10.3031Z"
          fill="#0D1935"
          stroke="#0D1935"
          stroke-miterlimit="10"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
  },
  logo: {
    alignItems: "center",
    marginVertical: 50,
  },
  logosvg: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 30,
    lineHeight: 20,
  },
  otpInput: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  inputtextbox: {
    width: 35,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    height: 35,
  },
  text: {
    marginVertical: 100,
  },
  textTitle: {
    textAlign: "center",
    color: "#E96A59",
    fontWeight: "700",
  },
  buttonView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  button: {
    backgroundColor: "#E96A59",
    fontWeight: "700",
    width: 200,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 120,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  loading: {
    marginHorizontal: 10,
    fontSize: 15,
    textAlign: "center",
    color: "red",
  },
});

export default PhonenumberVerification;
