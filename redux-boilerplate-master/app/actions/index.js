export const DATA_AVAILABLE = 'DATA_AVAILABLE'
export const QUOTES_AVAILABLE = 'QUOTES_AVAILABLE'
export const ADD_QUOTE = 'ADD_QUOTE'
export const UPDATE_QUOTE = 'UPDATE_QUOTE'
export const DELETE_QUOTE = 'DELETE_QUOTE'

const {AsyncStorage} = require('react-native')

// Import sample data
import Data from '../instructions.json'

export function getData() {
    return (dispatch) => {

        // Make API call
        setTimeout(() => {
            var data = Data.instructions
            dispatch({type: 'DATA_AVAILABLE', data:data})
        }, 2000)
    }
}

// Add quote - CREATE
export function addQuote(quote) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {

            if(quotes !== null) {
                quotes = JSON.parse(quotes)
                quotes.unshift(quote)
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                     dispatch({type: ADD_QUOTE, quote: quote})
                })
            }
        })
    }
}

// Get quote - READ 
export function getQuotes() {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if(quotes !== null) {
                dispatch({type: QUOTES_AVAILABLE, quotes: JSON.parse(quotes)})
            }
        })
    }
}

// Update quote - UPDATE
export function updateQuote(quote) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if(quotes !== null) {
                quotes = JSON.parse(quotes)

                let index = getIndex(quotes, quotes.id)
                if(index !== -1) {
                    quotes[index]['author'] = quote.author
                    quotes[index]['quote'] = quote.quote
                }

                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: UPDATE_QUOTE})
                })
            }
        })
    }
}

// Delete quote - DELETE
export function deleteQuote(id) {
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if(quotes !== null) {
                quotes = JSON.parse(quotes)

                let index = getIndex(quotes, id)
                if(index !== -1) {
                    quotes.splice(index, 1)
                }
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: DELETE_QUOTE, id:id})
                })
            }
        })
    }
}

function getIndex(data, id) {
    let clone = JSON.parse(JSON.stringify(data))
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id))
}