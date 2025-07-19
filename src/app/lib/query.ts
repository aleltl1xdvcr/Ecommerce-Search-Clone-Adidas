const { STRAPI_TOKEN, STRAPI_HOST_LOCAL } = process.env

export function queryRunningShoes(url: string) {
   return fetch(`${STRAPI_HOST_LOCAL}/api/runnings?${url}`, {
      headers: {
         Authorization: `bearer ${STRAPI_TOKEN}`
      }
   }).then(res => res.json())
}  

export function queryNav(url: string) {
   return fetch(`${STRAPI_HOST_LOCAL}/api/navigation-bar?${url}`, {
      headers: {
         Authorization: `bearer ${STRAPI_TOKEN}`
      }
   }).then(res => res.json())
}  

export function queryAlgolia(url: string) {
   return fetch(`${STRAPI_HOST_LOCAL}/api/items?${url}`, {
      headers: {
         Authorization: `bearer ${STRAPI_TOKEN}`
      }
   }).then(res => res.json())
} 

export function queryExample(url: string) {
   return fetch(`${STRAPI_HOST_LOCAL}/api/items?${url}`, {
      headers: {
         Authorization: `bearer ${STRAPI_TOKEN}`
      }
   }).then(res => res.json())
}  

export function queryExample2(url: string) {
   return fetch(`${STRAPI_HOST_LOCAL}/api/mens?filters[documentId][$eq]=${url}`, {
      headers: {
         Authorization: `bearer ${STRAPI_TOKEN}`
      }
   }).then(res => res.json())
} 