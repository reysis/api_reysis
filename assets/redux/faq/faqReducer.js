import { FAQ_LIST_REQUEST, FAQ_LIST_SUCCESS, FAQ_LIST_ERROR } from './faqTypes'

const initialState = {
	loading: false,
	faqs: [],
	error: ''
}

const faqReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case FAQ_LIST_REQUEST:
			return {
				...state,
				loading: true
			}
		case FAQ_LIST_SUCCESS:
			return {
				loading: false,
				faqs: payload,
				error: ''
			}
		case FAQ_LIST_ERROR:
			return {
				loading: false,
				faqs: [],
				error: payload
			}
		default:
			return state
	}
}

export default faqReducer