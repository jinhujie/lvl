import Http from './http'
const { VUE_APP_LOCAL, VUE_APP_API } = process.env;

export default class Service {
  serverOriginWrapper = url => {
    const isBuildProduction = !VUE_APP_LOCAL;
    if (isBuildProduction) {
      return VUE_APP_API + '/' + url;
    }
    return url;
  }
  get (url, options ){
    return new Http().get(this.serverOriginWrapper(url), options);
  }
}