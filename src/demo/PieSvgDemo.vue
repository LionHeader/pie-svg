<template>
  <div class="pie-svg-demo">
    <h1>Pie Svg demo Examples</h1>
    <div>
      <h2>1. 不同百分比的环形进度样式</h2>
      <div class="pie-svg-examples">
        <pie-svg :progress="0"></pie-svg>
        <pie-svg :progress="0.05"></pie-svg>
        <pie-svg :progress="0.5"></pie-svg>
        <pie-svg :progress="0.96"></pie-svg>
        <pie-svg :progress="1"></pie-svg>
      </div>
    </div>
    <div>
      <h2>2. 自定义显示内容的环形进度样式</h2>
      <div class="pie-svg-examples">
        <pie-svg :progress="0.5">
          <div class="used-percent">
            <p>已使用百分比</p>
            <p>50%</p>
          </div>
        </pie-svg>
      </div>
    </div>
  </div>
</template>

<script>
import PieSvg from '../lib/pie-svg/PieSvg'

export default {
  name: 'PieSvgDemo',
  components: {
    PieSvg
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.pie-svg-demo {
  text-align: left;
  .pie-svg {
    margin-right: 40px;
  }
  .used-percent {
    text-align: center;
  }
  .pie-svg-examples {
    display: flex;
    align-items: center;
  }
}
</style>
