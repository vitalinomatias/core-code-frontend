export const get = async (endpoint, token) => {
    
    // const response = await fetch(`http://172.28.0.3:8500/${endpoint}/`,{
    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/${endpoint}/`,{
        headers:{
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    const data = await response.json()
    return data
}

export const post = async(endpoint, token, content)=> {
    // const response = await fetch(`http://172.28.0.3:8500/${endpoint}/`,{
    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/${endpoint}/`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            Authorization: token
          },
        body: JSON.stringify(content),
    })
    const data = await response.json()
    return data
}

export const getOne = async (endpoint, token, id) => {
    // const response = await fetch(`http://172.28.0.3:8500/${endpoint}/${id}`,{
    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/${endpoint}/${id}`,{
        headers:{
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    const data = await response.json()
    return data
}
