
import { Component } from 'react'
import './app.scss'

class App extends Component {
  constructor(){
    super()
    this.name = 'app'
  }
  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
