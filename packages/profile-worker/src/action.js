
class RuntimeAction{
  constructor(id, props = {}) {
    this.id = id;
    this.props = props;
    // this.triggers = triggers || [];
  }
  generateCode() {
    return this.generateActionCode() + this.generateTriggerCode();
  }
  generateTriggerCode() {
    // TODO: depends circle ? not work require at top
    const Trigger = require('./trigger');

    if (this.props.triggers) {
      return this.props.triggers
        .map(({ id, props }) => new Trigger(id, props).generateCode())
        .join('');
    }
    return '';
  }
  generateActionCode() {
    switch (this.id) {
      case(RuntimeAction.T_ACTION_JSONP):
        return this.generateJsonp();
      case(RuntimeAction.T_ACTION_EVALSTRING):
        return this.props.evalString;
      default:
        throw new TypeError('unknow action type');
    }
  }
  generateJsonp() {
    const { url, query } = this.props;
    const querystring = this.stringifyQuery(query);
    return `this.$jsonp('${url}', {params: ${querystring}})`
  }
  stringifyQuery(query) {
    if (query) {
      const queryString = Object.keys(query)
        .map((queryKey) => `${queryKey}: ${query[queryKey]}`)
        .join(',');
      return `{${queryString}}`;
    }
  }
}
RuntimeAction.T_ACTION_JSONP = 'T_ACTION_JSONP';
RuntimeAction.T_ACTION_EVALSTRING = 'T_ACTION_EVALSTRING';

module.exports = RuntimeAction;