jest.mock('../../../../client/utils/ensureEntity')

import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import Icon from '../../../../client/components/Icon/Icon'
import IconCloud from '../../../../client/components/Icon/IconCloud'

describe('client/components/Icon/Icon', () => {
    it('should exist', () => {
        expect(Icon).toBeDefined()
    })

    it('should render correctly', () => {
        const tree = renderer.create(
            <Icon id={1}/>
        ).toJSON()

        expect(tree).toMatchSnapshot()
    })

    /*
    // test if it actually throws an error in case a required prop isn't provided
    it('should throw an error in case prop `id` is not provided', () => {
        console.log = jest.fn()
        React.renderElement(Icon)
        expect(console.log).toHaveBeenCalledTimes(1)
    })
    */

    // ensure if an icon entity wasn't found in store, the component renders default icon
    it('should render default icon if an icon entity was not found in store', () => {
        const wrapper = mount(<Icon id={1}/>)
        expect(wrapper.find(IconCloud).exists()).toBe(true)
    })

    // ensure if an icon entity was found, but path wasn't mapped, the component renders default icon
    it('should render default icon if icon path was not mapped', () => {
        const wrapper = mount(<Icon id={1}/>)
        expect(wrapper.find(IconCloud).exists()).toBe(true)
    })
})
