import { Button, Text, View } from '@tarojs/components'
import Taro, { useLoad, useUnload } from '@tarojs/taro'
import './index.scss'

export default function Index() {
  useLoad(() => {
    // 获取全局变量
    const app = Taro.getApp()
    console.log('Page loaded.', app)

    // 全局事件总线
    Taro.eventCenter.on('acceptDataFromDetailPageBack', (data) => {
      console.log('acceptDataFromDetailPageBack', data)
    })
  })

  useUnload(() => {
    // 卸载页面时触发
    console.log('Page unloaded.')
    Taro.eventCenter.off('acceptDataFromDetailPageBack')
  })
  const name = 'Tom'
  const goToDetail = () => {
    Taro.navigateTo({
      url: `/pages/detail/index?name=${name}`
    }).then(res => {
      if(process.env.TARO_ENV === 'weapp') {
        res.eventChannel.emit('acceptDataFromIndexPage', { data: '这是从index页面传递过来的数据' })
      }
    })
  }
  return (
    <View className='index global-style'>
      <Text>Hello world!</Text>
      <Button onClick={goToDetail}>跳转到detail页面</Button>
    </View>
  )
}
