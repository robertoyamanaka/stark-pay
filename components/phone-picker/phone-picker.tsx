import { useEffect, useState } from "react";
import {
  FlatList,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import { TouchableOpacity, Dimensions } from "react-native";
import { Area, useFetchPhoneAreas } from "./use-fetch-phone-areas";
import { SimpleInput } from "../simple-input";
const { width, height } = Dimensions.get("window");

export type PhonePickerProps = {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  selectedCallingCode: string;
  setSelectedCallingCode: (code: string) => void;
};
export function PhonePicker({
  phoneNumber,
  setPhoneNumber,
  selectedCallingCode,
  setSelectedCallingCode,
}: PhonePickerProps) {
  const { data: areas, error, isLoading } = useFetchPhoneAreas();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);


  useEffect(() => {
    if (areas && areas.length > 0) {
      const targetCode = selectedCallingCode || "+1"
      let defaultArea
      if (targetCode === "+1"){
        defaultArea = areas.find((area) => area.code === 'US');
      }else{
        defaultArea = areas.find((area) => area.callingCode === targetCode);
      }
      if (defaultArea) {
        setSelectedArea(defaultArea);
      }
    }
  }, [areas]);

  // render countries codes modal
  function renderAreasCodesModal() {
    const renderItem = ({ item }: { item: Area }) => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: "row",
            alignContent: "space-between",
            alignItems: "center",
          }}
          onPress={() => {
            setSelectedArea(item),
              setModalVisible(false),
              setSelectedCallingCode(item.callingCode);
          }}
        >
          <Image
            source={{ uri: item.flag }}
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
            }}
          />

          <Text style={{ fontSize: 16, color: "#fff" }}>
            {item.callingCode + "  "}
          </Text>
          <Text style={{ fontSize: 16, color: "#fff" }}>{item.name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                height: 400,
                width: width * 0.8,
                backgroundColor: "#342342",
                borderRadius: 12,
              }}
            >
              <FlatList
                data={areas}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: 20,
                  marginBottom: 20,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            marginHorizontal: 5,
            borderBottomColor: "#111",
            borderBottomWidth: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("@/assets/down_arrow.png")}
            style={{ width: 10, height: 10, tintColor: "#111" }}
          />
          <Image
            source={{ uri: selectedArea?.flag }}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
          <Text style={{ color: "#FFFF", fontSize: 18, paddingLeft: 5 }}>
            {selectedArea?.callingCode}
          </Text>
        </TouchableOpacity>
        {/* Phone Number Text Input */}
        <View style={styles.numberInputSubContainer}>
          <SimpleInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone number"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {renderAreasCodesModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  numberInputSubContainer: {
    width: "70%",
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 5,
  },
});
