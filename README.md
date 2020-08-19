# Introduction

>Create pie by svg.

# Install

```
  npm install pie-svg
```

# Import & Using

```
  import VueComponent from 'pie-svg'
  // or
  import { PieSvg } from 'pie-svg'

  Vue.use(VueComponent)
  // or
  Vue.use(PieSvg)
```

# Examples

```
  1. 基本使用
  <pie-svg :progress="0"></pie-svg>
  <pie-svg :progress="0.05"></pie-svg>
  <pie-svg :progress="0.5"></pie-svg>
  <pie-svg :progress="0.96"></pie-svg>
  <pie-svg :progress="1"></pie-svg>

  2. 自定义圆环中间显示内容
  <style>
    .used-percent {
      text-align: center;
    }
    .pie-svg-examples {
      display: flex;
      align-items: center;
    }
  </style>

  <pie-svg :progress="0.5">
    <div class="used-percent">
      <p>已使用百分比</p>
      <p>50%</p>
    </div>
  </pie-svg>
```
