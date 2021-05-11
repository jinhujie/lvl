import jsonp from "jsonp";

export default class Http {
  get (url, options) {
    let { params } = options;
    if (!params) {
      params = {}
    }

    Object.keys(params).forEach(key => {
      const value =params[key];
      if (url.indexOf('?') !== -1) {
        url += `&${key}=${value}`
      } else {
        url += `?${key}=${value}`
      }
    })

    return new Promise((resolve, reject) => {
      jsonp(url, null, (err, data) => {
        if (err) {
          console.error(err.message);
          reject(err.message)
        } else {
          resolve(data);
        }
      });
    })
  }
}