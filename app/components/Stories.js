import React, { Component } from 'react';
import { Location } from 'expo';
import _ from 'lodash';
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	FlatList
} from 'react-native';

import * as firebase from 'firebase';
import SingleStory from './SingleStory';

export default class Stories extends Component {
	constructor(props){
		console.ignoredYellowBox = ['Remote debugger'];
		super(props);
        this.state = {
            geoCode: null,
			loading: false,
			stories: null
        };
        this.getGeocode = this.getGeocode.bind(this);
		this.getStories = this.getStories.bind(this);
		this.fetchMoreStories = this.fetchMoreStories.bind(this);
		this.renderFooter = this.renderFooter.bind(this);
	}
    componentWillMount(){
        this.getGeocode();
    }
    componentDidMount(){
    	this.getStories();
    }
	fetchMoreStories(){
		const { lastLowestVote, lastKey, stories:currentStories } = this.state;
		const ref = firebase.database().ref('/stories').orderByChild(this.props.orderBy);
		this.setState({
			loading: true
		});
		console.log("end reached.. loading");
		console.log(this.state);
		firebase.database().ref('/stories').orderByChild(this.props.orderBy)
		//last vote, last key
		// 6, 5 , >4< , 3 , 2, 1
		//.endAt(4, "-L30a5NoMV7ZnNGl0oQW")
		.endAt(lastLowestVote, lastKey)
		.limitToLast(10)
		.once('value')
		.then(snapshot => {
			const stories = snapshot.val();
			const pairs = _.map(stories, (value, key) =>  {
				return [key, value];
		    });

			const sortedStories = _.sortBy(pairs, (pair) => {
				return pair[1].votes
			}).reverse();

			// remove first item of sorted array
			// firebase sucks and includes it because of 'endAt'

			sortedStories.shift();
			console.log(sortedStories);

			const lastStory = sortedStories[sortedStories.length - 1][1];

			const newStories = _.merge(currentStories, sortedStories);

			console.log(newStories);
            //
			// this.setState({
			// 	stories: newStories,
			// 	lastLowestVote: lastStory.votes,
			// 	loading: false,
			// 	lastKey: lastStory.storyKey
			// });
            //
			// console.log(this.state);
		});

	}
	getStories(){
		const ref = firebase.database().ref('/stories').orderByChild(this.props.orderBy);
        firebase.database().ref('/stories').orderByChild(this.props.orderBy)
		.limitToLast(10)
        .once('value')
        .then( snapshot => {
            const stories = snapshot.val();
			const pairs = _.map(stories, (value, key) =>  {
				return [key, value];
		    });

			const sortedStories = _.sortBy(pairs, (pair) => {
				return pair[1].votes
			}).reverse();

			const lastStory = sortedStories[sortedStories.length - 1][1];

			this.setState({
				stories: sortedStories,
				lastLowestVote: lastStory.votes,
				lastKey: lastStory.storyKey
			});

        })
        .catch( e => console.log(e));
	}
    async getGeocode(){
        const location = this.props.location;
        let geoCode = await Location.reverseGeocodeAsync(location.coords);
        this.setState({ geoCode: geoCode[0]});
    }
	renderFooter(){
		if (!this.state.loading) {
			console.log(this.state.loading);
			return null;
		}
		return (
			<View
				style={{
					paddingVertical: 20,
					borderTopWidth: 1,
					borderColor: "#CED0CE"
				}}
			>
				<ActivityIndicator animating size="large" />
  			</View>
		);
	}
	onEndReached(){
		console.log('end reached');
	}
	render(){
        const { geoCode, stories } = this.state;

        if (!stories){
            return null;
        }
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>{geoCode.city.toUpperCase()}</Text>
				</View>
				<FlatList
					data={stories}
					style={styles.flatList}
					keyExtractor={(item) => item[0]}
					onEndReached={this.fetchMoreStories}
					onEndReachedThreshold={0.1}
					ItemSeparatorComponent={ () => (
						<View style={styles.itemSeparator}></View>
					)}
					ListFooterComponent={this.renderFooter}
					renderItem={({item}) => (
						<SingleStory key={item[0]} storyKey={item[0]} story={item[1]} />
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	flatList: {
		borderColor: 'red',
		borderBottomWidth: 1
	},
	container: {
		flex: 1,
		paddingTop: 20
	},
	header: {
		alignItems: 'center',
		backgroundColor: '#e91e63',
		paddingTop: 10,
		paddingBottom: 10
	},
	headerText: {
		color: 'white',
		fontWeight: 'bold'
	},
	itemSeparator: {
		height: 1,
		backgroundColor: "#CED0CE"
	}
});
