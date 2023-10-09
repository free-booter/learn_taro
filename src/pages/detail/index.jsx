import { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    console.log('Detail page loaded.')
  }

  $instance = Taro.getCurrentInstance()
  $instance2 = Taro.getCurrentPages().at(-1)
  onLoad(options) {
    // * 组件之间的通信
    // 方式一：拿到页面传递过来的url参数
    const { name } = options
    this.setState({ name })
    // 兼容微信小程序
    console.log(this.$instance.page == this.$instance2) // true
    if (process.env.TARO_ENV === 'weapp') {
      const eventChannel = this.$instance.page.getOpenerEventChannel()
      // 监听事件，获取上一页面通过eventChannel传送到当前页面的数据
      eventChannel.on('acceptDataFromIndexPage', (data) => {
        console.log(data)
      })
    }
  }
  goBack() {
    console.log('goBack');
    Taro.navigateBack({
      delta: 1
    }).then(() => {
      if (process.env.TARO_ENV === 'weapp') {
        Taro.eventCenter.trigger('acceptDataFromDetailPageBack', {
          data: '这是从detail页面传递过来的数据'
        })
      }
    })
  }
  render() {
    const { name } = this.state

    return (
      <View className='detail'>
        <Text>Detail Page</Text>
        <Text>name: {name}</Text>
        <Button onClick={() => this.goBack()}>返回</Button>
      </View>
    )
  }
}
