export enum CoinValuesEnum {
  USDC = "USDC",
  ETH = "ETH",
  USDT = "USDT",
}

export const COINS = [
  {
    label: "1",
    name: CoinValuesEnum.USDC,
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=029",
  },
  {
    label: "2",
    name: CoinValuesEnum.ETH,
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029",
  },
  {
    label: "3",
    name: CoinValuesEnum.USDT,
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  },
];
