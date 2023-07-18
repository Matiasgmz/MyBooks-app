import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { CheckBox } from '@rneui/themed';
import { CATEGORIES } from '../data/data';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LIVRES } from '../data/data';



export default function AddBook() {

    const [titre, setTitre] = useState('');
    const [tomes, setTomes] = useState('');
    const [imageUrl, setImage] = useState('');
    const [description, setDescription] = useState('');

    const [checkedItems, setCheckedItems] = useState([]);
    const handleCheckboxChange = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !checkedItems[index];
        setCheckedItems(updatedCheckedItems);
    };

    const handleAddBook = async () => {
        const newBook = {
    
            titre,
            description,
            tomes,
            imageUrl,
            categories: CATEGORIES.filter((_, index) => checkedItems[index]).map(categorie => categorie.id),
        };

        try {
            const existingBooks = await AsyncStorage.getItem('books');
            const books = existingBooks ? JSON.parse(existingBooks) : [];

            const filteredBooks = LIVRES.filter(livre => !books.some(existingBook => existingBook.nom === livre.nom));

            books.push(...filteredBooks);

            books.push(newBook);

            await AsyncStorage.setItem('books', JSON.stringify(books));
        

            console.log(await AsyncStorage.getItem('books'))
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <View style={{ flex: 1, marginTop: 50, padding: 20 }}>
            <ScrollView>
                <TextInput
                    placeholder='Nom'
                    style={styles.input}
                    value={titre}
                    onChangeText={setTitre}
                />
                <TextInput
                    placeholder='Tome'
                    style={styles.input}
                    value={tomes}
                    onChangeText={setTomes}
                />
                <TextInput
                    placeholder='Image'
                    style={styles.input}
                    value={imageUrl}
                    onChangeText={setImage}
                />
                <TextInput
                    placeholder='Description'
                    style={styles.inputDesc}
                    multiline={true}
                    value={description}
                    onChangeText={setDescription}
                />

                <View style={{ marginBottom: 50 }}>
                    {CATEGORIES.map((categorie, index) =>

                        <CheckBox
                            key={index}
                            checked={checkedItems[index] || false}
                            onPress={() => handleCheckboxChange(index)}
                            iconType="material-community"
                            checkedIcon="checkbox-outline"
                            uncheckedIcon={'checkbox-blank-outline'}

                            title={categorie.genre}
                        />
                    )}
                </View>

                <Button title='Ajouter' onPress={handleAddBook} />


            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    inputDesc: {
        flex: 1,
        height: 100,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },

})