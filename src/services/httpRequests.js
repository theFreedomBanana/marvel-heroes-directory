const PUBLICKEY = "6c3b02b3371becf9e0a3b670e224e35a"


const fetchData = function({
  url = "",
  requestParams = [],
  queryParams = {},
}) {
  const requestParamsStr = requestParams.length > 0 ? `/${requestParams.join("/")}` : ""
  const queryParamsStr = Object.keys(queryParams).map( key => (
    `&${key}=${queryParams[key]}`
  ))
    .join("")

  return fetch(`${url}${requestParamsStr}?apikey=${PUBLICKEY}${queryParamsStr}`)
    .then( res => res.json() )
}


export {
  fetchData,
}
