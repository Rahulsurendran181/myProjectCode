import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import { Avatar } from "react-native-elements";

const { width: WIDTH } = Dimensions.get('window')

let SQLite = require('react-native-sqlite-storage');

let db = SQLite.openDatabase({ name: "database.db", location: "default", createFromLocation: '~www/database.db' });
console.disableYellowBox = true;

export default class UserDetailsScreenView extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "User Details",
        headerStyle: {
            backgroundColor: '#555CC4'
        },
        headerTintColor: '#fff',

        headerTitleStyle: {
            fontSize: 20
        }
    })

    constructor() {
        super();
        this.state = {
            value: {},
            userId: '',
        }
    }

    componentDidMount = async () => {

        this.loadLocalDb();
    }

    loadLocalDb = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM myData where id = ?', [number(userId)], (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                    let row = results.rows.item(0);
                    const { id, name, username, email, address, phone, website, company, profile_image } = row;
                    let tempData{
                        "id": id,
                        "name": name,
                        "username": username,
                        "email": email,
                        "address": JSON.stringify(address),
                            "phone": phone,
                                "website": website,
                                    "company": JSON.stringify(company),
                                        "profile_image": profile_image
                }
                this.setState({
                    value: tempData
                })

            } else {


                }
            });
    });
}



render() {

    const { navigation } = this.props;
    this.state.userId = navigation.getParam('userId', '');

    return (
        <View style={styles.backgroundContainer}>

            <KeyboardAvoidingView>
                <View style={{ backgroundColor: 'white', paddingLeft: '2.5%', paddingRight: '2.5%', paddingVertical: '1.5%' }}>
                    {/* <ScrollView style={{}} > */}

                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: '2%' }}>
                                <Avatar
                                    rounded
                                    size={55}
                                    source={{ uri: (undefined != this.state.value.profile_image && this.state.value.profile_image != null) ? this.state.value.profile_image : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
                            </View>
                        </View>
                        <View style={{}}>
                            <View>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    {this.state.value.name}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: '15%' }}>
                            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ fontSize: 14 }}>
                                    Address :
                                    </Text>
                            </View>

                            <View style={{ width: '50%', justifyContent: 'center', }}>
                                <Text style={{ fontSize: 14, }}>
                                    {this.state.value.address.street}
                                </Text>
                                <Text style={{ fontSize: 14, }}>
                                    {this.state.value.address.suite}
                                </Text>
                                <Text style={{ fontSize: 14, }}>
                                    {this.state.value.address.city}
                                </Text>
                                <Text style={{ fontSize: 14, }}>
                                    {this.state.value.address.zipcode}
                                </Text>
                                <Text style={{ fontSize: 14, }}>
                                    GEO : lat : {this.state.value.address.geo.lat}, lat : {this.state.value.address.geo.lng}
                                </Text>


                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: '5%' }}>
                            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ fontSize: 14 }}>
                                    username :
                                    </Text>
                            </View>

                            <View style={{ width: '50%', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, }}>
                                    {this.state.value.username}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: '5%' }}>
                            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ fontSize: 14 }}>
                                    Email :
                                    </Text>
                            </View>

                            <View style={{ width: '50%', justifyContent: 'center', }}>
                                <Text style={{ fontSize: 14, }}>
                                    {this.state.value.email}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: '5%' }}>
                            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ fontSize: 14 }}>
                                    Phone :
                                    </Text>
                            </View>

                            <View style={{ width: '50%', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, }}>
                                    {this.state.value.phone != null ? this.state.value.phone : ''}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: '5%' }}>
                            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ fontSize: 14 }}>
                                    website :
                                    </Text>
                            </View>

                            <View style={{ width: '50%', justifyContent: 'center', }}>
                                <Text style={{ fontSize: 14, }}>
                                    {this.state.value.website != null ? this.state.value.website : ''}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: '5%' }}>
                            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ fontSize: 14 }}>
                                    Company :
                                    </Text>
                            </View>

                            <View style={{ width: '50%', justifyContent: 'center', }}>
                                {this.state.value.company != null &&
                                    <View>
                                        <Text style={{ fontSize: 14, }}>
                                            {this.state.value.company.name}
                                        </Text>
                                        <Text style={{ fontSize: 14, }}>
                                            {this.state.value.company.catchPhrase}
                                        </Text>
                                        <Text style={{ fontSize: 14, }}>
                                            {this.state.value.company.bs}
                                        </Text>
                                    </View>
                                }
                            </View>
                        </View>

                    </View>
                </View>

            </KeyboardAvoidingView>
        </View>
    );
}
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: 'white',
        // alignItems: 'center',
        flex: 1,
    },

});