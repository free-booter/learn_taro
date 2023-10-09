import { View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'
import styles from './index.module.scss'
import './no-transform-unit.scss'

export default function Index() {
  useLoad(() => {
    // 获取全局变量
    const app = Taro.getApp()
    console.log('Page loaded.', app)
  })
  const lineStyle = {
    fontSize: '30px',
    color: 'red'
  }
  console.log(styles)
  return (
    <View className="'index'">
      {/* 样式 */}
      <View className='style-taro'>单位px转换为rpx和rem</View>
      <View className='no-transform-unit'>不转换单位</View>
      <View style={lineStyle}>行内样式，px不转换</View>
      <View style={{ fontSize: Taro.pxTransform(30) }}>行内样式，px的转换</View>
      <View className={styles['local-style']}>
        编写局部样式
        <View className={styles['name']}>name</View>
      </View>
      <View className='title'>局部样式中编写的全局样式</View>
    </View>
  )
}
