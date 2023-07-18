import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { CheckBox } from '@rneui/themed';
import { CATEGORIES } from '../data/data';
import { Button } from 'react-native';

export default function AddBook() {

    const [checkedItems, setCheckedItems] = useState([]);
    const handleCheckboxChange = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !checkedItems[index];
        setCheckedItems(updatedCheckedItems);
    };
    return (
        <View style={{ flex: 1, marginTop: 50, padding: 20 }}>
            <ScrollView>
                <TextInput
                    placeholder='Nom'
                    style={styles.input}
                />
                <TextInput
                    placeholder='Tome'
                    style={styles.input}
                />

                <TextInput
                    placeholder='Image'
                    style={styles.input}
                />

                <TextInput
                    placeholder='Description'
                    style={styles.inputDesc}
                    multiline={true}
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

                <Button title='Ajouter' />


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