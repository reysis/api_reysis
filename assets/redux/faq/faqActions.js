import { FAQ_LIST_REQUEST, FAQ_LIST_SUCCESS, FAQ_LIST_ERROR } from './faqTypes'
import { fetch } from '../../utils/dataAccess'

export const faqRequest = () => {
    return {
        type: FAQ_LIST_REQUEST
    };
}

export const faqSuccess = (faqs) => {
    return {
        type: FAQ_LIST_SUCCESS,
        payload: faqs
    };
}

export const faqError = (error) => {
    return {
        type: FAQ_LIST_ERROR,
        payload: error
    };
}

export const faqFetch = (page = "/api/f-a-qs") => dispatch => {
    dispatch(faqRequest());

    fetch(page)
        .then(res => res.json())
        .then(res => {
            const response = []
            res['hydra:member'].forEach(value => {
                let category = value['category']
                if (!category || category.length == 0)
                    category = "General"
                const values = {
                    id: value['@id'],
                    question: value['question'],
                    answer: value['answer']
                }
                const categoryIndex = response.findIndex((cat) => (cat.category == category))
                if (categoryIndex == -1)
                    response.push({
                        category,
                        faqCategory: [values]
                    })
                else
                    response[categoryIndex].faqCategory.push(values)
            })
            dispatch(faqSuccess(response))
        })
        .catch(error => {
            dispatch(faqError(error.message))
        })
}
