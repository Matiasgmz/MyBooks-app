import { Button, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LIVRES } from "../data/data";
import { CATEGORIES } from "../data/data";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

export default function Home() {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataBook, setDataBook] = useState(null);

    const handleLivrePress = (livre) => {
        setDataBook(livre);
    };

    const getCategoriesByIds = (ids) => {
        return CATEGORIES.filter((categorie) => ids?.includes(categorie.id));
    };

    return (

        <View style={{ flex: 1 }}>
            <ScrollView>

                <View style={styles.rowContainer}>
                    {LIVRES.map((livre, index) =>
                        <Pressable key={index} style={styles.card} onPress={() => { setModalVisible(true); handleLivrePress(livre) }}>
                            <Image source={{ uri: livre.imageUrl }} style={styles.image} />
                            <Text style={styles.titleCard}>{livre.titre}</Text>
                        </Pressable>
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

                      
                            <Text>{dataBook?.categorieId }</Text>
                            <Text style={styles.modalSubtitle}>Catégories:</Text>
                            {getCategoriesByIds(dataBook?.categories).map((categorie) => (
                                <Text key={categorie.id}>{categorie[1]}</Text>
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
        borderWidth: 1,
        borderColor: '#cccccc',
        marginTop: 10,
        backgroundColor: 'white',
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
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    titleCard: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 12,
        padding: 4
    },
    modalView: {
        margin: 20,
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
        borderRadius: 15
    }
})

