import { OPINIONS_LIST_REQUEST, OPINIONS_LIST_SUCCESS, OPINIONS_LIST_ERROR } from './opinionListTypes'
import { fetch } from '../../../utils/dataAccess'

export const opinionRequest = () => {
    return {
        type: OPINIONS_LIST_REQUEST
    }
}

export const opinionSuccess = (opinions) => {
    return {
        type: OPINIONS_LIST_SUCCESS,
        payload: opinions
    }
}

export const opinionError = (error) => {
    return {
        type: OPINIONS_LIST_ERROR,
        payload: error
    }
}

export const opinionFetch = (
    pag = 1,
    user = "",
    before = null,
    strictlyBefore = null,
    after = null,
    strictlyAfter = null,
    reviewText = ""
) => async dispatch => {
    dispatch(opinionRequest());

    let url = "/api/reviews?";

    if(user !== ""){
        url === "/api/reviews?" ? (url += 'user=' + user.replace('/','%2F')) : (url += '&user=' + user.replace('/','%2F'));
    }
    if(before)
        url === "/api/reviews?" ? (url += "datePublished%5Bbefore%5D=" + before) : (url += "&datePublished%5Bbefore%5D=" + before);
    if(strictlyBefore)
        url === "/api/reviews?" ? (url += "datePublished%5Bstrictly_before%5D=" + strictlyBefore) : (url += "&datePublished%5Bstrictly_before%5D=" + strictlyBefore);
    if(after)
        url === "/api/reviews?" ? (url += "datePublished%5Bafter%5D=" + after) : (url += "&datePublished%5Bafter%5D=" + after);
    if(strictlyAfter)
        url === "/api/reviews?" ? (url += "datePublished%5Bstrictly_after%5D=" + strictlyAfter) : (url += "&datePublished%5Bstrictly_after%5D=" + strictlyAfter);
    if(reviewText !== "")
        url === "/api/reviews?" ? (url += "reviewText=" + reviewText) : (url += "&reviewText=" + reviewText);

    url === "/api/reviews?" ? ( url += 'page=' + pag) : (url += '&page=' + pag);
    try {
        const review_resp = await fetch(url);
        const reviews = await review_resp.json();

        const responce = reviews['hydra:member'].map(value => {

            value.image = ''
            value.autor = '[Author]'

            return {
                ...value,
                id: value['@id']
            }
        })

        /*for (let i = 0; i < responce.length; i++) {
            try {
                const userLocation = responce[i].user
                const user_resp = await fetch(userLocation);
                const user = await user_resp.json();

                if (user.persona.nombre)
                    responce[i].autor = user.persona.nombre
            }
            catch (error) {
                console.error(error.message)
            }
        }*/

        dispatch(opinionSuccess(responce));
    }
    catch (error) {
        console.error(error.message)
        dispatch(opinionError(error.message));
    }
}
