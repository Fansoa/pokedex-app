import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";

type Props = {
    checked: boolean
}

const Radio = ({ checked } : Props) => {
    const themeColor = useThemeColor()
    return <View style={[style.radio, {borderColor: themeColor.tint}]}>
        {checked && <View style={[style.radioInner, {backgroundColor: themeColor.tint}]}/>}
    </View>
}

const style = StyleSheet.create({
    radio: {
        width: 14,
        height: 14,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    radioInner: {
        borderRadius: 6,
        width: 6,
        height: 6
    },
})

export default Radio;