import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ListItem extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const post = this.props.post;
    return (
      <View style={styles.container}>
          <View>
            {post.images.length > 0   && post.images[0].cloudinary && <Image style={styles.image} source={{ uri: post.images[0].filename }} />}
            {post.images.length > 0   && !post.images[0].cloudinary && <Image style={styles.image} source={{ uri: 'https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C/image-size/original?v=v2&px=-1' }} />}
            {!post.images && <Image style={styles.image} source={{ uri: 'https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C/image-size/original?v=v2&px=-1' }} /> }
          </View>  
          <View style={styles.textContainer}>
            <Text 
              style={styles.description} 
              numberOfLines={3} 
              ellipsizeMode='tail'>
                {post.description}
            </Text>
            <View style={styles.iconContainer}>
                <Icon name="thumbs-up" size={30}  onPress={() => {this.props.click(this.props.index,'up')}}/>
                <Text style={styles.count}>{post.up_votes_count}</Text> 
                <Icon name="thumbs-down" size={30} color="#900" onPress={() => {this.props.click(this.props.index,'down')}} /> 
                <Text style={styles.count}>{post.down_votes_count}</Text> 
            </View>
          </View>
      </View>
                
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    marginTop: 20
  },
  textContainer:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  iconContainer:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly'
  },
  description:{
      fontSize: 18
  },
  image: {
    width: 100,
    height:100,
    marginRight: 5
  },
  count:{
    fontSize:15,
    margin: 5
  }
});