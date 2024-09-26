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
            <View style={{flex: 1}}>
                {
                    isFetching ? <ActivityIndicator color={themeColor.tint}/> : (
                    <>
                        <Row style={styles.header}>
                            <Pressable onPress={handleBackButton}>
                                <Image source={require('@/assets/images/arrow_back.png')}/>
                            </Pressable>
                            <ThemedText style={styles.pokemonName} type="headline">{data?.name}</ThemedText>
                            <ThemedText type="subtitle2">#{id?.toString().padStart(3,'0')}</ThemedText>
                        </Row>
                        <View style={{height: 144, zIndex: 10}}>
                            <Image
                                source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}}
                                style={{width: 200, height: 200, margin: 'auto'}}
                            />
                        </View>
                        <View style={styles.body}>

                        </View>
                    </>
                    )
                }
                <Image style={styles.backgroundImg} source={require('@/assets/images/big_pokeball.png')}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
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
    },
    body: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: 'white'
    }
})

export default PokemonDetailsScreen;
