import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import registrationBtn from '@/components/BookPostKit/button/registrationBtn'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('registrationBtn.vue', () => {
  let vuetify
  let actions
  let store

  beforeEach(() => {
    vuetify = new Vuetify()
    actions = {
      post: jest.fn()
    }

    store = new Vuex.Store({
      actions,
      state: {
        alertRegister: false
      },
      modules: {
        book: {
          state: {
            selectedBooks: '',
            disable: ''
          }
        }
      }
    })
  })

  it('アクションテスト', () => {
    const wrapper = shallowMount(registrationBtn, { store, localVue, vuetify })
    const button = wrapper.find('.registrationBtn')
    button.trigger('click')
    expect(actions.post).toHaveBeenCalled()
  })
})
