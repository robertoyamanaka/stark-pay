// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// import { AskPayment } from "./features/payments/ask-payment";
// import PaymentNfc from "./features/payments/payment-nfc";

// export type RootStackParamList = {
//   Home: undefined;
//   AskPayment: undefined;
//   PaymentNfc: { amount: number };
// };
// const Stack = createStackNavigator<RootStackParamList>();

// export function Navigation() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: "black", //"#1D1D26",
//             shadowColor: "transparent",
//             borderBottomColor: "#333340",
//             borderBottomWidth: 0,
//           },
//           headerTintColor: "#fff",
//           headerTitleStyle: {
//             fontSize: 24,
//           },
//           headerBackTitleVisible: true
//         }}
//       >
//         <>
//           <Stack.Screen
//             name="AskPayment"
//             component={AskPayment}
//             options={{
//               headerShown: false,
//               title: "Pedir pago",
//               headerStyle: {
//                 backgroundColor: "white", //"#1D1D26",
//                 shadowColor: "transparent",
//                 borderBottomColor: "#333340",
//                 borderBottomWidth: 0,
//               },
//             }}
//           />
//           <Stack.Screen
//             name="PaymentNfc"
//             component={PaymentNfc}
//             options={{
//               headerStyle: {
//                 backgroundColor: "#0C0C4C", //"#1D1D26",
//                 shadowColor: "transparent",
//                 borderBottomWidth: 0,
//               },
//               title: "Acerca el dispositivo",
//             }}
//           />
//         </>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
