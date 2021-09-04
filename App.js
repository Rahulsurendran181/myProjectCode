import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Navigation from './Modules/Navigation/navigation';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'database.db' });
export default class App extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    this.sqliteTableCheckingForMyData()
  }

  sqliteTableCheckingForMyData = () => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='myData'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS myData(id	INTEGER NOT NULL,name	TEXT NOT NULL,username	TEXT NOT NULL,email	TEXT,address	TEXT,phone	TEXT,website	TEXT,company TEXT,profile_image TEXT,PRIMARY KEY("id"))',
              []
            );
          }
        }
      );
    })
  }

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  }
});