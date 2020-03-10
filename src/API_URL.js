export default getApiUrl()

function getApiUrl() {
  if (window.location.hostname.indexOf('staging') !== -1) {
    return 'https://gmrapi-staging.herokuapp.com'
  } else if (window.location.hostname.indexOf('goldenmountainrunners') !== -1) {
    return 'https://gmrapi-staging.herokuapp.com'
  } else return 'http://localhost:3030'
}
