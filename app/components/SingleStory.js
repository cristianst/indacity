import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

const SingleStory = ({storyKey, story}) => {
	return (
		<View style={styles.storyView}>
			<View style={styles.storyMainContent}>
				<View style={styles.storyContent}>
					<Text style={styles.storyText}>{story.content}</Text>
				</View>
				<View style={styles.storySection}>
					<FontAwesome name="heart-o" size={30} color='#e91e63' />
				</View>
			</View>
			<View style={styles.storyInfo}>
				<View style={styles.infoSection}>
					<FontAwesome name="heart" size={12} color='gray'/>
					<Text style={styles.mutedText}>{story.votes}</Text>
				</View>
				<View style={styles.infoSection}>
					<FontAwesome name="clock-o" size={12} color='gray' />
					<Text style={styles.mutedText}>{ moment(story.createdAt).fromNow()}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	storyView: {
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20,
	},
	storyMainContent: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	storyContent: {
		paddingRight: 10,
		flexShrink: 1
	},
	storyText: {
		fontSize: 18
	},
	storyInfo: {
		marginTop: 5,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	infoSection: {
		borderColor: 'red',
		borderWidth: 1,
		marginRight: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	mutedText: {
		fontSize: 12,
		color: 'gray',
		marginLeft: 5
	},
	storySection: {
		borderColor: 'red',
		borderWidth: 1
	}
});

export default SingleStory;
