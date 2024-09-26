import { ThemedText } from "@/components/ThemedText"
import { SafeAreaView } from "react-native"
import { useLocalSearchParams } from "expo-router"

const PokemonDetailsScreen = () => {
    const { id } = useLocalSearchParams()
    
    return (
        <SafeAreaView>
            <ThemedText>PokemonDetailsScreen</ThemedText>
        </SafeAreaView>
    )
}

export default PokemonDetailsScreen;
