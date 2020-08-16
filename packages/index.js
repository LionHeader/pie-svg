import PieSvg from './pie-svg'

const components = {
  PieSvg
}

const install = Vue => {
  if (install.installed) return
  Object.values(components).forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 输出default变量，用于全局引入
export default {
  install, // 必须导出install才可以使用Use
  ...components
}

// 输出各个组件，用于按需引入
export {
  PieSvg
}
