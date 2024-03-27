import { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { SignUpVerifyCodePhone } from "./sign-up-verify-code-phone";
import { SignUpAddPhone } from "./sign-up-add-phone";
import { Alert } from "react-native";
import SignUpAddUsername from "./sign-up-add-username";


export function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [callingCode, setCallingCode] = useState("+52");
  const [currentSection, setCurrentSection] = useState(0);

  const goToNextSection = () => {
    setCurrentSection(currentSection + 1);
  };

  const startSignUp = async () => {
    if (!isLoaded) return;
    try {
      const fullPhoneNumber = `${callingCode}${phoneNumber}`;
      console.log("full phone number", fullPhoneNumber);
      await signUp.create({
        username,
        phoneNumber: fullPhoneNumber,
      });
      console.log("Sign up created");
      await signUp.preparePhoneNumberVerification();
      goToNextSection();
    } catch (err: any) {
      if (err.status === 422) {
        Alert.alert(
          "That phone number is already taken",
          "Please try another one"
        );
      }
      console.log("an error here")
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const completeSignUp = async (code: string) => {
    if (!isLoaded) return null;
    try {
      const completeSignUp = await signUp.attemptPhoneNumberVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      {currentSection === 0 && (
        <SignUpAddUsername
          username={username}
          setUsername={setUsername}
          goToNextSection={goToNextSection}
        />
      )}
      {currentSection === 1 && (
        <SignUpAddPhone
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          callingCode={callingCode}
          setCallingCode={setCallingCode}
          goToNext={startSignUp}
        />
      )}
      {currentSection === 2 && (
        <SignUpVerifyCodePhone
          callingCode={callingCode}
          phoneNumber={phoneNumber}
          completeSignIn={completeSignUp}
        />
      )}
    </>
  );
}
