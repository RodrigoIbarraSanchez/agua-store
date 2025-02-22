import { Theme, createTheme } from '@rneui/themed';

export const theme = createTheme({
  lightColors: {
    primary: '#2BB8D5',
    secondary: '#4ECDC4',
    background: '#F7FBFC',
    white: '#FFFFFF',
    black: '#1A1A1A',
    grey0: '#2C3E50',
    grey1: '#34495E',
    grey2: '#7F8C8D',
    grey3: '#95A5A6',
    grey4: '#BDC3C7',
    grey5: '#ECF0F1',
    error: '#E74C3C',
    success: '#2ECC71',
    warning: '#F1C40F',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  components: {
    Card: {
      containerStyle: {
        borderRadius: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        backgroundColor: '#FFFFFF',
        padding: 16,
      },
      borderRadius: 16,
      padding: 16,
    },
    Button: {
      raised: true,
      borderRadius: 12,
      containerStyle: {
        borderRadius: 12,
      },
    },
    Input: {
      containerStyle: {
        paddingHorizontal: 0,
      },
      inputContainerStyle: {
        borderRadius: 12,
        backgroundColor: '#F7FBFC',
        borderBottomWidth: 0,
        paddingHorizontal: 16,
        height: 50,
      },
      inputStyle: {
        fontSize: 16,
      },
      leftIconContainerStyle: {
        marginRight: 12,
      },
    },
    FAB: {
      containerStyle: {
        borderRadius: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      size: 'large',
    },
  },
});