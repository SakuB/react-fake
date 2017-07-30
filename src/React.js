import instantiateReactComponent from './instantiateReactComponent';
import ReactElement from './ReactElement';
import PureComponent from './PureComponent';
import $ from 'jquery';

class React {
  constructor () {
    this.nextReactRootIndex = 0
  }

  renderDOM (ele, container) {
    const componentInstance = instantiateReactComponent(ele);
    const markup = componentInstance.mountComponent(this.nextReactRootIndex++);
    container.innerHTML = markup;
    $(document).trigger('mountReady');
  }

  createClass (spec) {
    // var Constructor = function (props) {
    //   this.props = props;
    //   this.state = this.getInitialState ? this.getInitialState() : null;
    // }
    // //原型继承，继承超级父类
    // Constructor.prototype = new PureComponent();
    // Constructor.prototype.constructor = Constructor;
    // //混入spec到原型
    // $.extend(Constructor.prototype,spec);
    // return Constructor;
    class Constructor extends PureComponent {
      constructor(props) {
        super();
        this.props = props;
        this.state = this.getInitialState ? this.getInitialState() : null;
      }
    }
    // Constructor.prototype = new PureComponent();
    Constructor.prototype.constructor = Constructor;
    Object.assign(Constructor.prototype, spec);
    // console.log(Object.assign(Constructor.prototype, spec));
    // console.log(PureComponent.prototype);
    return Constructor;
  }
  createElement (type, config, children) {
    debugger;
    const props = {};
    const conf = config || {};
    let propName;
    let key = conf.key || null;

    // 复制config里的内容到props对象
    for (propName in conf) {
      if (conf.hasOwnProperty(propName) && propName !== 'key') {
        props[propName] = conf[propName];
      }
    }

    // 将children挂载到props的children属性上
    const childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = Array.isArray(children) ? children : [children];
    } else if (childrenLength > 1) {
      const childArray = Array(childrenLength);
      for (let i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      props.children = childArray;
    }
    return new ReactElement(type, key, props);
  }
}

export default new React();
