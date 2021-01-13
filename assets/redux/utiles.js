export const getHeaders = (state) => {
    const headers = {
        'Content-Type': 'application/ld+json',
    }
    if (state().auth.authenticated)
        headers.Authorization = `Bearer ${state().auth.token}`
    return new Headers(headers)
}

export const getOpinionsFiltersURL = (
    pag = 1,
    user = "",
    before = null,
    strictlyBefore = null,
    after = null,
    strictlyAfter = null,
    reviewText = "") =>
{
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

    return url;
}

export const decodeLastPage = (page = "") => {
    let sol = "";
    for(let i = page.length - 1; page[i] !== '='; i--){
        sol += page[i];
    }

    var splitString = sol.split("");
    var reverseArray = splitString.reverse();

    return parseInt( reverseArray.join(""));
}

export const changePageNumberFromURL = (page, newValue) =>{
    let i = page.length;
    while(page[i] !== '=')
        i--;

    i++;
    let sol = page.slice(0, i);
    console.log(`CADENA PICADA = ${sol}`);
    return sol + newValue;
}