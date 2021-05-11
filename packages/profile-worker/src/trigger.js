const RuntimeAction = require('./action');
const _ = require('lodash/core');

class Trigger {
  constructor(id, props) {
    this.id = id;
    this.props = props;
    this.triggerType = 'unknow';
    this.initTriggerType();
  }
  processMap = {
    [Trigger.T_TRIIGER_LIFECIRCLE]: this.processLifecircle,
    [Trigger.T_TRIGGER_PROMISE]: this.processPromise,
  }
  initTriggerType(){
    switch(this.id) {
      case (Trigger.TRIGGER_VUE_CREATED):
        return this.triggerType = Trigger.T_TRIIGER_LIFECIRCLE;
      case (Trigger.TRIGGER_PROMISE_FULFILLED):
      case (Trigger.TRIGGER_PROMISE_REJECTED):
        return this.triggerType = Trigger.T_TRIGGER_PROMISE;
      default:
        throw new TypeError('unknow trigger type');
    }
  }
  generateCode() {
    return this.processMap[this.triggerType].call(this);
  }
  processLifecircle() {
    // parse actions with actions id
    if (this.props.actions) {
      return this.props.actions
        .map(action => this.generateActionCode(action))
        .join(';');
    }
    return '';
  }
  processPromise () {
    if (this.props.actions) {
      const actionsCode = this.props.actions
        .map(({ id, props, trigger }) => new RuntimeAction(id, props, trigger).generateCode())
        .join('');
      return `.then(function(res) {${actionsCode}})`;
    }
  }
  generateActionCode(action) {
    const { id, props, trigger } = action;
    const runtimeAction = new RuntimeAction(id, props, trigger);
    // generate action's snippet and process `next`
    return runtimeAction.generateCode();
  }
}

Trigger.TRIGGER_VUE_CREATED = 'TRIGGER_VUE_CREATED';
Trigger.TRIGGER_PROMISE_FULFILLED = 'TRIGGER_PROMISE_FULFILLED';
Trigger.TRIGGER_PROMISE_REJECTED = 'TRIGGER_PROMISE_REJECTED';

Trigger.T_TRIIGER_LIFECIRCLE = 'T_TRIIGER_LIFECIRCLE';
Trigger.T_TRIGGER_PROMISE = 'T_TRIGGER_PROMISE';

module.exports = Trigger;