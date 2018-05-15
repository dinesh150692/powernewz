import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import List from './src/component/list';
import Header from './src/component/header';
import Loader from './src/component/loader';
import { POST_API } from './shared/Constants';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: [],
      loading: true,
      error: false,
      categoriesFilter: [],
      refresh: false
    }
    this.handleLikes = this.handleLikes.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.filter = this.filter.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    if(!this.state.refresh){
      this.setState({loading: true});
    }
    let options = this.setOptions({});
    fetch(POST_API, options)
      .then(response => {
        return response.json()
      })
      .then(data  => {
        this.fetchCategories(data.posts);
       }).catch( error => {
        this.setState({ error: 'Internal Server Error, Retry again..', loading: false, refresh: false});
      });
  }

  fetchCategories(posts){
    let categories = new Set();
    posts = posts.map( post => {
      post['hidden'] = false;
      post.categories.map( category => {
        categories.add(category.name);
      });
      return post;
    });
    categories = Array.from(categories);
    this.setState({ categoriesFilter: categories, posts: posts, loading: false, refresh: false});
  }

  setOptions = (data) => {
    let options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    };
    return options;
  }

  handleLikes(index,value){
    let posts  = this.state.posts;
    let count  = posts[index];
    if(value === "up"){
      posts[index].up_votes_count +=1 
    }else{
      posts[index].down_votes_count += 1;
    }
    this.setState({posts: posts});
  }

  refreshData(){
    this.setState({refresh: true},() => {
      this.fetchData();
    });
  }

 filter(value){
  let posts = this.state.posts;
  posts = posts.map( post => {
    let count = 0; 
    post.categories.map( category => {
      if(category.name === value){
        count += 1;
      }
    });
    post['hidden'] = count ? false : true;
    return post;
  });
  this.setState({ posts: posts});  
 }

 sortBy(value){
    let {posts} = this.state;
    posts.sort(function(a,b){
      if(a[value] < b[value]){
        return 1;
      }else if(a[value] > b[value]){
        return -1;
      }else{ 
        return 0;
      }
    });

    this.setState({ posts});
 }
  render() {
    return (
      <View style={styles.container}>
        { this.state.loading 
          ? 
            <Loader /> 
          : 
            <View style={{flex:1}}>
              <Header 
                categories={this.state.categoriesFilter} 
                filter={this.filter}
                sortBy={this.sortBy}
              />      
              <List 
                posts={this.state.posts} 
                error={this.state.error} 
                handleLikes={this.handleLikes} 
                refresh={this.refreshData}
                refreshing={this.state.refresh}
              /> 
            </View>
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 20
  },
  description:{
    fontSize: 12,
    margin: 3,
    width: 200
  }
});