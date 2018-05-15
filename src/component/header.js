import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import { Button, Icon, Picker } from 'native-base';

export default class Header extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <View style={[styles.spinnerContainer, styles.horizontal]}>
            <Button success style={styles.button} onPress={() => {this.props.sortBy('created_at')}}>
                <Text>Recents</Text>
            </Button>
            <Button warning style={styles.button} onPress={() => {this.props.sortBy('up_votes_count')}}>
                <Text>Popular</Text>
            </Button>
            <Picker
                mode="dropdown"
                iosHeader="Select your filter"
                placeholder="Filter"
                style={{ height: 45, width: 70, borderWidth:1, borderColor:'black'}}
                onValueChange={itemValue => {this.props.filter(itemValue)}}>
                {this.props.categories.map(item => 
                    {
                        return ( <Picker.Item key="item" label={item} value={item} />);
                    })
                }
            </Picker>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    justifyContent: 'center',
    marginBottom: 5
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5
  },
  button: {
    paddingHorizontal: 10
  }
});
