import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { ThemeContext } from "./Theme";
import Svg, { Path } from "react-native-svg";

export default function BooksApp() {
  const { setTheme, Theme } = React.useContext(ThemeContext);
  return (
    <View style={{ marginLeft: 25,marginTop:14 }}>
      {Theme === "Light" ? (
        <Svg
          width="90"
          height="23"
          viewBox="0 0 90 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M0.375 1.63203C2.1 1.55784 3.675 1.48364 4.95 1.48364C8.625 1.48364 10.5 2.74493 10.5 5.19332C10.5 6.08364 10.2 6.89977 9.675 7.56751C9.15 8.23525 8.25 8.68042 7.05 8.903C8.175 9.05138 9.075 9.34816 9.75 9.94171C10.425 10.4611 10.725 11.4256 10.725 12.8353C10.8 15.6546 9 17.0643 5.25 17.0643H0.375V1.63203ZM4.95 1.70622C4.125 1.70622 3.225 1.78042 2.25 1.85461V8.8288H5.55C7.65 8.75461 8.7 7.56751 8.7 5.19332C8.7 4.08042 8.4 3.19009 7.725 2.59655C7.2 2.003 6.225 1.70622 4.95 1.70622ZM2.25 16.8417H5.25C6.6 16.8417 7.5 16.4707 8.1 15.803C8.7 15.1353 9 14.0965 9 12.6127C9 11.1288 8.7 10.2385 8.175 9.79332C7.65 9.34816 6.75 9.05138 5.625 9.05138H2.25V16.8417Z"
            fill="#0D1935"
            stroke="#0D1935"
            stroke-miterlimit="10"
          />
          <Path
            d="M17.85 17.1385C16.275 17.1385 15 16.6933 14.025 15.803C13.05 14.9127 12.525 13.5772 12.525 11.7224C12.525 9.86754 13.05 8.45786 14.1 7.41915C15.15 6.38044 16.425 5.86108 18 5.86108C19.575 5.86108 20.85 6.30625 21.825 7.19657C22.8 8.08689 23.325 9.42237 23.325 11.2772C23.325 13.1321 22.8 14.6159 21.75 15.5804C20.775 16.6191 19.425 17.1385 17.85 17.1385ZM18 6.00947C16.875 6.00947 15.9 6.52883 15.15 7.49334C14.4 8.45786 14.025 9.86754 14.025 11.6482C14.025 13.4288 14.4 14.7643 15.075 15.6546C15.75 16.545 16.65 16.9159 17.85 16.9159C18.975 16.9159 19.95 16.3966 20.7 15.4321C21.45 14.3933 21.825 13.0579 21.825 11.2772C21.825 9.49657 21.45 8.16108 20.775 7.27076C20.1 6.45463 19.125 6.00947 18 6.00947Z"
            fill="#0D1935"
            stroke="#0D1935"
            stroke-miterlimit="10"
          />
          <Path
            d="M30.45 17.1385C28.875 17.1385 27.6 16.6933 26.625 15.803C25.65 14.9127 25.125 13.5772 25.125 11.7224C25.125 9.86754 25.65 8.45786 26.7 7.41915C27.75 6.38044 29.025 5.86108 30.6 5.86108C32.175 5.86108 33.45 6.30625 34.425 7.19657C35.4 8.08689 35.925 9.42237 35.925 11.2772C35.925 13.1321 35.4 14.5417 34.35 15.5804C33.375 16.6191 32.025 17.1385 30.45 17.1385ZM30.6 6.00947C29.475 6.00947 28.5 6.52883 27.75 7.49334C27 8.45786 26.625 9.86754 26.625 11.6482C26.625 13.4288 27 14.7643 27.675 15.6546C28.35 16.545 29.25 16.9159 30.45 16.9159C31.575 16.9159 32.55 16.3966 33.3 15.4321C34.05 14.3933 34.425 13.0579 34.425 11.2772C34.425 9.49657 34.05 8.16108 33.375 7.27076C32.7 6.45463 31.725 6.00947 30.6 6.00947Z"
            fill="#0D1935"
            stroke="#0D1935"
            stroke-miterlimit="10"
          />
          <Path
            d="M39.075 0.37085V11.4257L44.025 5.93537H44.25L40.575 10.016L45.45 17.0644H43.875L39.75 10.9805L39.15 11.6483V17.0644H37.5V0.37085H39.075Z"
            fill="#0D1935"
            stroke="#0D1935"
            stroke-miterlimit="10"
          />
          <Path
            d="M53.475 6.67719C53.25 6.45461 52.875 6.30622 52.35 6.15783C51.825 6.00945 51.45 5.93525 51.15 5.93525C50.85 5.93525 50.7 5.93525 50.7 5.93525C49.875 5.93525 49.275 6.15783 48.975 6.5288C48.6 6.89977 48.45 7.34493 48.45 7.86428C48.45 8.38364 48.6 8.75461 48.9 9.12557C49.2 9.49654 49.575 9.71912 50.1 9.86751C50.55 10.0901 51.075 10.2385 51.6 10.5353C52.125 10.7578 52.65 10.9804 53.1 11.2772C53.55 11.4998 54 11.8707 54.3 12.3159C54.6 12.7611 54.75 13.3546 54.75 14.0965C54.75 14.7643 54.525 15.3578 54 15.8772C53.475 16.3965 52.95 16.6933 52.35 16.8417C51.75 16.9901 51.075 17.0643 50.4 17.0643C48.9 17.0643 47.7 16.6933 46.95 16.0998L47.1 15.9514C47.4 16.2482 47.85 16.4707 48.45 16.6191C49.05 16.7675 49.65 16.9159 50.175 16.9159C51.075 16.9159 51.825 16.6933 52.35 16.174C52.95 15.7288 53.25 15.0611 53.25 14.3933C53.25 13.7256 53.025 13.0578 52.575 12.6869C52.125 12.2417 51.6 11.9449 51 11.6482C50.4 11.3514 49.725 11.1288 49.125 10.9062C48.525 10.6836 48 10.3127 47.55 9.86751C47.1 9.42235 46.875 8.90299 46.875 8.30945C46.875 7.7159 47.025 7.27074 47.25 6.89977C47.55 6.5288 47.85 6.30622 48.3 6.15783C49.05 5.93525 49.8 5.78687 50.625 5.78687C51.9 5.78687 52.95 6.00945 53.625 6.5288L53.475 6.67719Z"
            fill="#0D1935"
            stroke="#0D1935"
            stroke-miterlimit="10"
          />
          <Path
            d="M65.7 17.0643C64.65 17.0643 63.975 16.8418 63.6 16.4708C63.225 16.174 63.075 15.8772 63.075 15.6547V15.2095C62.325 16.545 61.2 17.2127 59.55 17.2127C57.675 17.2127 56.55 16.3966 56.325 14.6901C56.325 14.5418 56.25 14.3192 56.25 14.1708C56.25 14.0224 56.25 13.7998 56.325 13.5772C56.4 13.3547 56.55 13.1321 56.85 12.8353C57.45 12.3159 58.65 11.945 60.6 11.8708C61.05 11.7966 61.5 11.7966 61.95 11.7966C62.4 11.7966 62.7 11.7966 63.075 11.8708V8.16111C63.075 8.16111 63.075 8.08692 63.075 7.93853C63.075 7.79014 63.075 7.64175 63 7.41917C62.925 7.19659 62.775 7.04821 62.7 6.82563C62.55 6.60304 62.325 6.45466 61.95 6.30627C61.575 6.15788 61.125 6.08369 60.6 6.08369C60.075 6.08369 59.4 6.15788 58.65 6.38046C57.9 6.60304 57.375 6.75143 57 6.97401L56.925 6.82563C58.275 6.23208 59.625 5.9353 60.975 5.9353C62.55 5.9353 63.525 6.23208 64.05 6.75143C64.425 7.19659 64.65 7.64175 64.65 8.08692V15.5063C64.65 15.9514 64.725 16.2482 64.875 16.4708C65.025 16.6934 65.25 16.8418 65.4 16.8418L65.625 16.9159H66.3V17.0643H65.7ZM59.85 16.9901C60.675 16.9901 61.35 16.6934 62.025 16.174C62.625 15.6547 63 15.1353 63.075 14.6159V11.8708C62.625 11.8708 62.25 11.8708 61.8 11.8708C61.35 11.8708 60.975 11.8708 60.6 11.945C59.475 12.0934 58.725 12.3159 58.35 12.6869C57.975 13.0579 57.825 13.5772 57.825 14.245C57.825 14.3934 57.825 14.4676 57.825 14.6159C58.05 16.174 58.65 16.9901 59.85 16.9901Z"
            fill="#0D1935"
            stroke="#0D1935"
            stroke-miterlimit="10"
          />
          <Path
            d="M67.8 5.93528H69.375V8.68044C69.6 8.0127 70.125 7.34496 70.8 6.75141C71.475 6.15786 72.3 5.86108 73.125 5.86108C76.2 5.86108 77.7 7.64173 77.7 11.1288C77.7 15.1353 75.75 17.1385 71.775 17.1385C71.1 17.1385 70.275 16.9901 69.375 16.6191V22.5546H67.8V5.93528V5.93528ZM73.125 6.00947C72.225 6.00947 71.325 6.38044 70.575 7.19657C69.825 8.0127 69.45 8.68044 69.375 9.34818V16.4708C70.275 16.8417 71.1 16.9901 71.775 16.9901C74.7 16.9901 76.125 15.0611 76.125 11.1288C76.125 7.71592 75.15 6.00947 73.125 6.00947Z"
            fill="#0D1935"
            stroke="#0D1935"
            stroke-miterlimit="10"
          />
          <Path
            d="M79.725 5.93528H81.3V8.68044C81.525 8.0127 82.05 7.34496 82.725 6.75141C83.4 6.15786 84.225 5.86108 85.05 5.86108C88.125 5.86108 89.625 7.64173 89.625 11.1288C89.625 15.1353 87.675 17.1385 83.7 17.1385C83.025 17.1385 82.2 16.9901 81.3 16.6191V22.5546H79.725V5.93528V5.93528ZM85.05 6.00947C84.15 6.00947 83.25 6.38044 82.5 7.19657C81.75 8.0127 81.375 8.68044 81.3 9.34818V16.4708C82.2 16.8417 83.025 16.9901 83.7 16.9901C86.625 16.9901 88.05 15.0611 88.05 11.1288C88.05 7.71592 87.075 6.00947 85.05 6.00947Z"
            fill="#0D1935"
            stroke="#0D1935"
            stroke-miterlimit="10"
          />
        </Svg>
      ) : (
        <Svg
          width="90"
          height="23"
          viewBox="0 0 90 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M0.375 1.63227C2.1 1.55808 3.675 1.48389 4.95 1.48389C8.625 1.48389 10.5 2.74518 10.5 5.19356C10.5 6.08389 10.2 6.90002 9.675 7.56776C9.15 8.2355 8.25 8.68066 7.05 8.90324C8.175 9.05163 9.075 9.3484 9.75 9.94195C10.425 10.4613 10.725 11.4258 10.725 12.8355C10.8 15.6549 9 17.0645 5.25 17.0645H0.375V1.63227ZM4.95 1.70647C4.125 1.70647 3.225 1.78066 2.25 1.85485V8.82905H5.55C7.65 8.75485 8.7 7.56776 8.7 5.19356C8.7 4.08066 8.4 3.19034 7.725 2.59679C7.2 2.00324 6.225 1.70647 4.95 1.70647ZM2.25 16.842H5.25C6.6 16.842 7.5 16.471 8.1 15.8032C8.7 15.1355 9 14.0968 9 12.6129C9 11.129 8.7 10.2387 8.175 9.79356C7.65 9.3484 6.75 9.05163 5.625 9.05163H2.25V16.842Z"
            fill="#ECEFEE"
            stroke="#ECEFEE"
            stroke-miterlimit="10"
          />
          <Path
            d="M17.8499 17.1387C16.2749 17.1387 14.9999 16.6936 14.0249 15.8033C13.0499 14.9129 12.5249 13.5775 12.5249 11.7226C12.5249 9.86778 13.0499 8.4581 14.0999 7.41939C15.1499 6.38068 16.4249 5.86133 17.9999 5.86133C19.5749 5.86133 20.8499 6.30649 21.8249 7.19681C22.7999 8.08713 23.3249 9.42262 23.3249 11.2775C23.3249 13.1323 22.7999 14.6162 21.7499 15.5807C20.7749 16.6194 19.4249 17.1387 17.8499 17.1387ZM17.9999 6.00972C16.8749 6.00972 15.8999 6.52907 15.1499 7.49359C14.3999 8.4581 14.0249 9.86778 14.0249 11.6484C14.0249 13.4291 14.3999 14.7646 15.0749 15.6549C15.7499 16.5452 16.6499 16.9162 17.8499 16.9162C18.9749 16.9162 19.9499 16.3968 20.6999 15.4323C21.4499 14.3936 21.8249 13.0581 21.8249 11.2775C21.8249 9.49681 21.4499 8.16133 20.7749 7.27101C20.0999 6.45488 19.1249 6.00972 17.9999 6.00972Z"
            fill="#ECEFEE"
            stroke="#ECEFEE"
            stroke-miterlimit="10"
          />
          <Path
            d="M30.45 17.1387C28.875 17.1387 27.6 16.6936 26.625 15.8033C25.65 14.9129 25.125 13.5775 25.125 11.7226C25.125 9.86778 25.65 8.4581 26.7 7.41939C27.75 6.38068 29.025 5.86133 30.6 5.86133C32.175 5.86133 33.45 6.30649 34.425 7.19681C35.4 8.08713 35.925 9.42262 35.925 11.2775C35.925 13.1323 35.4 14.542 34.35 15.5807C33.375 16.6194 32.025 17.1387 30.45 17.1387ZM30.6 6.00972C29.475 6.00972 28.5 6.52907 27.75 7.49359C27 8.4581 26.625 9.86778 26.625 11.6484C26.625 13.4291 27 14.7646 27.675 15.6549C28.35 16.5452 29.25 16.9162 30.45 16.9162C31.575 16.9162 32.55 16.3968 33.3 15.4323C34.05 14.3936 34.425 13.0581 34.425 11.2775C34.425 9.49681 34.05 8.16133 33.375 7.27101C32.7 6.45488 31.725 6.00972 30.6 6.00972Z"
            fill="#ECEFEE"
            stroke="#ECEFEE"
            stroke-miterlimit="10"
          />
          <Path
            d="M39.075 0.370972V11.4258L44.025 5.93549H44.25L40.575 10.0161L45.45 17.0645H43.875L39.75 10.9806L39.15 11.6484V17.0645H37.5V0.370972H39.075Z"
            fill="#ECEFEE"
            stroke="#ECEFEE"
            stroke-miterlimit="10"
          />
          <Path
            d="M53.475 6.67743C53.25 6.45485 52.875 6.30646 52.35 6.15808C51.825 6.00969 51.45 5.9355 51.15 5.9355C50.85 5.9355 50.7 5.9355 50.7 5.9355C49.875 5.9355 49.275 6.15808 48.975 6.52904C48.6 6.90001 48.45 7.34517 48.45 7.86453C48.45 8.38388 48.6 8.75485 48.9 9.12582C49.2 9.49679 49.575 9.71937 50.1 9.86775C50.55 10.0903 51.075 10.2387 51.6 10.5355C52.125 10.7581 52.65 10.9807 53.1 11.2774C53.55 11.5 54 11.871 54.3 12.3161C54.6 12.7613 54.75 13.3549 54.75 14.0968C54.75 14.7645 54.525 15.3581 54 15.8774C53.475 16.3968 52.95 16.6936 52.35 16.8419C51.75 16.9903 51.075 17.0645 50.4 17.0645C48.9 17.0645 47.7 16.6936 46.95 16.1L47.1 15.9516C47.4 16.2484 47.85 16.471 48.45 16.6194C49.05 16.7678 49.65 16.9161 50.175 16.9161C51.075 16.9161 51.825 16.6936 52.35 16.1742C52.95 15.729 53.25 15.0613 53.25 14.3936C53.25 13.7258 53.025 13.0581 52.575 12.6871C52.125 12.2419 51.6 11.9452 51 11.6484C50.4 11.3516 49.725 11.129 49.125 10.9065C48.525 10.6839 48 10.3129 47.55 9.86775C47.1 9.42259 46.875 8.90324 46.875 8.30969C46.875 7.71614 47.025 7.27098 47.25 6.90001C47.55 6.52904 47.85 6.30646 48.3 6.15808C49.05 5.9355 49.8 5.78711 50.625 5.78711C51.9 5.78711 52.95 6.00969 53.625 6.52904L53.475 6.67743Z"
            fill="#ECEFEE"
            stroke="#ECEFEE"
            stroke-miterlimit="10"
          />
          <Path
            d="M65.7 17.0646C64.65 17.0646 63.975 16.842 63.6 16.471C63.225 16.1743 63.075 15.8775 63.075 15.6549V15.2097C62.325 16.5452 61.2 17.213 59.55 17.213C57.675 17.213 56.55 16.3968 56.325 14.6904C56.325 14.542 56.25 14.3194 56.25 14.171C56.25 14.0226 56.25 13.8001 56.325 13.5775C56.4 13.3549 56.55 13.1323 56.85 12.8355C57.45 12.3162 58.65 11.9452 60.6 11.871C61.05 11.7968 61.5 11.7968 61.95 11.7968C62.4 11.7968 62.7 11.7968 63.075 11.871V8.16135C63.075 8.16135 63.075 8.08716 63.075 7.93877C63.075 7.79039 63.075 7.642 63 7.41942C62.925 7.19684 62.775 7.04845 62.7 6.82587C62.55 6.60329 62.325 6.4549 61.95 6.30651C61.575 6.15813 61.125 6.08393 60.6 6.08393C60.075 6.08393 59.4 6.15813 58.65 6.38071C57.9 6.60329 57.375 6.75168 57 6.97426L56.925 6.82587C58.275 6.23232 59.625 5.93555 60.975 5.93555C62.55 5.93555 63.525 6.23232 64.05 6.75168C64.425 7.19684 64.65 7.642 64.65 8.08716V15.5065C64.65 15.9517 64.725 16.2485 64.875 16.471C65.025 16.6936 65.25 16.842 65.4 16.842L65.625 16.9162H66.3V17.0646H65.7ZM59.85 16.9904C60.675 16.9904 61.35 16.6936 62.025 16.1743C62.625 15.6549 63 15.1355 63.075 14.6162V11.871C62.625 11.871 62.25 11.871 61.8 11.871C61.35 11.871 60.975 11.871 60.6 11.9452C59.475 12.0936 58.725 12.3162 58.35 12.6872C57.975 13.0581 57.825 13.5775 57.825 14.2452C57.825 14.3936 57.825 14.4678 57.825 14.6162C58.05 16.1743 58.65 16.9904 59.85 16.9904Z"
            fill="#ECEFEE"
            stroke="#ECEFEE"
            stroke-miterlimit="10"
          />
          <Path
            d="M67.7998 5.93552H69.3748V8.68068C69.5998 8.01294 70.1248 7.3452 70.7998 6.75165C71.4748 6.1581 72.2998 5.86133 73.1248 5.86133C76.1998 5.86133 77.6998 7.64197 77.6998 11.1291C77.6998 15.1355 75.7498 17.1387 71.7748 17.1387C71.0998 17.1387 70.2748 16.9904 69.3748 16.6194V22.5549H67.7998V5.93552ZM73.1248 6.00972C72.2248 6.00972 71.3248 6.38068 70.5748 7.19681C69.8248 8.01294 69.4498 8.68068 69.3748 9.34843V16.471C70.2748 16.842 71.0998 16.9904 71.7748 16.9904C74.6998 16.9904 76.1248 15.0613 76.1248 11.1291C76.1248 7.71617 75.1498 6.00972 73.1248 6.00972Z"
            fill="#ECEFEE"
            stroke="#ECEFEE"
            stroke-miterlimit="10"
          />
          <Path
            d="M79.7251 5.93552H81.3001V8.68068C81.5251 8.01294 82.0501 7.3452 82.7251 6.75165C83.4001 6.1581 84.2251 5.86133 85.0501 5.86133C88.1251 5.86133 89.6251 7.64197 89.6251 11.1291C89.6251 15.1355 87.6751 17.1387 83.7001 17.1387C83.0251 17.1387 82.2001 16.9904 81.3001 16.6194V22.5549H79.7251V5.93552ZM85.0501 6.00972C84.1501 6.00972 83.2501 6.38068 82.5001 7.19681C81.7501 8.01294 81.3751 8.68068 81.3001 9.34843V16.471C82.2001 16.842 83.0251 16.9904 83.7001 16.9904C86.6251 16.9904 88.0501 15.0613 88.0501 11.1291C88.0501 7.71617 87.0751 6.00972 85.0501 6.00972Z"
            fill="#ECEFEE"
            stroke="#ECEFEE"
            stroke-miterlimit="10"
          />
        </Svg>
      )}
    </View>
  );
}
