import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Button, Card, Text, FAB, Icon } from '@rneui/themed';
import { RootStackScreenProps } from '../navigation/types';
import { Product } from '../types/product';
import { ProductService } from '../services/api';
import { theme } from '../theme/theme';

type Props = RootStackScreenProps<'ProductList'>;

export const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductService.getAll();
      setProducts(data);
    } catch (err) {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProducts();
    });

    return unsubscribe;
  }, [navigation]);

  const handleDeleteProduct = async (productId: string) => {
    try {
      await ProductService.delete(productId);
      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      setError('Error al eliminar el producto');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'garrafa':
        return 'water';
      case 'pack':
        return 'package';
      case 'botella':
        return 'bottle-soda-outline';
      default:
        return 'water';
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconWrapper}>
          <Icon
            type="material-community"
            name={getCategoryIcon(item.category)}
            size={30}
            color={theme.lightColors.primary}
          />
        </View>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <Card.Divider style={styles.divider} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.stock}>Stock: {item.stock}</Text>
      <View style={styles.cardActions}>
        <Button
          type="clear"
          icon={{
            name: 'eye',
            type: 'font-awesome',
            color: theme.lightColors.primary,
            size: 22,
          }}
          onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
          containerStyle={styles.actionButton}
        />
        <Button
          type="clear"
          icon={{
            name: 'edit',
            type: 'font-awesome',
            color: theme.lightColors.secondary,
            size: 22,
          }}
          onPress={() => navigation.navigate('ProductForm', { product: item })}
          containerStyle={styles.actionButton}
        />
        <Button
          type="clear"
          icon={{
            name: 'trash',
            type: 'font-awesome',
            color: theme.lightColors.error,
            size: 22,
          }}
          onPress={() => handleDeleteProduct(item._id)}
          containerStyle={styles.actionButton}
        />
      </View>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.lightColors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        numColumns={1}
      />
      <FAB
        icon={{ name: 'plus', type: 'font-awesome' }}
        color={theme.lightColors.primary}
        placement="right"
        onPress={() => navigation.navigate('ProductForm')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightColors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.lightColors.background,
  },
  list: {
    padding: theme.spacing.sm,
  },
  card: {
    marginBottom: theme.spacing.md,
    borderRadius: 20,
    padding: theme.spacing.md,
    elevation: 4,
    shadowColor: theme.lightColors.grey0,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: theme.lightColors.white,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  iconWrapper: {
    backgroundColor: theme.lightColors.grey5,
    padding: theme.spacing.sm,
    borderRadius: 15,
  },
  divider: {
    height: 1,
    backgroundColor: theme.lightColors.grey5,
    marginVertical: theme.spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
    color: theme.lightColors.grey0,
  },
  description: {
    color: theme.lightColors.grey2,
    marginBottom: theme.spacing.xs,
    fontSize: 14,
    lineHeight: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.lightColors.primary,
  },
  stock: {
    color: theme.lightColors.grey2,
    marginBottom: theme.spacing.sm,
    fontSize: 14,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: theme.lightColors.grey5,
    paddingTop: theme.spacing.sm,
  },
  actionButton: {
    marginHorizontal: theme.spacing.xs,
  },
  error: {
    color: theme.lightColors.error,
    textAlign: 'center',
    padding: theme.spacing.sm,
    fontSize: 16,
  },
});