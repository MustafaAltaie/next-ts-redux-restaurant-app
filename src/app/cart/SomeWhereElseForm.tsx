
interface someWhereElseProps {
    handleSendOrderRemote: (e: React.FormEvent<HTMLFormElement>) => void
}

const SomeWhereElseForm = ({ handleSendOrderRemote }: someWhereElseProps) => {
    return (
        <>
        <p>Tell us where you are to delever you the order:</p>
        <form onSubmit={handleSendOrderRemote} className='orderSummaryForm'>
            <div className='orderSummaryFormInnerWrapper flexColumn10'>
                <div>
                    <label htmlFor='fullNameText'>Full name</label>
                    <input type="text" id='fullNameText' name='fullName' autoComplete='name' placeholder='e.g. John Forslund' required />
                </div>
                <div>
                    <label htmlFor='addressText'>Full address</label>
                    <input type="text" id='addressText' name='address' autoComplete='street-address' placeholder='e.g. kungsgatan 2A Katrineholm' required />
                </div>
                <div>
                    <label htmlFor='mobileText'>Your number</label>
                    <input type="tel" id='mobileText' name='mobile' autoComplete='tel' placeholder='e.g. 07961234567' required />
                </div>
                <div>
                    <label htmlFor='portNumberText'>Port code if there is</label>
                    <input type="number" id='portNumberText' name='portNumber' autoComplete='tel' placeholder='e.g. 1032' />
                </div>
                <div>
                    <label htmlFor='messageText'>Message to the chefs</label>
                    <textarea name='message' id='messageText' placeholder="Optional..."></textarea>
                </div>
                <button type='submit'>Send order</button>
            </div>
        </form>
        </>
    )
}

export default SomeWhereElseForm;