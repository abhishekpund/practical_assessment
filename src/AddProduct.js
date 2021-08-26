import React,{Component} from "react";
import {View,Text,StyleSheet,ToastAndroid} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Input,Select,CheckIcon,Button,useToast} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';

class AddProduct extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            cost: null,
            category: "",
            error: "",
            list: [],
        }
    }

    componentDidMount() {   
        this._get = this.props.navigation.addListener("focus", () => {
            this.checkData();
        });
    }

    componentWillUnmount() {
        this._get();
    }

    checkData = async () => {
        let keys = [];
        try {
            keys = await AsyncStorage.getAllKeys();
            if(keys.length != 0) {
                this.getData();
            }
        } catch(error) {
            console.error(error);
        }
    }

    getData = async () => {
        try {
            const list = await AsyncStorage.getItem("list");
            this.setState({ list: JSON.parse(list) });
        } catch(error) {
            console.error(error);
        }
    }

    setInfo = () => {
        if(!this.state.name && !this.state.cost && !this.state.category) {
            this.setState({ error: "Please fill all fields." });
        } else {
            this.setState({ error: "" });

            const info = {
                name: this.state.name, 
                cost: parseFloat(this.state.cost), 
                category: this.state.category
            };

            this.setState({ list: [ ...this.state.list, info ] }, () => this.saveProductInfo());
        }
    }

    saveProductInfo = async () => {
            try {
                await AsyncStorage.setItem("list", JSON.stringify(this.state.list));

                this.props.navigation.navigate("Product Lists");

                ToastAndroid.show(
                    "Product added successfully.",
                    ToastAndroid.SHORT
                );

                this.setState({
                    name: "",
                    cost: "",
                    category: "",
                });
            } catch(error) {
                this.setState({ error: "Something went wrong." });
                console.error(error);
            }
    }

    render () {
        const { name, cost, category, error } = this.state;

        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.containerStyle}>
                    <Input
                        value={name}
                        onChangeText={(text) => this.setState({ name: text })}
                        variant="underlined"
                        placeholder="Enter Name"
                        padding={0}
                        marginTop={10}  
                        width="90%" 
                        style={styles.textInputStyle}
                    />
                    
                    <Input
                        value={cost}
                        onChangeText={(text) => this.setState({ cost: text })}
                        variant="underlined"
                        placeholder="Enter Price"  
                        padding={0}  
                        marginTop={10}  
                        width="90%" 
                        style={styles.textInputStyle}
                        keyboardType="number-pad"
                    />

                    <Select
                        selectedValue={category}
                        width="90%"
                        borderWidth={0}
                        padding={0}
                        marginTop={10}
                        _text={{fontSize: 40}}  
                        placeholder="Select Category"
                        onValueChange={(itemValue) => this.setState({ category: itemValue })}
                        _selectedItem={{
                            bg: "cyan.600",
                            endIcon: <CheckIcon size={4} />,
                        }}
                    >
                        <Select.Item 
                            label="Clothes" 
                            value="Clothes" 
                            _text={{fontSize: 20}}
                        />
                        <Select.Item label="Electronics" value="Electronics" _text={{fontSize: 20}}/>
                        <Select.Item label="Beauty" value="Beauty" _text={{fontSize: 20}}/>
                    </Select>

                    <Button 
                        size="lg"
                        marginTop={10}
                        onPress={this.setInfo}
                    >
                        SAVE
                    </Button>

                    { error ? <Text style={styles.errorStyle}>{error}</Text> : null }
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1, 
        alignItems: "center", 
        backgroundColor: "#FFFFFF",
    },
    textInputStyle: {
        fontSize: 20,
    },
    errorStyle: {
        fontSize: 20,
        color:"#FF0000",
        marginTop: 10,
    },
});

export default AddProduct;