import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Input, Text, Icon } from '@rneui/themed';
import { RootStackScreenProps } from '../navigation/types';
import { CreateProductDto, ProductCategory } from '../types/product';
import { ProductService } from '../services/api';
import { theme } from '../theme/theme';

type Props = RootStackScreenProps<'ProductForm'>;

export const ProductFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const editingProduct = route.params?.product;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateProductDto>({
    name: editingProduct?.name || '',
    description: editingProduct?.description || '',
    price: editingProduct?.price || 0,
    stock: editingProduct?.stock || 0,
    category: editingProduct?.category || 'garrafa',
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (editingProduct) {
        await ProductService.update(editingProduct._id, formData);
      } else {
        await ProductService.create(formData);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Error',
        'Hubo un error al guardar el producto. Por favor, intente nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const categories: ProductCategory[] = ['garrafa', 'pack', 'botella'];

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Input
          label="Nombre del Producto"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Ingrese el nombre"
          leftIcon={{
            type: 'font-awesome',
            name: 'tag',
            color: theme.lightColors.grey3,
          }}
          containerStyle={styles.inputContainer}
        />

        <Input
          label="Descripción"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder="Ingrese la descripción"
          multiline
          leftIcon={{
            type: 'font-awesome',
            name: 'file-text-o',
            color: theme.lightColors.grey3,
          }}
          containerStyle={styles.inputContainer}
        />

        <Input
          label="Precio"
          value={formData.price.toString()}
          onChangeText={(text) => setFormData({ ...formData, price: parseFloat(text) || 0 })}
          placeholder="0.00"
          keyboardType="decimal-pad"
          leftIcon={{
            type: 'font-awesome',
            name: 'dollar',
            color: theme.lightColors.grey3,
          }}
          containerStyle={styles.inputContainer}
        />

        <Input
          label="Stock"
          value={formData.stock.toString()}
          onChangeText={(text) => setFormData({ ...formData, stock: parseInt(text) || 0 })}
          placeholder="0"
          keyboardType="number-pad"
          leftIcon={{
            type: 'font-awesome',
            name: 'cubes',
            color: theme.lightColors.grey3,
          }}
          containerStyle={styles.inputContainer}
        />

        <Text style={styles.categoryLabel}>Categoría</Text>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <Button
              key={category}
              title={category.toUpperCase()}
              type={formData.category === category ? 'solid' : 'outline'}
              buttonStyle={[
                styles.categoryButton,
                formData.category === category && styles.selectedCategory,
              ]}
              titleStyle={[
                styles.categoryButtonText,
                formData.category === category && styles.selectedCategoryText,
              ]}
              icon={{
                type: 'material-community',
                name: getCategoryIcon(category),
                color: formData.category === category
                  ? theme.lightColors.white
                  : theme.lightColors.primary,
                size: 20,
              }}
              onPress={() => setFormData({ ...formData, category })}
              containerStyle={styles.categoryButtonContainer}
            />
          ))}
        </View>

        <Button
          title={editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
          onPress={handleSubmit}
          loading={loading}
          icon={{
            name: editingProduct ? 'save' : 'plus',
            type: 'font-awesome',
            color: theme.lightColors.white,
            size: 20,
          }}
          buttonStyle={styles.submitButton}
          containerStyle={styles.submitButtonContainer}
          raised
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightColors.background,
  },
  form: {
    padding: theme.spacing.md,
  },
  inputContainer: {
    paddingHorizontal: 0,
    marginBottom: theme.spacing.sm,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.lightColors.grey3,
    marginLeft: 10,
    marginBottom: theme.spacing.sm,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
    flexWrap: 'wrap',
  },
  categoryButtonContainer: {
    flex: 1,
    minWidth: '30%',
    marginHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.components.Button.borderRadius,
    borderColor: theme.lightColors.primary,
  },
  selectedCategory: {
    backgroundColor: theme.lightColors.primary,
  },
  categoryButtonText: {
    fontSize: 12,
    color: theme.lightColors.primary,
  },
  selectedCategoryText: {
    color: theme.lightColors.white,
  },
  submitButton: {
    backgroundColor: theme.lightColors.primary,
    borderRadius: theme.components.Button.borderRadius,
    paddingVertical: theme.spacing.md,
    elevation: 3,
    shadowColor: theme.lightColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  submitButtonContainer: {
    marginTop: theme.spacing.lg,
  },
});