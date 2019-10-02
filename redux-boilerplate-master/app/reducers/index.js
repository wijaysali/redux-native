import { combineReducers } from 'redux'
import {ADD_QUOTE, DATA_AVAILABLE, UPDATE_QUOTE, QUOTES_AVAILABLE, DELETE_QUOTE} from "../actions";

let dataState = { data: [], loading: true}

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, {data: action.data, loading: false})
            return state

        case ADD_QUOTE:
            let quotes = cloneObject(state.quotes)
            quotes.unshift(action.quote)
            state = Object.assign({}, state, {quotes: quotes})
            return state

        case QUOTES_AVAILABLE:
            state = Object.assign({}, state, {quotes: action.quotes, loading: false})
            return state

        case UPDATE_QUOTE:
            let quote = action.quote
            var quotes = cloneObject(state.quotes)
            let index = getIndex(quotes, quote.id)
            if(index !== -1) {
                quotes[index]['author'] = quote.author
                quotes[index]['text'] = quote.text
            }
            state = Object.assign({}, state, {quotes: quotes})
            return state

        case DELETE_QUOTE:
            var quotes = cloneObject(state.quotes)
            var index = getIndex(quotes, action.id)
            if(index !== -1) {
                quotes.splice(index, 1)
            }
            state = Object.assign({}, state, {quotes: quotes})
            return state

        default:
            return state
    }
}

function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

// Combine all reducers
const rootReducer = combineReducers({
    dataReducer
})

export default rootReducer