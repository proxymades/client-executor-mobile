import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { ExecutorOrder } from '../src/components/executor/ExecutorOrder/ExecutorOrder'
import { BlueButton } from '../src/components/Common/Buttons/BlueButton'
import { localeVar, isNotifedVar, whiteColorVar, blackColorVar } from '../src/utils/cache'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

let mockOrder
const mockCreateRequest = jest.fn()
const mockCancelRequest = jest.fn()
const mockNavigation = { setOptions: jest.fn() }
jest.mock('@react-navigation/native', () => ({ useNavigation: () => mockNavigation }))
jest.mock('../src/hooks/query/executor/order/useExecutorOrder', () => ({
    useExecutorOrder: () => ({ orderLoading: false, orderData: mockOrder }),
}))
jest.mock('../src/hooks/mutation/executor/order/useCreateOrderRequest', () => ({
    useCreateOrderRequest: () => ({ createOrderRequest: mockCreateRequest }),
}))
jest.mock('../src/hooks/mutation/executor/order/useCancelOrderRequest', () => ({
    useCancelOrderRequest: () => ({ cancelOrderRequest: mockCancelRequest }),
}))
jest.mock('../src/components/Common/Order/OrderData', () => ({
    OrderData: props => require('react').createElement('Order', null, props.children),
}))
jest.mock('../src/components/Common/Modals/ExtraModal', () => ({
    ExtraModal: props => require('react').createElement('Modal', { visible: props.modalVisible }, props.modalVisible ? props.children : null),
}))
jest.mock('../src/components/Common/Modals/Forms/OfferPriceMenuForm', () => ({
    OfferPriceMenuForm: props => require('react').createElement('OfferForm', props),
}))
jest.mock('../src/components/Common/Modals/Forms/QuestionMenuForm', () => ({
    QuestionMenuForm: props => require('react').createElement('QuestionForm', props),
}))

beforeEach(() => {
    jest.clearAllMocks()
    whiteColorVar('#ffffff')
    blackColorVar('#282C34')
    mockCreateRequest.mockResolvedValue({})
    mockCancelRequest.mockResolvedValue({})
    mockOrder = { id: 'order-one', isWork: false, isReady: false, orderRequest: [],
        client: { feedbackClient: [], order: [], name: 'Demo client', verified: false, createdAt: new Date().toISOString() } }
    localeVar({ offerPrice: 'Offer a price', cancel: 'Cancel request', orderUAccepted_notify: 'Order is in progress' })
    isNotifedVar('')
})

function screen() {
    let tree
    act(() => { tree = renderer.create(<ExecutorOrder route={{ params: { orderId: 'order-one' } }} />) })
    return tree
}

test('the primary offer button opens the price form', () => {
    const tree = screen()
    act(() => tree.root.findByType(BlueButton).props.handleAction())
    expect(tree.root.findAllByType('OfferForm')).toHaveLength(1)
    act(() => tree.unmount())
})

test('an order that moved into work shows a message without crashing on an undefined setter', () => {
    mockOrder.isWork = true
    const tree = screen()
    act(() => tree.root.findByType(BlueButton).props.handleAction())
    expect(isNotifedVar()).toBe('Order is in progress')
    expect(tree.root.findAllByType('OfferForm')).toHaveLength(0)
    act(() => tree.unmount())
})

test('the primary cancel button opens confirmation; an active assignment hides it', () => {
    mockOrder.orderRequest = [{ id: 'request-one' }]
    const tree = screen()
    act(() => tree.root.findByType(BlueButton).props.handleAction())
    expect(tree.root.findAllByType('QuestionForm')).toHaveLength(1)
    act(() => tree.unmount())
    mockOrder.isWork = true
    const active = screen()
    expect(active.root.findAllByType(BlueButton)).toHaveLength(0)
    act(() => active.unmount())
})

test('a failed offer resets the pending state and lets the contractor retry', async () => {
    mockCreateRequest.mockRejectedValue(new Error('Network unavailable'))
    const tree = screen()
    act(() => tree.root.findByType(BlueButton).props.handleAction())
    await act(async () => tree.root.findByType('OfferForm').props.action())
    expect(isNotifedVar()).toBe('Network unavailable')
    expect(tree.root.findByType(BlueButton).props.isDisabled).toBe(false)
    act(() => tree.unmount())
})
