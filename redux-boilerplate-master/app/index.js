'use strict'

import React, {Component} from 'react'
import {View, AsyncStorage} from 'react-native'
import {StackNavigator} from 'react-navigation'

import Home from './components/home_quote'
import NewQuote from './components/new_quote'

import Data from './quotes.json'
import {connect} from 'react-redux'
import {getQuotes} from './actions'

// Scene Style
const getSceneStyle = (props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
    }
    return style;
};

const AppNavigation = StackNavigator(
    {
        Home: {
            screen: Home,
        },
        Quote: {
            screen: NewQuote,
        }
    },
    {
        initialRouteName: 'Home'
    }
)

class Main extends Component {

    componentDidMount() {
        let _this = this

        AsyncStorage.getItem('data', (err, data) => {
            if(data === null) {
                AsyncStorage.setItem('data', JSON.stringify(Data.quotes))
                _this.props.getQuotes()
            }
        })
    }

    render() {
        return <AppNavigation />
    }
}

function mapStateToProps(state, props) {
    return {}
}

export default connect(mapStateToProps, {getQuotes})(Main)