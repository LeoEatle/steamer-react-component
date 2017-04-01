import spin from './spin';

import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-immutable-decorator';
require('./css/index.less');
// gif路径的设置
var gifSrc = require('./gif/loading.gif');

@pureRender
export default class Spinner extends Component {
    constructor(props, context) {
        super(props, context);
        // 默认的菊花图配置
        let defaultFlowerOpts = {
            lines: 12, // The number of lines to draw
            length: 3, // The length of each line
            width: 2, // The line thickness
            radius: 6, // The radius of the inner circle
            scale: 1.0, // Scales overall size of the spinner
            corners: 1, // Roundness (0..1)
            color: '#777', // #rgb or #rrggbb
            opacity: 1 / 4, // Opacity of the lines
            rotate: 0, // Rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            speed: 1, // Rounds per second
            trail: 100, // Afterglow percentage
            fps: 20, // Frames per second when using setTimeout()
            zIndex: 2e9, // Use a high z-index by default
            className: 'spin', // CSS class to assign to the element
            top: '50%', // center vertically
            left: '50%', // center horizontally
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration (might be buggy)
            position: 'relative' // Element positioning
        };
        // 默认的spinner配置
        let defaultOpts = {
            style: 'gif',
            content: '',
            fullScreen: false
        };
        // 使得默认的菊花图配置和传入的props.flowerOpts合并，然后再和opts的其他属性合并
        this.opts = Object.assign(defaultOpts, this.props.opts, {flowerOpts: Object.assign(defaultFlowerOpts, this.props.opts.flowerOpts)});
        //console.log(this.opts);
        this.loadingDOM = [];
        //this.getDOM(this.opts.style);
    }

    componentDidMount() {
        this.getDOM();
    }
    

    getDOM() {
        // 判断是选择哪一种spinner，旧版使用spinner组件实现，新版使用gif
        switch (this.opts.style) {
            case "flower":
                let spinner = new spin(this.opts.flowerOpts).spin();
                let target = document.getElementById('loading');
                console.log(spinner.el);
                target.appendChild(spinner.el);
                // 似乎没有办法把这个生成的spinnerDOM让React生成虚拟DOM
                //this.loadingDOM.push(spinner.el);
                break;
            case "gif":
                // 新版的spinner，使用gif
                this.loadingDOM.push(<img key="gif" className="gif" src= {gifSrc} alt="loading" />);
                break;
            default:
                this.loadingDOM.push(<img key="gif" className="gif" src= {gifSrc} alt="loading" />);
        }
    }

    render() {
        let isShow = {
            display: this.props.isLoading
                ? 'block'
                : 'none'
        }

        if (this.opts.content && this.opts.content !== ''){
            this.promptTest = (<p key ="prompt" className="promptText">{this.opts.content}</p>);
        }

        return (
            <div className={this.opts.fullScreen?"spinner-full-screen":"spinner"} style={isShow}>
                <div id="loading">
                    {this.loadingDOM}
                </div>
                {this.promptTest}
            </div>  
        )
    }
}
