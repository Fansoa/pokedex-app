import { ThemedText } from "@/components/ThemedText"
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams } from "expo-router"
import { useFetchQuery } from "@/hooks/useFetchQuery"
import { useThemeColor } from "@/hooks/useThemeColor"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import Row from "@/components/Row"

const PokemonDetailsScreen = () => {
    const { id } = useLocalSearchParams()
    const themeColor = useThemeColor()
    const { data, isFetching } = useFetchQuery(`/pokemon/${id}`)
    const basePokemonColor = Colors.type[data?.types?.[0]?.type?.name] || 'normal'

    const handleBackButton = () => {
        router.back()
    }

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: basePokemonColor }]}>
            <View>
                {
                    isFetching ? <ActivityIndicator color={themeColor.tint}/> : (
                    <Row style={styles.header}>
                        <Pressable onPress={handleBackButton}>
                            <Image source={require('@/assets/images/arrow_back.png')}/>
                        </Pressable>
                        <ThemedText style={styles.pokemonName} type="headline">{data?.name}</ThemedText>
                        <ThemedText type="subtitle2">#{id?.toString().padStart(3,'0')}</ThemedText>
                    </Row>)
                }
                <Image style={styles.backgroundImg} source={require('@/assets/images/big_pokeball.png')}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    pokemonName: {
        textTransform: 'capitalize'
    },
    backgroundImg: {
        position: 'absolute',
        top: 8,
        right: 8,
    }
})

export default PokemonDetailsScreen;
