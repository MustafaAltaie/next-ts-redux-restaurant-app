
interface DiningInFormProps {
    handleSendOrder: (e: React.FormEvent<HTMLFormElement>) => void
}

const DiningInForm = ({ handleSendOrder }: DiningInFormProps) => {
    return (
        <>
        <p>Please pay when your food is served.</p>
        <form onSubmit={handleSendOrder} className='orderSummaryForm'>
            <div className='orderSummaryFormInnerWrapper flexColumn10'>
                <div>
                    <label htmlFor="fullName">Full name</label>
                    <input type="text" id="fullName" name='fullName' autoComplete='name' placeholder="e.g. John Forslund" required />
                </div>
                <div>
                    <label htmlFor="tableNumber">Table number</label>
                    <input type="number" id="tableNumber" name='tableNumber' autoComplete='off' placeholder="e.g. 3" required />
                </div>
                <div>
                    <label htmlFor="messageChefText">Message to the chefs</label>
                    <textarea name='message' id="messageChefText" placeholder="Optional..."></textarea>
                </div>
                <button type='submit'>Send order</button>
            </div>
        </form>
        </>
    )
}

export default DiningInForm;