import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, KeyboardAvoidingView, Dimensions, TouchableOpacity, AsyncStorage, FlatList } from 'react-native'
import headerBackground from '../../assets/images/topBarBg.png'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon_AntDesign from 'react-native-vector-icons/AntDesign'
import viewCheckList from '../../assets/images/viewCheckList.png'
import { Avatar } from "react-native-elements";
import axios from 'axios';

const { width: WIDTH } = Dimensions.get('window')
import CompleteFlatList from 'react-native-complete-flatlist';

let SQLite = require('react-native-sqlite-storage');

let db = SQLite.openDatabase({ name: "database.db", location: "default", createFromLocation: '~www/database.db' });

export default class LoginScreenView extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "List",
        headerStyle: {
            backgroundColor: '#555CC4'
        },
        headerTintColor: '#fff',
        // headerBackground: '',
        headerTitleStyle: {
            fontSize: 20
        }
    })

    constructor() {
        super();
        this.state = {
            myList: []
        }
    }

    async componentDidMount() {
        this.getData()
    }

    getData = async () => {

        // const AuthStr = 'Bearer '.concat(this.state.token);
        let url = `http://www.mocky.io/v2/5d565297300000680030a986`
        axios.get(url)
            .then(response => {

                if (response.status == 200) {
                    this.setState({
                        myList: response.data
                    })
                    response.data.forEach(element => {
                        // this.selectDataExist(element)
                    });
                }

            })
            .catch(function (error) {
                alert(error)
            });
    }

    selectDataExist = (userData) =>{
        db.transaction((tx) => {
            tx.executeSql(
                'select * FROM myData where UPPER(username) = ? AND id = ?', [userData.username, Number(userData.id),],
                (tx, results) => {
                    if (results.rows.length == 0) {
                        this.insertChitDetailsInSqlLite(userData)
                    } 
                },
                (error) => {
                    
                }
            );
        });
    }

    insertChitDetailsInSqlLite = async (userData) => {

        try {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO myData (id, name, username, email, address,phone, website, company, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [number(userData.id), userData.name, userData.username, userData.email, userData.address, userData.phone, userData.website, userData.company, userData.profile_image],
                    (tx, results) => {
                        // console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {

                        }
                    },
                    (error) => {
                        alert(error)
                    }
                );
            });
        } catch (err) {
            // alert(err)
        }
    }

    renderMyUsers = (item, index) => {
        return (
            <View>
                <View style={{ backgroundColor: 'white', paddingLeft: '2.5%', paddingRight: '2.5%', paddingVertical: '1.5%' }}>
                    {/* <ScrollView style={{}} > */}

                    <View style={{}}>
                        {index == 0 &&
                            <View style={{ marginTop: 5 }} />
                        }

                        <View style={{ flexDirection: 'row', }}>

                            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: '2%' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('userDetailsScreen',{'userId': item.id})} >
                                    <Avatar
                                        rounded
                                        size={55}
                                        source={{ uri: (undefined != item.profile_image && item.profile_image != null) ? item.profile_image : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '75%', justifyContent: 'center' }} >
                                <TouchableOpacity>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View>
                                            <Text style={{ fontSize: 14 }}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <View>
                                    <Text style={{ fontSize: 14, fontFamily: 'Muli-Regular', fontWeight: 'bold' }}>
                                        {null != item.company && undefined != item.company.name ? item.company.name : ''}
                                    </Text>
                                </View>


                                <View>
                                    <View style={{ marginTop: 10 }} />
                                    <View
                                        style={{ width: '100%', borderBottomWidth: 0.5, }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }



    render() {
        return (
            <View style={styles.backgroundContainer}>
                <KeyboardAvoidingView>
                    <View style={{ height: '98%' }}>
                        <CompleteFlatList
                            searchKey={['name', 'email']}

                            data={this.state.myList}
                            renderItem={({ item, index }) => this.renderMyUsers(item, index)}
                            // renderItem={this.renderMyUsers}
                            ref={c => this.completeFlatList = c}
                            placeholder={'search'}
                            searchBarBackgroundStyles={{ backgroundColor: '#05559E' }}
                            persistentScrollbar={true}
                            onEndReachedThreshold={0.7}
                        />
                    </View>

                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        // flex: 1,
    },
    bottomView: {
        width: '100%',
        height: 50,
        backgroundColor: '#EE5407',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
    },
    inputContainer: {
        marginTop: 6,
    },
    input: {
        width: WIDTH - 55,
        height: 42,
        paddingLeft: 30,
        borderBottomWidth: 0.5,
        fontSize: 15,
        color: 'black',
    },
    inputPassword: {
        width: WIDTH - 55,
        height: 42,
        paddingLeft: 30,
        paddingRight: 30,
        borderBottomWidth: 0.5,
        fontSize: 15,
        color: 'black',
    },
    inputIconEmail: {
        position: 'absolute',
        left: 0,
        top: 8
    },
    inputIconPassword: {
        position: 'absolute',
        left: 3,
        top: 6
    },
    text: {
        color: 'white',
        fontSize: 14,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
    },
    btnLoginSubmit: {
        width: WIDTH - 55,
        fontSize: 14,
        //backgroundColor: '#8D8DAA',
        backgroundColor: '#334ED4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    deviceNotVerified: {
        width: WIDTH - 55,
        fontSize: 14,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    btnLoginDisable: {
        width: WIDTH - 55,
        fontSize: 14,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    btnEye: {
        position: 'absolute',
        right: 3,
        top: 10
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});