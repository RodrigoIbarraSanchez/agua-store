import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { RootStackScreenProps } from '../navigation/types';
import { Product } from '../types/product';
import { ProductService } from '../services/api';
import { theme } from '../theme/theme';

type Props = RootStackScreenProps<'ProductDetail'>;

export const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductService.getById(productId);
      setProduct(data);
    } catch (err) {
      setError('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await ProductService.delete(productId);
      navigation.goBack();
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.lightColors.primary} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error || 'Producto no encontrado'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon
              type="material-community"
              name={getCategoryIcon(product.category)}
              size={50}
              color={theme.lightColors.primary}
            />
          </View>
          <Text style={styles.category}>{product.category.toUpperCase()}</Text>
        </View>

        <Card.Divider style={styles.divider} />

        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.label}>Precio</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Stock</Text>
            <Text style={styles.stock}>{product.stock} unidades</Text>
          </View>
        </View>

        <View style={styles.dateInfo}>
          <Text style={styles.dateText}>Creado: {new Date(product.createdAt).toLocaleDateString()}</Text>
          <Text style={styles.dateText}>Actualizado: {new Date(product.updatedAt).toLocaleDateString()}</Text>
        </View>

        <View style={styles.actions}>
          <Button
            title="Editar"
            icon={{
              name: 'edit',
              type: 'font-awesome',
              color: theme.lightColors.white,
              size: 20,
            }}
            buttonStyle={[styles.button, styles.editButton]}
            titleStyle={styles.buttonText}
            onPress={() => navigation.navigate('ProductForm', { product })}
          />
          <Button
            title="Eliminar"
            icon={{
              name: 'trash',
              type: 'font-awesome',
              color: theme.lightColors.white,
              size: 20,
            }}
            buttonStyle={[styles.button, styles.deleteButton]}
            titleStyle={styles.buttonText}
            onPress={handleDelete}
          />
        </View>
      </Card>
    </ScrollView>
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
  card: {
    margin: theme.spacing.md,
    borderRadius: 24,
    padding: theme.spacing.lg,
    elevation: 4,
    shadowColor: theme.lightColors.grey0,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  iconContainer: {
    backgroundColor: theme.lightColors.grey5,
    padding: theme.spacing.md,
    borderRadius: 25,
    marginBottom: theme.spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: theme.lightColors.grey4,
    marginVertical: theme.spacing.md,
  },
  category: {
    fontSize: 16,
    color: theme.lightColors.grey2,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    color: theme.lightColors.grey0,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: theme.lightColors.grey2,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
    lineHeight: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: theme.spacing.lg,
  },
  infoCard: {
    flex: 1,
    backgroundColor: theme.lightColors.grey5,
    padding: theme.spacing.md,
    borderRadius: 16,
    marginHorizontal: theme.spacing.xs,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: theme.lightColors.grey2,
    marginBottom: theme.spacing.xs,
    fontWeight: '600',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.lightColors.primary,
  },
  stock: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.lightColors.grey1,
  },
  dateInfo: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.lightColors.grey5,
    borderRadius: 16,
  },
  dateText: {
    color: theme.lightColors.grey2,
    fontSize: 14,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.xl,
  },
  button: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: 16,
    minWidth: 140,
  },
  editButton: {
    backgroundColor: theme.lightColors.secondary,
  },
  deleteButton: {
    backgroundColor: theme.lightColors.error,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  error: {
    color: theme.lightColors.error,
    fontSize: 16,
    textAlign: 'center',
  },
});