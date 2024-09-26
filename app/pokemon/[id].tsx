import { ThemedText } from "@/components/ThemedText"
import { ActivityIndicator, SafeAreaView } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useFetchQuery } from "@/hooks/useFetchQuery"
import { useThemeColor } from "@/hooks/useThemeColor"

const PokemonDetailsScreen = () => {
    const { id } = useLocalSearchParams()
    const themeColor = useThemeColor()

    const { isFetching } = useFetchQuery(`/pokemon/${id}`)

    return (
        <SafeAreaView>
            {
                isFetching ? <ActivityIndicator color={themeColor.tint}/> : <ThemedText>PokemonDetailsScreen</ThemedText>
            }
        </SafeAreaView>
    )
}

export default PokemonDetailsScreen;
