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
				spinStyle: 'gif',
				promptText: '正在加载...',
			},
			{
				spinStyle: 'flower',
				promptText: 'Loading...',
			},
			{
				spinStyle: 'gif',
				promptText: '请耐心等待五秒',
			}
		]

		let content;
		let stage = this.state.stage;
		if(stage == "unload"){
			content = <div className="content">{"未载入内容"}</div>
		}
		else if (stage == "loading"){
			content = <div className="content">{"正在加载内容"}</div>
		}
		else if (stage == "loaded"){
			content = <div className="content">{"已成功载入内容"}</div>
		}

		let isLoading = this.state.stage == "loading"?true: false;

		return (
			<div className="loadingBlock">
					<button onClick={this.startLoad}>开始载入</button>
					{content}
					<Spinner isLoading = {isLoading} opts = {opts[0]}></Spinner>
			</div>
		);
	}
}

export default Wrapper;