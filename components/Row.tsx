import { StyleSheet, View } from "react-native";

const Row = ({children, ...rest}) => {
    return (
        <View style={[styles.container, rest]}>{children}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})

export default Row;
