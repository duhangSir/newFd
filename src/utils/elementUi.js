
import {
    Container,
    Aside,
    Main,
    Form,
    Input,
    Button,
    FormItem
} from 'element-ui'
const components = [
    Container,
    Aside,
    Main,
    Form,
    Input,
    Button,
    FormItem
]
export default (Vue) => {
    components.forEach((Component) => {
        Vue.component(Component.name, Component)
    })
}
