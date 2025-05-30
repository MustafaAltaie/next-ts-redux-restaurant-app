import { Order } from "../../../types/Order";

interface someWhereElseProps {
    handleSendOrder: (e: React.FormEvent<HTMLFormElement>) => void,
    handlePrepareOrder: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    order: Order,
    sending: boolean,
}

const SomeWhereElseForm = ({
    handleSendOrder,
    handlePrepareOrder,
    order,
    sending
}: someWhereElseProps) => {
    return (
        <>
        <p>Tell us where you are to delever you the order:</p>
        <form onSubmit={handleSendOrder} className='orderSummaryForm'>
            <div className='orderSummaryFormInnerWrapper flexColumn10'>
                <div>
                    <label htmlFor='fullNameText'>Full name</label>
                    <input
                        type="text"
                        id='fullNameText'
                        name='name'
                        autoComplete='name'
                        placeholder='e.g. John Forslund'
                        required
                        onChange={handlePrepareOrder}
                        value={order.name || ''}
                    />
                </div>
                <div>
                    <label htmlFor='addressText'>Full address</label>
                    <input
                        type="text"
                        id='addressText'
                        name='address'
                        autoComplete='street-address'
                        placeholder='e.g. kungsgatan 2A Katrineholm'
                        required
                        onChange={handlePrepareOrder}
                        value={order.address || ''}
                    />
                </div>
                <div>
                    <label htmlFor='mobileText'>Your number</label>
                    <input
                        type="tel"
                        id='mobileText'
                        name='mobile'
                        autoComplete='tel'
                        placeholder='e.g. 07961234567'
                        required
                        onChange={handlePrepareOrder}
                        value={order.mobile || ''}
                    />
                </div>
                <div>
                    <label htmlFor='portNumberText'>Port code if there is</label>
                    <input
                        type="number"
                        id='portNumberText'
                        name='portCode'
                        autoComplete='tel'
                        placeholder='e.g. 1032'
                        onChange={handlePrepareOrder}
                        value={order.portCode || ''}
                    />
                </div>
                <div>
                    <label htmlFor='messageText'>Message to the chefs</label>
                    <textarea
                        name='message'
                        id='messageText'
                        placeholder="Optional..."
                        onChange={handlePrepareOrder}
                        value={order.message || ''}
                    ></textarea>
                </div>
                <button type='submit' disabled={sending} style={{ background: sending ? '#aaa' : '' }}>Send order</button>
            </div>
        </form>
        </>
    )
}

export default SomeWhereElseForm;