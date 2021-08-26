import React from "react";
import {View,Text,StyleSheet} from "react-native";

const ListItem = ({ name, price, category }) => {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.nameTextStyle}>Name: {name}</Text>
            <Text style={styles.textStyle}>Price: {price}</Text>
            <Text style={styles.textStyle}>Category: {category}</Text>
        </View>    
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        padding: 15,
        width: "95%",
        borderWidth: 1,
        borderColor: "#a3a3a3",
        marginTop: 10,
        alignSelf:"center",
        borderRadius: 5,
    },
    nameTextStyle: {
        fontSize: 20, 
        color:"#4338ca",
        fontWeight:"bold",
    },
    textStyle: {
        fontSize: 18, 
        marginTop: 10
    },
});

export default ListItem;