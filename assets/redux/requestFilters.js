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
        url === "/api/reviews?" ? (url += 'user=' + user.replace(/\//g,'%2F')) : (url += '&user=' + user.replace(/\//g,'%2F'));
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

export const getTDURLFilters = (
    pag = null,
    before = null,
    strictlyBefore = null,
    after = null,
    strictlyAfter = null,
    servicioEquipo = null
) =>{
    let url = "/api/turno-disponibles?";

    if(before)
        url === "/api/turno-disponibles?" ? (url += "date%5Bbefore%5D=" + before) : (url += "&date%5Bbefore%5D=" + before);
    if(strictlyBefore)
        url === "/api/turno-disponibles?" ? (url += "date%5Bstrictly_before%5D=" + strictlyBefore) : (url += "&date%5Bstrictly_before%5D=" + strictlyBefore);
    if(after)
        url === "/api/turno-disponibles?" ? (url += "date%5Bafter%5D=" + after) : (url += "&date%5Bafter%5D=" + after);
    if(strictlyAfter)
        url === "/api/turno-disponibles?" ? (url += "date%5Bstrictly_after%5D=" + strictlyAfter) : (url += "&date%5Bstrictly_after%5D=" + strictlyAfter);
    if(servicioEquipo)
        url === "/api/turno-disponibles?" ? (url += "servicioTaller=" + servicioEquipo.replace(/\//g,'%2F')) : (url += "&servicioTaller=" + servicioEquipo.replace(/\//g,'%2F'));
    if(pag)
        url === "/api/turno-disponibles?" ? ( url += 'page=' + pag) : (url += '&page=' + pag);

    return url;
}

export const getServiceFilters = (pag = null, nombreEquipo=null) =>{
    let url = "/api/servicios?";

    if(nombreEquipo)
        url += 'sePrestaAEquipo.equipo.nombre=' + nombreEquipo;
    if(pag)
        url === "/api/servicios?" ? ( url += 'page=' + pag) : (url += '&page=' + pag);

    return url;
}

export const getLikeReviewFilters = (pag = null, idUser = null, idReview = null) =>{
    let url = "/api/like-reviews?"

    if(idUser)
        url === "/api/like-reviews?" ? url += 'idUser=' + idUser.replace(/\//g,'%2F') : (url += '&idUser=' + idUser.replace(/\//g,'%2F'));
    if(idReview)
        url === "/api/like-reviews?" ? url += 'idReview=' + idReview.replace(/\//g,'%2F') : (url += '&idReview=' + idReview.replace(/\//g,'%2F'));
    if(pag)
        url === "/api/like-reviews?" ? (url += 'page' + pag) : (url += '&page=' + pag);

    return url;
}

export const getESFilters = (pag = null, servicio = null, equipo=null) =>{
    let url = "/api/equipo-servicios?";

    if(servicio)
        url === "/api/equipo-servicios?" ? url += 'servicio=' + servicio.replace(/\//g,'%2F') : (url += '&servicio=' + servicio.replace(/\//g,'%2F'));
    if(equipo)
        url === "/api/equipo-servicios?" ? url += 'equipo=' + equipo.replace(/\//g,'%2F') : (url += '&equipo=' + equipo.replace(/\//g,'%2F'));
    if(pag)
        url === "/api/like-reviews?" ? (url += 'page' + pag) : (url += '&page=' + pag);

    return url;
}

export const getTallerBrindaServicios = (page = null, idEquipo = null, idServicio = null) =>{
    let url = "/api/taller-brinda-servicios?";

    if(idEquipo)
        url === "/api/taller-brinda-servicios?" ? url += "servicioAEquipo.equipo=" + idEquipo.replace(/\//g, '%2F') : url += "&servicioAEquipo.equipo=" + idEquipo.replace(/\//g, '%2F');
    if(idServicio)
        url === "/api/taller-brinda-servicios?" ? url += "servicioAEquipo.servicio=" + idServicio.replace(/\//g, '%2F') : url += "&servicioAEquipo.servicio=" + idServicio.replace(/\//g, '%2F');
    if(page)
        url === "/api/like-reviews?" ? (url += 'page' + page) : (url += '&page=' + page);
    return url;
}