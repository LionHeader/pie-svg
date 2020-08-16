<template>
  <div class="pie-svg">
    <div class="pie-svg-shadow" :class="{'exception': progress >= 0.8}" :style="{'width': shadowSize, 'height': shadowSize}"></div>
    <div class="pie-svg-percent"><slot>{{progress * 100}}%</slot></div>
    <svg
      x-mlns="http://www.w3.org/200/svg"
      :width="option.size"
      :height="option.size">
      <defs>
        <linearGradient x1="1" y1="0" x2="0" y2="0" :id="option.outGradientID">
          <stop offset="0%" :stop-color="arcOption.outArcStartColor" />
          <stop offset="100%" :stop-color="arcOption.outArcEndColor" />
        </linearGradient>
        <linearGradient x1="1" y1="0" x2="0" y2="0" :id="option.innerGradientID">
          <stop offset="0%" :stop-color="arcOption.innerArcStartColor" />
          <stop offset="100%" :stop-color="arcOption.innerArcEndColor" />
        </linearGradient>
      </defs>
      <circle
        :r="option.radius"
        :cx="option.cx"
        :cy="option.cy"
        :stroke="option.backColor"
        :stroke-width="option.strokeWidth"
        fill="none">
      </circle>
      <circle
        :r="option.radius"
        :cx="option.cx"
        :cy="option.cy"
        :stroke="`url('#${option.innerGradientID}')`"
        :stroke-width="option.strokeWidth"
        transform="rotate(-90)"
        transform-origin="center"
        fill="none"
        stroke-linecap="round"
        :stroke-dasharray="`0,1000000`">
        <animate
          :to="`${arcOption.innerArcLength},1000000`"
          :begin="arcOption.outDurtion"
          :dur="arcOption.innerDurtion"
          :from="`${arcOption.innerInitArcLength},1000000`"
          attributeName="stroke-dasharray"
          fill="freeze"
        />
      </circle>
      <circle
        :r="option.radius"
        :cx="option.cx"
        :cy="option.cy"
        :stroke="`url('#${option.outGradientID}')`"
        :stroke-width="option.strokeWidth"
        :stroke-dasharray="`${arcOption.outArcLength},1000000`"
        fill="none"
        transform="rotate(-90)"
        transform-origin="center"
        stroke-linecap="round">
        <animate
          :to="`${arcOption.outArcLength},1000000`"
          begin="0s"
          :dur="arcOption.outDurtion"
          from="0,1000000"
          attributeName="stroke-dasharray"
          fill="freeze"
        />
      </circle>
      <circle
        v-if="cilrcleProgress > 0 && cilrcleProgress < 1"
        :r="option.pointRadius"
        :cx="option.pointX"
        :cy="option.pointY"
        stroke-width="1"
        fill="rgba(255, 255, 255, 1)"
        transform="rotate(47.5)"
        transform-origin="center">
      </circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'PieSvg',
  props: {
    progressOption: {
      type: Object,
      default: function () {
        return {}
      }
    },
    progress: {
      type: Number,
      required: true
    }
  },
  computed: {
    cilrcleProgress () {
      const progressValue = this.progress || 0
      if (progressValue > 0 && progressValue <= 0.1) {
        return 0.1
      }
      if (progressValue >= 0.95 && progressValue < 1) {
        return 0.95
      }
      return progressValue
    },
    colors () {
      const percent = this.cilrcleProgress
      if (percent === 0) {
        return {
          startColor: [245, 247, 251],
          endColor: [245, 247, 251],
          id: 'zero'
        }
      }
      if (percent < 0.8) {
        return {
          startColor: [19, 194, 194],
          endColor: [43, 227, 227],
          id: 'normal'
        }
      }
      if (percent === 1) {
        return {
          startColor: [254, 135, 107],
          endColor: [254, 135, 107],
          id: 'full'
        }
      }
      return {
        startColor: [254, 113, 79],
        endColor: [254, 135, 107],
        id: 'exception'
      }
    },
    option () {
      const color = this.colors
      const progressOptions = this.progressOption
      // 所有进度条的可配置项
      const baseOption = {
        radius: 62,
        strokeWidth: 20,
        backColor: 'rgba(245,247,251,1)',
        durtion: '0.6s',
        step: 100,
        pointRadius: 3.5,
        ...color,
        ...progressOptions
      }
      // 中心位置自动生成
      baseOption.cy = baseOption.cx = baseOption.radius + baseOption.strokeWidth
      baseOption.pointX = baseOption.pointY = baseOption.radius - baseOption.strokeWidth - baseOption.pointRadius - 1
      baseOption.size = (baseOption.radius + baseOption.strokeWidth) * 2
      baseOption.innerGradientID = `innerGradient${color.id}`
      baseOption.outGradientID = `outGradient${color.id}`
      return baseOption
    },
    arcOption () {
      const { radius, durtion, startColor, endColor } = this.option
      const arcConfig = {
        outArcLength: 0,
        outDurtion: 0,
        innerArcLength: 0,
        innerInitArcLength: 0,
        innerDurtion: 0
      }
      const circleLength = Math.floor(2 * Math.PI * radius)
      // 如果此时小于0.5 则只需要显示最外层的圆弧 里面的圆弧不需要画了
      // 时间计算 因为第二段的长度不见得等于第一段 所以不能平分时间 不然会导致第二端的速度出现骤降
      // 因此需要按照比例进行时间计算
      if (this.cilrcleProgress < 0.5) {
        arcConfig.outArcLength = this.cilrcleProgress * circleLength
        arcConfig.outDurtion = durtion // 为初始设置的动画值
      } else {
        const time = durtion.split('s')[0]
        arcConfig.outArcLength = 0.5 * circleLength
        arcConfig.outDurtion = (0.5 / this.cilrcleProgress) * time + 's'
        arcConfig.innerArcLength = this.cilrcleProgress * circleLength
        arcConfig.innerInitArcLength = 0.5 * circleLength // 为动画做准备 此时从中间开始
        arcConfig.innerDurtion = ((this.cilrcleProgress - 0.5) / this.cilrcleProgress) * time + 's' // 为动画做准备 此时从中间开始
      }
      const tansfromColor = arr => `rgb(${arr[0]},${arr[1]},${arr[2]})`
      arcConfig.outArcStartColor = tansfromColor(startColor)
      arcConfig.outArcEndColor = tansfromColor(startColor.map((color, index) => color + (endColor[index] - color) / 2))
      arcConfig.innerArcStartColor = tansfromColor(endColor)
      arcConfig.innerArcEndColor = tansfromColor(startColor.map((color, index) => color + (endColor[index] - color) / 2))
      return arcConfig
    },
    shadowSize () {
      return `${this.option.radius * 2 + this.option.strokeWidth}px`
    }
  }
}
</script>

<style lang="scss" scoped>
.pie-svg {
  position: relative;
  .pie-svg-percent {
    white-space: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 14px;
    transform: translate(-50%, -50%);
  }
  .pie-svg-shadow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    border-radius: 50%;
    background-color: transparent;
    box-shadow: 0px 0px 20px -4px rgba(0, 0, 0, 0.11);
    &.exception {
      box-shadow: 0px 0px 20px -4px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
