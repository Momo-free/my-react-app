//项目的入口文件，用于渲染 React 应用到 DOM。
import React from 'react';
import ReactDOM from 'react-dom';
import "choerodon-ui/lib/configure";
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));