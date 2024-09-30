import { ThemedText } from "@/components/ThemedText"
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams } from "expo-router"
import { useFetchQuery } from "@/hooks/useFetchQuery"
import { useThemeColor } from "@/hooks/useThemeColor"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import Row from "@/components/Row"
import statShortName from "@/methods/statShortName"
import StatsView from "@/components/StatsView"

const PokemonDetailsScreen = () => {
    const { id } = useLocalSearchParams()
    const themeColor = useThemeColor()
    const { data, isFetching } = useFetchQuery(`/pokemon/${id}`)
    const { data: species } = useFetchQuery(`/pokemon-species/${id}`)
    const basePokemonColor = Colors.type[data?.types?.[0]?.type?.name] || 'normal'
    const abilityList = data?.abilities.map(({ability}) => ability.name)
    const statList = data?.stats.reduce((acc, curr) => {
        return [...acc, {name: statShortName(curr.stat.name), value: curr.base_stat}]
    }, [])
    const abilitiesDisplay = abilityList?.join(', ')
    const bio = species?.flavor_text_entries
    ?.find(({language}) => language.name === 'en')
    ?.flavor_text.replaceAll('\n', ' ')
    
    const handleBackButton = () => {
        router.navigate('')
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
                            <ThemedText style={styles.pokemonName} type="headline">{data.name}</ThemedText>
                            <ThemedText type="subtitle2">#{id?.toString().padStart(3,'0')}</ThemedText>
                        </Row>
                        <View style={{height: 144, zIndex: 10}}>
                            <Image
                                source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}}
                                style={{width: 200, height: 200, margin: 'auto'}}
                            />
                        </View>
                        <View style={styles.body}>
                            <Row style={styles.buttonContainer}>
                                {data?.types?.map(type => {
                                    return (
                                        <View key={type.type.name} style={[styles.buttonType, {backgroundColor: Colors.type[type.type.name]}]}>
                                            <ThemedText type="subtitle3">
                                                {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                                            </ThemedText>
                                        </View>
                                    )
                                })}
                            </Row>
                            <ThemedText color={basePokemonColor} type="headline">About</ThemedText>
                            <Row style={{height: 48}}>
                                <View style={{flex:1, alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Row style={styles.attribute}>
                                        <Image style={{width: 16, height: 16}} source={require('@/assets/images/weight.png')}/>
                                        <ThemedText color='grayDark' type="body3">{data.weight/10} kg</ThemedText>
                                    </Row>
                                    <ThemedText color='grayMedium' type="body3">Weight</ThemedText>
                                </View>
                                <View style={{flex:1, alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Row style={{gap: 8}}>
                                        <Image style={{width: 16, height: 16}} source={require('@/assets/images/straighten.png')}/>
                                        <ThemedText color='grayDark' type="body3">{data.height/10} m</ThemedText>
                                    </Row>
                                    <ThemedText color='grayMedium' type="body3">Height</ThemedText>
                                </View>
                                <View style={styles.ability}>
                                    <Row style={{gap: 8}}>
                                        <ThemedText style={{textAlign: 'center'}} color='grayDark' type="body3">{abilitiesDisplay}</ThemedText>
                                    </Row>
                                    <ThemedText color='grayMedium' type="body3">Moves</ThemedText>
                                </View>
                            </Row>
                            <View style={{width: '100%'}}>
                                <ThemedText color='grayDark' type="body3">{bio}</ThemedText>
                            </View>
                            <ThemedText color={basePokemonColor} type="headline">Base Stats</ThemedText>
                            <View>
                                <StatsView statList={statList} baseColor={basePokemonColor}/>
                            </View>
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
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 50,
        gap: 16,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        gap: 16
    },
    buttonType: {
        textTransform: 'capitalize',
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 6
    },
    attribute: {
        justifyContent: 'space-between'
    },
    ability: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export default PokemonDetailsScreen;
