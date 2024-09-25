import { Image, Pressable, StyleSheet, View, type ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";

type Props = {
    style?: ViewStyle,
    id: number,
    name: string
}

const PokemonCard = ({style, id, name}: Props) => {
    const themeColor = useThemeColor()

    return (
        <Link href={{pathname: "/pokemon/[id]", params: {id: id}}} asChild style={styles.shadow}>
            <Pressable 
                android_ripple={{ color: themeColor.tint, foreground: true}}
                style={{...style, ...styles.shadow}}
            >
                <ThemedText style={styles.header} type="caption" color="grayMedium">#{id?.toString().padStart(3,'0')}</ThemedText>
                <Image
                    source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}}
                    style={{width: 72, height: 72, margin: 'auto'}}
                />
                <ThemedText style={styles.footer} color="grayDark">{name}</ThemedText>
                <View style={[styles.background, {backgroundColor: themeColor.graybackground}]}/>
            </Pressable>
        </Link>
    )
}

export default PokemonCard;

const styles = StyleSheet.create({
    header: {
        textAlign: 'right',
        paddingHorizontal: 8
    },
    footer: {
        textAlign: 'center'
    },
    background: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 44,
        borderRadius: 8,
        zIndex: -1,
    },
    shadow: {
        borderRadius: 8,
        backgroundColor: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
})