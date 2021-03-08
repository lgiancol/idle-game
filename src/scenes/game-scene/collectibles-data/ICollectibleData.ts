export enum CollectibleType {
  BIT,
  BYTE,
  KILOBYTE,
}

export default interface ICollectibleData {
  type: CollectibleType;
  isActive: boolean;
  count: number;
  trueCount: number;
  collectSpeed: number;
  sellPrice: number;
  buyPrice: number;
  // collectSpeedMultiplier: number; // THIS WILL BE ADDED TO THE "STORE" AND JUST ADDED ON TO THE BASE AMOUNT
  clickSpeed: number; // Number to collect on click
  update: (deltaTime: number) => void;
  click: () => void;
}
