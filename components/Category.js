import { StyleSheet, Text, View } from "react-native";
import { CATEGORIES } from "../data/data";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";



export default function Category() {
    const navigation = useNavigation();

    const handleCategoryPress = (categorie) => {
        navigation.navigate('Screen1', { categorie }); // Passer les informations de la catégorie via les props
    };
    return (
        <View>
            {CATEGORIES.map((categorie, index) =>
                <View style={styles.categorieContainer} key={index}>
                    <Text style={{color: categorie.couleur,  fontWeight: 'bold',fontSize: 50,}}> {categorie.genre.charAt(0).toUpperCase() + categorie.genre.slice(1)}</Text>
                    <Ionicons style={styles.iconClose} name="arrow-forward-circle-outline"  color={categorie.couleur} size={70}  onPress={() => handleCategoryPress(categorie)} />
                </View>
            )}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
