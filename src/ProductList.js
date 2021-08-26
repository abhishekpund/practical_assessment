import React,{Component} from "react";
import {Pressable,ScrollView,Text,StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Menu} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
import ListItem from "./components/common/ListItem";
import AsyncStorage from '@react-native-async-storage/async-storage';

const filterOptions = [
    { value: "aToz", type: "By name A to Z" },
    { value: "cost", type: "By price low to high" },
    { value: "category", type: "By category" }
];

class ProductList extends Component {
    constructor() {
        super();

        this.state = {
            list: [],
            filteredList: [],
            filterKey: "",
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => this.sortButton()
        });

        this.getData();

        this.setState({ filterKey: "" });
    }

    getData = async () => {
        try {
            const list = await AsyncStorage.getItem("list");

            this.setState({ list: JSON.parse(list) },() => {
                this.setState({ 
                    filteredList: [ ...this.state.list ]
                });
            });
        } catch(error) {
            console.error(error);
        }
    }

    showList = () => {
        if(this.state.filterKey === "category") { 
            return this.state.filteredList.map((item) => {
                return (
                    <View key={item.name} style={styles.viewStyle}>
                        <Text style={styles.nameTextStyle}>Name: {item.name}</Text>
                        <Text style={styles.priceStyle}>Price: {item.cost}</Text>
                    </View>   
                ); 
            })
        } else {
            if(this.state.filteredList.length != 0) {
                return this.state.filteredList.map((item) => {
                    var key = Math.random() * 1000;
                    return (
                        <ListItem
                            key={key}
                            name={item.name}
                            price={item.cost}
                            category={item.category}
                        />
                    );
                });
            } else {
                return (
                    <Text style={styles.textStyle}>No products found.</Text>
                );
            }
        }
    }

    sortButton = () => {
        return (
            <Menu
                trigger={(triggerProps) => {
                    return (
                        <Pressable 
                            accessibilityLabel="More options menu" 
                            {...triggerProps}
                        >
                            <Icon 
                                name="filter-sharp" 
                                size={30} 
                                color="#FFFFFF" 
                                style={{marginRight: 10}}
                            />
                        </Pressable>
                    );
                }}
            >
                {  
                    filterOptions.map((item) => {
                        return (
                            <Menu.Item 
                                key={item.value} 
                                onPress={() => {
                                    this.setState({ filterKey: item.value }, () => this.filterList());
                                }}
                            >
                                {item.type}
                            </Menu.Item>
                        );
                    }) 
                }
            </Menu>
        );
    }

    filterList = () => {
        switch(this.state.filterKey) {
            case "aToz": {
                var list1 = [];
                list1 = this.state.list.sort(function(a, b){
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                });
                this.setState({ filteredList: list1 });
            }
                break;

            case "cost": {
                var list2 = [];
                list2 = this.state.list.sort(function(a, b){return a.cost - b.cost});
                this.setState({ filteredList: list2 });
            }
                break;

            case "category": {
                var list3 = [];
                list3 = this.state.list.sort(function(a, b){
                    let x = a.category.toLowerCase();
                    let y = b.category.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                });
                this.setState({ filteredList: list3 });
            }
                break;

            default:
                return;
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    { this.showList() }
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        textAlign: "center",
        color:"#FF0000",
    },
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
    priceStyle: {
        fontSize: 18, 
        marginTop: 10
    },
})

export default ProductList;