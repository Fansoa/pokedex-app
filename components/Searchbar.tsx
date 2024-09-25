import { useThemeColor } from "@/hooks/useThemeColor";
import { Image, StyleSheet, TextInput, View } from "react-native";

const Searchbar = ({value, onChange}) => {
    const colors = useThemeColor()

    return (
        <View style={[styles.container, {backgroundColor: colors.grayWhite}]}>
            <Image 
                source={require('@/assets/images/search.png')}
                style={{marginLeft: 8, width: 16, height: 16}}
            />
            <TextInput style={[styles.input, {color: colors.grayMedium}]} value={value} onChangeText={onChange}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        height: 32,
        gap: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24
    },
    input: {
        flex: 1,
        height: 16,
        fontSize: 10,
        lineHeight: 16,
    }
})

export default Searchbar;