import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import PieSvg from '../../packages/pie-svg/PieSvg.vue'

describe('PieSvg.vue', () => {
  it('renders props.progress when passed', () => {
    const progress = 0.4
    const wrapper = shallowMount(PieSvg, {
      propsData: { progress }
    })
    expect(wrapper.text()).to.include('40%')
  })
})
