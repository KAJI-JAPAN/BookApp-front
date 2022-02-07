import { shallowMount, createLocalVue } from '@vue/test-utils'
import bookAction from '@/components/BookPostKit/button/registrationBtn'
import Vuex from 'vuex'

const localVue = createLocalVue()

jest.mock('axios')
localVue.use(Vuex)

describe('index.js', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      post: jest.fn()
    }

    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  it('登録ボタンを押すとstore/indexのpostが呼び出されるか', () => {
    const wrapper = shallowMount(bookAction, { store, localVue })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions.post).toHaveBeenCalled()
  })

  // it('dispatches "actionInput" when input event value is "input"', () => {
  //   const wrapper = shallowMount(Actions, { store, localVue })
  //   const input = wrapper.find('input')
  //   input.element.value = 'input'
  //   input.trigger('input')
  //   expect(actions.actionInput).toHaveBeenCalled()
  // })

  // it('本が送られているか', () => {
  //   const wrapper = shallowMount(bookAction)
  //   wrapper.find('button').trigger('click')
  //   expect(wrapper.vm.value).toBe('value')
  // })
})
