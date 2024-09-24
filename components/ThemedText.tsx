import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  type?: 'headline' | 'subtitle1' | 'subtitle2' | 'subtitle3' | 'body1' | 'body2' | 'body3' | 'caption';
  color?: string | null
};

export function ThemedText({
  style,
  type,
  color,
  ...rest
}: ThemedTextProps) {
  const themeColor = useThemeColor();

  return (
    <Text
      style={[
        { color: themeColor[color] || themeColor.grayWhite },
        type === 'headline' ? styles.headline : undefined,
        type === 'subtitle1' ? styles.subtitle1 : undefined,
        type === 'subtitle2' ? styles.subtitle2 : undefined,
        type === 'subtitle3' ? styles.subtitle3 : undefined,
        type === 'body1' ? styles.body1 : undefined,
        type === 'body2' ? styles.body2 : undefined,
        type === 'body3' ? styles.body3 : undefined,
        type === 'caption' ? styles.caption : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold'
  },
  subtitle1: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  subtitle2: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  subtitle3: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  body1: {
    fontSize: 14,
    lineHeight: 16,
  },
  body2: {
    fontSize: 12,
    lineHeight: 16,
  },
  body3: {
    fontSize: 10,
    lineHeight: 16,
  },
  caption: {
    fontSize: 8,
    lineHeight: 12,
  },
});
