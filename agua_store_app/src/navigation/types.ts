import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from '../types/product';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string };
  ProductForm: { product?: Product };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}