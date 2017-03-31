import spin from './spin';

import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-immutable-decorator';
import chai from 'chai';
require('./css/index.less');
// gif路径的设置
var gifSrc = require('./gif/loading.gif');

@pureRender
export default class Spinner extends Component {
    constructor(props, context) {
        super(props, context);

        this.loadingDOM = [];
        this.getDOM(this.props.opts.spinStyle);
        console.log(this.loadingDOM);
        var assert = chai.assert;
        describe('#indexOf()', function(){
            it("should return -1 when the value is not present", function(){
                assert.equal(-1, [1,2,3].indexOf(4));
                //assert.equal(-1, 3+2);
            })
        })  
    }

    componentDidMount() {
        // 由于旧版必须操作DOM，转移到didMount
        if (this.props.opts.spinStyle == "flower"){
                // 旧版spinner的配置
                let opts = {
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
                //let target = document.createElement("div");
                let target = document.getElementById('flower');
                let spinner = new spin(opts).spin(target);
        }
    }
    

    getDOM(style) {
        // 判断是选择哪一种spinner，旧版使用spinner组件实现，新版使用gif
        switch (style) {
            case "flower":
                // 转移到componentDidMount
                break;
            case "gif":
                // 新版的spinner，使用gif
                this.loadingDOM.push(<img key="gif" className="gif" src= {gifSrc} alt="loading" />);
                break;
        }
         // 如果有提示文字，就加上文字
        if (this.props.opts.promptText !== null){
            this.loadingDOM.push(<p key ="prompt" className="promptText">{this.props.opts.promptText}</p>);
        }
    }

    render() {
        let isShow = {
            display: this.props.isLoading
                ? 'block'
                : 'none'
        }

        return (
            <div id="spin" style={isShow}>
                <div id="flower">
                </div>
                {this.loadingDOM}
            </div>  
        )
    }
}
