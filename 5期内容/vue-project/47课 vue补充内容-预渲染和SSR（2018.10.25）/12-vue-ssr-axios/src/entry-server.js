import { createApp } from './main'

export default context => {
  return new Promise((resolve, reject) => {

    const { app } = createApp()
    const router = app.$router

    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    router.push(url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      
      Promise.all(matchedComponents.map( component  => {
        if (component.serverRequest) {
          return component.serverRequest(app.$store)
        }
      })).then(() => {

        
        context.state = app.$store.state;
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
