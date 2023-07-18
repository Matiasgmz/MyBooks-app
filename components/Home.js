import { Button, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LIVRES } from "../data/data";
import { CATEGORIES } from "../data/data";
import { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


export default function Home() {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataBook, setDataBook] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLivres, setFilteredLivres] = useState([]);



    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Récupérer les livres depuis AsyncStorage lors du chargement du composant
        fetchBooksFromAsyncStorage();
    }, []);

    useEffect(() => {

        saveBooksToAsyncStorage();
    }, [books]);

    const fetchBooksFromAsyncStorage = async () => {
        try {
            const storedBooks = await AsyncStorage.getItem('books');
            if (storedBooks) {
                setBooks(JSON.parse(storedBooks));
            }
            console.log(await AsyncStorage.getItem('books'))
        } catch (error) {
            console.log('Erreur lors de la récupération des livres depuis AsyncStorage:', error);
        }
    };

    const saveBooksToAsyncStorage = async () => {
        try {
            await AsyncStorage.setItem('books', JSON.stringify(books));
            console.log('Livres save');
        } catch (error) {
            console.log('Erreur:', error);
        }
    };

    const handleLivrePress = (livre) => {
        setDataBook(livre);
        setSearchQuery('');
    };


    const getCategoriesByIds = (ids) => {
        return CATEGORIES.filter((categorie) => ids?.includes(categorie.id));
    };

    const handleSearch = () => {
        const filteredLivres = LIVRES.filter((livre) =>
            livre.titre.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredLivres(filteredLivres);
    };

    return (

        <View style={{ flex: 1, marginTop: 50 }}>
            <ScrollView>

                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Rechercher un livre"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => handleSearch()}
                    >
                        <Ionicons name="search-outline" color={'white'} size={20} />

                    </TouchableOpacity>
                </View>

                <View style={styles.rowContainer}>
                    {filteredLivres.length > 0 ? (
                        filteredLivres.map((livre, index) => (
                            <Pressable key={index} style={styles.card} onPress={() => { setModalVisible(true); handleLivrePress(livre) }}>
                                <Image source={{ uri: livre.imageUrl }} style={styles.image} />
                                <Text style={styles.titleCard}>{livre.titre}</Text>
                            </Pressable>
                        ))
                    ) : (
                        LIVRES.map((livre, index) => (
                            <Pressable key={index} style={styles.card} onPress={() => { setModalVisible(true); handleLivrePress(livre) }}>
                                <Image source={{ uri: livre.imageUrl }} style={styles.image} />
                                <Text style={styles.titleCard}>{livre.titre}</Text>
                            </Pressable>
                        ))
                    )}
                </View>

                <Modal visible={modalVisible} animationType="fade" style={styles.modalView} transparent={true}>

                    <View style={styles.modalView}>
                        <View style={styles.containerIcons}>
                            <Ionicons style={styles.iconClose} name="close-outline" onPress={() => setModalVisible(false)} color={'red'} size={45} />
                        </View>


                        <View style={styles.modalContent}>
                            <Text style={styles.titleModal}>{dataBook?.titre}</Text>

                            <Text style={styles.textTome}>tome : {dataBook?.tomes}</Text>
                            <Text>{dataBook?.description} </Text>


                            <Text>{dataBook?.categorieId}</Text>
                            <Text style={styles.modalSubtitle}>Catégories:</Text>
                            {getCategoriesByIds(dataBook?.categoriesId).map((categorie) => (
                                <Text key={categorie.id}>{categorie.genre}</Text>
                            ))}

                        </View>


                    </View>
                </Modal>

            </ScrollView>



        </View>
    )
}


const styles = StyleSheet.create({

    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },

    card: {
        textAlign: 'center',
        borderWidth: 0,
        borderColor: '#cccccc',
        marginTop: 10,
        backgroundColor: 'transparent',
        borderRadius: 15,
        paddingBottom: 15,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    image: {
        width: 180,
        height: 280,
        resizeMode: 'cover',
        borderRadius: 15
    },

    titleCard: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 12,
        padding: 4,
        color: 'rgba(0, 0, 0, 0.7)'
    },
    modalView: {
        margin: 50,
        marginTop: 100,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    containerIcons: {
        width: '100%',
        alignItems: 'flex-end',
        padding: 0
    },
    modalContent: {
        padding: 25,
        alignItems: 'center',
    },

    titleModal: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 4,
        marginBottom: 18
    },

    textTome: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        borderColor: 'yellow',
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'yellow',
        borderRadius: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: '#1da1f2',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

