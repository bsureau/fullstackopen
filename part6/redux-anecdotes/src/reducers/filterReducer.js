const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER':
            state = action.payload.filter
            return state
        default:
            return state
    }
}

export const filterAction = (filter) => {
    return {
        type: 'FILTER',
        payload: {
            filter: filter
        }
    }
}


export default filterReducer
