import { PrimaryButton } from "@/components/buttons/primary-button";
import { CoinSquare } from "@/components/coin-square";
import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";

type Web3Network = {
  id: string;
  name: string;
  apy: number;
  logo: string;
};

const web3Networks: Web3Network[] = [
  {
    id: "1",
    name: "Ethereum",
    apy: 5.3,
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029",
  },
  {
    id: "2",
    name: "Binance",
    apy: 1.0,
    logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
  },
  {
    id: "3",
    name: "Polygon",
    apy: 2.3,
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  },
  {
    id: "4",
    name: "Avalanche",
    apy: 3.5,
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
  },
  {
    id: "5",
    name: "Solana",
    apy: 4.5,
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    id: "6",
    name: "Cardano",
    apy: 3.5,
    logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  },
  {
    id: "7",
    name: "Polkadot",
    apy: 3.5,
    logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
  },
  {
    id: "8",
    name: "Chainlink",
    apy: 3.5,
    logo: "https://cryptologos.cc/logos/chainlink-link-logo.png",
  },
];

const { width: deviceWidth } = Dimensions.get("window");
const numColumns = 3;
const spacing = 10;
const itemWidth = (deviceWidth - 20 - spacing * (numColumns + 1)) / numColumns;

export default function PossibleInvestments() {
  return (
    <FlatList
      data={web3Networks}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <CoinSquare imageUrl={item.logo} name={item.name} apy={item.apy} />
        </View>
      )}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    backgroundColor: "#0C0C4C",
    padding: 20,
  },
  item: {
    width: itemWidth,
    margin: 4, // Half spacing for each side
  },
});
