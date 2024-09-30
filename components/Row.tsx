import { ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

type Props = {
    children: ReactNode,
    style?: ViewStyle,
    key?: string
}

const Row = ({children, style}: Props) => {
    return (
        <View style={[styles.container, style]}>{children}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})

export default Row;
