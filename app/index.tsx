import { ActivityIndicator, FlatList, Image, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useInfiniteFetchQuery } from '@/hooks/useFetchQuery';
import PokemonCard from '@/components/PokemonCard';
import { getPokemonId } from '@/methods/getPokemonId';
import Searchbar from '@/components/Searchbar';
import { useState } from 'react';
import SortButton from '@/components/SortButton';
import Row from '@/components/Row';

export default function HomeScreen() {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<"id" | "name">("id")
  const colors = useThemeColor()
  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery("/pokemon?limit=21")
  const pokemonList = data?.pages.flatMap(page => page.results).map(r => ({name: r.name, id: getPokemonId(r.url)})) ?? []
  const filteredPokemonList = [...(search ? pokemonList.filter(p => p.name.includes(search.toLowerCase()) || p.id.toString() === search) : pokemonList).sort((a, b) => (a[sortKey] < b[sortKey]) ? -1 : 1)]

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <View style={styles.header}>
        <Image 
          source={require("@/assets/images/pokeball.png")}
          style={{width: 24, height: 24}}
         />
        <ThemedText type="headline">
          Pokédex
        </ThemedText>
      </View>
      <Row style={{gap:16, marginHorizontal: 12}}>
        <Searchbar value={search} onChange={setSearch}/>
        <SortButton value={sortKey} onChange={setSortKey}/>
      </Row>
      <View style={[styles.cardList, { backgroundColor: colors.grayWhite }]}>
      <FlatList
        data={filteredPokemonList}
        numColumns={3}
        contentContainerStyle={styles.cardListContainer}
        columnWrapperStyle={styles.gridGap}
        ListFooterComponent={
          isFetching ? <ActivityIndicator color={colors.tint}/> : null
        }
        onEndReached={search ? null : fetchNextPage}
        renderItem={({item}) => <PokemonCard 
            style={{flex: 1/3}}
            id={item.id}
            name={item.name}
          />}
          keyExtractor={(item) => item.id}
      />
      </View>
    </SafeAreaView>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
  },
  cardList: {
    flex: 1,
    borderRadius: 4,
  },
  gridGap: {
    gap: 8,
  },
  cardListContainer: {
    gap: 8,
    padding: 12
  }
});
