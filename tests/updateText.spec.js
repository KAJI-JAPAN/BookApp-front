import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import updateText from '@/components/RegisteredBook/updateText.vue'
// import todos from '@/store/todos'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('updateText.vue', () => {
  let vuetify
  let actions
  let store

  beforeEach(() => {
    vuetify = new Vuetify()
    actions = {
      add: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        todos: {
          actions,
          state: {
            selectedBooks: ''
          }
        }
      }
    })
  })

  it('クリックした時にaddが呼び出されるか', () => {
    const wrapper = shallowMount(updateText, { store, localVue, vuetify })
    const button = wrapper.find('.updateTextBtn')
    button.trigger('click')
    expect(store.modules.todos.actions.add).toHaveBeenCalled()
  })
})
