import React from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import { LIVRES } from '../data/data'

export default function BooksByCategory({ route }) {
  return (

    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 50, color: route.params.categorie.couleur }}>{route.params.categorie.genre.charAt(0).toUpperCase() + route.params.categorie.genre.slice(1)}</Text>

      <View style={styles.rowContainer}>
        {LIVRES.filter((livre) => livre.categorieId.includes(route.params.categorie.id)).map((livre, index) => (
          <View style={styles.card}>
            <Image source={{ uri: livre.imageUrl }} style={styles.image} />
            <Text style={styles.titleCard}>{livre.titre}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({

  image: {
    width: 180,
    height: 280,
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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

  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },


})