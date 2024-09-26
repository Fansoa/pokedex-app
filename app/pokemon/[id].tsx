import { ThemedText } from "@/components/ThemedText"
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useFetchQuery } from "@/hooks/useFetchQuery"
import { useThemeColor } from "@/hooks/useThemeColor"
import { Colors } from "@/constants/Colors"

const PokemonDetailsScreen = () => {
    const { id } = useLocalSearchParams()
    const themeColor = useThemeColor()
    const { data, isFetching } = useFetchQuery(`/pokemon/${id}`)
    const basePokemonColor = Colors.type[data?.types?.[0]?.type?.name] || 'normal'

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: basePokemonColor }]}>
            {
                isFetching ? <ActivityIndicator color={themeColor.tint}/> : <ThemedText>PokemonDetailsScreen</ThemedText>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PokemonDetailsScreen;
