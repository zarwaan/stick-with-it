const urlRoot = import.meta.env.VITE_API_URL_ROOT;

export async function fetchRequest(endpoint,body=null,credentials=true,method="POST",headers={
    'content-type': 'application/json'
}){

    const options = {
        method: method,
        headers: headers
    }
    if(credentials)
        options.credentials = 'include'
    if(body)
        options.body = body

    const response = await fetch(`${urlRoot}/${endpoint}`,options);
    const result = await response.json();

    return {response, result}
}