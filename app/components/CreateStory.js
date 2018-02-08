import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
	StyleSheet,
	Text,
	Button,
	View,
	TextInput
} from 'react-native';

export default class CreateStory extends Component {
	constructor(props){
		super(props);
		this.createStory = this.createStory.bind(this);
		this.state = {
			story: ''
		};
	}
	createStory(){
		const ref = firebase.database().ref('/stories');
		const userId = firebase.auth().currentUser.uid;
		for(let i=13; i < 21; i++){
			const storyText = `Story number ${i}`;
			const createdAt = new Date().getTime();

			const newStoryRef = ref.push();
			const storyKey = newStoryRef.key;

			newStoryRef.set({
				label: 'some label',
				createdBy: userId,
				createdAt,
				content: storyText,
				votes: i,
				storyKey
			});
		}
		//
		// const userId = firebase.auth().currentUser.uid;
		//
		// const storyText = this.state.story;
		// const story = {
		// 	label: 'lets see',
		// 	createdBy: userId,
		// 	createdAt,
		// 	content: storyText,
		// 	votes: 19,
		// };
		//
		// const story2 = {
		// 	label: 'lets see',
		// 	createdBy: userId,
		// 	createdAt,
		// 	content: 'ayeeeeee',
		// 	votes: 17,
		// };
		//
		// const newStoryRef = ref.push(story);
		// const storyKey = newStoryRef.key;
	}
	render(){
		return (
			<View style={styles.container}>
				<Text>Create Story</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={(story) => this.setState({story})}
				/>
				<Button title="Create Story" onPress={this.createStory} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	textInput: {
		width: 300,
		borderColor: 'gray',
		borderWidth: 1
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});
