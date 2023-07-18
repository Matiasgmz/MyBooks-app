import { Pressable, StyleSheet, Text, View } from "react-native";
import { CATEGORIES } from "../data/data";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";



export default function Category() {
    const navigation = useNavigation();

    const handleCategoryPress = (categorie) => {
        if (categorie === 'Tous les livres') {

            navigation.navigate('Home');
        } else {

            navigation.navigate('BookByCategorie', { categorie });
        }
    };
    return (
        <View style={{ flex: 1, marginTop: 50 }}>
            {CATEGORIES.map((categorie, index) =>
                <Pressable style={styles.categorieContainer} key={index} onPress={() => handleCategoryPress(categorie)}>
                    <Text style={{ color: categorie.couleur, fontWeight: 'bold', fontSize: 50, }}> {categorie.genre.charAt(0).toUpperCase() + categorie.genre.slice(1)}</Text>
                    <Ionicons style={styles.iconClose} name="arrow-forward-circle-outline" color={categorie.couleur} size={70} />
                </Pressable>
            )}

            <Pressable style={styles.categorieContainer}  onPress={() => handleCategoryPress('Tous les livres')}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 50, }}> Tous</Text>
                <Ionicons style={styles.iconClose} name="arrow-forward-circle-outline" color={'black'} size={70} />
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    categorieText: {
        fontWeight: 'bold',
        fontSize: 50,
    },
    categorieContainer: {
        padding: 2,
        borderWidth: 1,
        borderColor: '#cccccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
