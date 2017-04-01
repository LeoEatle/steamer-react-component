import React, { Component } from 'react';
import Spinner from 'spinner';

require('./index.less');

class Wrapper extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			stage: "unload"
		};
		this.startLoad = this.startLoad.bind(this);

		
	}

	startLoad(e) {
		this.setState({
			stage: "loading"
		});
		// 模拟载入数据
		setTimeout(()=>{
			this.setState({
				stage: "loaded"
			});
		}, 3000);
	}
	

	render() {
		// 配置Spinner
		let opts = 
		[
			{
				style: 'gif',
				content: '正在加载...',
			},
			{
				style: 'flower',
				content: 'Loading...',
			},
			{
				style: 'flower',
				content: '请耐心等待五秒',
				flowerOpts: {
					lines: 12, // The number of lines to draw
					length: 3, // The length of each line
					width: 2, // The line thickness
					radius: 6, // The radius of the inner circle
					scale: 1.0, // Scales overall size of the spinner
					corners: 0.1, // Roundness (0..1)
					color: '#777', // #rgb or #rrggbb
					opacity: 1 / 4, // Opacity of the lines
					rotate: 0, // Rotation offset
					direction: -1, // 1: clockwise, -1: counterclockwise
					speed: 10, // Rounds per second
					trail: 100, // Afterglow percentage
					fps: 20, // Frames per second when using setTimeout()
					zIndex: 2e9, // Use a high z-index by default
					className: 'spin', // CSS class to assign to the element
					top: '50%', // center vertically
					left: '50%', // center horizontally
					shadow: false, // Whether to render a shadow
					hwaccel: false, // Whether to use hardware acceleration (might be buggy)
					position: 'relative' // Element positioning
				}
			},
			{
				style: 'gif',
				content: '',
				fullScreen: true
			}
		]

		let content;
		let stage = this.state.stage;
		if(stage == "unload"){
			content = <div className="content">{"未载入内容"}</div>
		}
		else if (stage == "loading"){
			content = null;
		}
		else if (stage == "loaded"){
			content = <div className="content">{"已成功载入内容"}</div>
		}


		let isLoading = this.state.stage == "loading"?true: false;

		return (
			<div id="wrapper">
				<button onClick={this.startLoad}>开始载入gif</button>
				<div className="loadingBlock">
					{content}
					<Spinner isLoading = {isLoading} opts = {opts[3]}></Spinner>
				</div>

				
			</div>
		);
	}
}

export default Wrapper;