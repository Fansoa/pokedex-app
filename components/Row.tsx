import { ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

type Props = {
    children: ReactNode,
    style: ViewStyle,
}

const Row = ({children, style, ...rest}: Props) => {
    return (
        <View style={[styles.container, style, rest]}>{children}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})

export default Row;
