export const getHeaders = (state) => {
    const headers = {
        'Content-Type': 'application/ld+json',
    }
    if (state().auth.authenticated)
        headers.Authorization = `Bearer ${state().auth.token}`
    return new Headers(headers)
}
