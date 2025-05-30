import { Order } from "../../../types/Order";

interface DiningInFormProps {
    handleSendOrder: (e: React.FormEvent<HTMLFormElement>) => void,
    handlePrepareOrder: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    order: Order,
    sending: boolean
}

const DiningInForm = ({
    handleSendOrder,
    handlePrepareOrder,
    order,
    sending
}: DiningInFormProps) => {
    return (
        <>
        <p>Please pay when your food is served.</p>
        <form onSubmit={handleSendOrder} className='orderSummaryForm'>
            <div className='orderSummaryFormInnerWrapper flexColumn10'>
                <div>
                    <label htmlFor="fullName">Full name</label>
                    <input
                        type="text"
                        id="fullName"
                        name='name'
                        autoComplete='name'
                        placeholder="e.g. John Forslund"
                        required
                        onChange={handlePrepareOrder}
                        value={order.name || ''}
                    />
                </div>
                <div>
                    <label htmlFor="tableNumber">Table number</label>
                    <input
                        type="number"
                        id="tableNumber"
                        name='table'
                        autoComplete='off'
                        placeholder="e.g. 3"
                        required
                        onChange={handlePrepareOrder}
                        value={order.table || ''}
                    />
                </div>
                <div>
                    <label htmlFor="messageChefText">Message to the chefs</label>
                    <textarea
                        name='message'
                        id="messageChefText"
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

export default DiningInForm;