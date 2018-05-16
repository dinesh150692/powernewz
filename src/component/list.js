import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  RefreshControl
} from 'react-native';
import ListItem from './listitem';

export default class List extends Component {
  constructor(props){
    super(props);
    this._onRefresh = this._onRefresh.bind(this);
  }

  _onRefresh(){
    this.props.refresh();
  }

  render() {
    return (
        <View style={{flex:1}}>
            {this.props.posts
              ?
                <View>
                  {this.props.posts.length > 0 && 
                    <FlatList
                      keyExtractor={(item) => item.id + ''}
                      data={this.props.posts}
                      extraData={this.props}
                      refreshControl={
                        <RefreshControl
                            refreshing={this.props.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            title="Pull to refresh"
                            tintColor="#673ab7"
                            titleColor="#673ab7"
                            progressBackgroundColor="#673ab7"
                            colors={['white']}
                        />
                      }
                      renderItem={({item, index}) => {
                        return ( 
                          <View>
                            { !item.hidden && <ListItem key={item.id} post={item} index={index} click={this.props.handleLikes}/> }
                          </View>
                        );
                      }}
                    >  
                    </FlatList>
                  }
                </View>
              :
              <Text>
                { this.props.error ? this.props.error : "No post Available" }
              </Text> 
            }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
});
