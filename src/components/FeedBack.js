import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity as Btn } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'
import CommentIcon from 'react-native-vector-icons/FontAwesome'

import { connect } from 'react-redux'

//{ comment, hearto }
class FeedBack extends Component {

    state = {
        isLiked: false,
        disableLike: false
    }

    increaseLike = () => {
        this.setState({
            likes: this.state.likes + 1,
            isLiked: !this.state.isLiked,
            //disableLike: !this.state.disableLike
        })

        console.log(this.props)
    }
    render() {
        
        return (
            <View style={styles.container}>
                <Btn style={styles.button} onPress={() => this.increaseLike()}
                    disabled={this.state.disableLike}>
                    <Icon
                        name="hearto"
                        size={30}
                        color={this.state.isLiked ? '#F00' : null} />
                    <Text style={styles.text}>{this.props.likes}</Text>
                </Btn>
                <Btn style={styles.button} >
                    <CommentIcon name="comment-o" size={33} />
                    <Text style={styles.text}>{this.props.nComments}</Text>
                </Btn>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderColor: '#BBB'
    },
    button: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 3
    },
    text: {
        marginLeft: 5,
        fontSize: 12
    }
})

const mapStateToProps = ({ user }) => {
    return {
        name: user.name
    }
}

export default connect(mapStateToProps, null)(FeedBack)
//export default FeedBack