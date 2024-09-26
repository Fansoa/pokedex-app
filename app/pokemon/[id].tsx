import { ThemedText } from "@/components/ThemedText"
import { SafeAreaView } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useFetchQuery } from "@/hooks/useFetchQuery"

const PokemonDetailsScreen = () => {
    const { id } = useLocalSearchParams()

    const { data } = useFetchQuery(`/pokemon/${id}`)

    return (
        <SafeAreaView>
            <ThemedText>PokemonDetailsScreen</ThemedText>
        </SafeAreaView>
    )
}

export default PokemonDetailsScreen;
