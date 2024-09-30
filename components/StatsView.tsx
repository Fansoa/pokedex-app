import { StyleSheet, View } from "react-native";
import Row from "./Row";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
    statList: {
        name: string,
        value: number
    }[],
    baseColor: string
}

const StatsView = ({statList, baseColor} : Props) => {
    const themeColor = useThemeColor()
    
    return statList.map(({name, value}) => <Row style={[styles.root]} key={name}>
        <View style={[styles.name, {borderColor: themeColor.grayLight}]}>
            <ThemedText type='subtitle3' color={baseColor}>{name}</ThemedText>
        </View>
        <ThemedText type='body3' color={themeColor.grayDark}>{value.toString().padStart(3, '0')}</ThemedText>
        <View style={[styles.bar, {backgroundColor: themeColor.grayLight}]}>
            <View style={[styles.barInner, {width: `${value/255*100}%`, backgroundColor: baseColor}]}/>
        </View>
    </Row>)
}

const styles = StyleSheet.create({
    root:{
        gap: 8,
        alignItems: 'center',
        width: '100%',
    },
    name: {
        width: 48,
        paddingRight: 8,
        borderRightWidth: 1,
        borderStyle: "solid"
    },
    bar: {
        flex: 1,
        borderRadius: 20,
        height:4,
        width: '100%',
        backgroundColor: 'blue',
        position: 'relative',
    },
    barInner: {
        position: 'absolute',
        top: 0,
        height: 4,
        borderRadius: 20,
        backgroundColor: 'red'
    },
})

export default StatsView;
