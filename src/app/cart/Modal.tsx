import Image from "next/image";

interface ModalProps {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    modalRef: React.RefObject<HTMLDivElement | null>,
    clientName: string,
}

const Modal = ({ modal, setModal, modalRef, clientName }: ModalProps) => {
    return (
        <div ref={modalRef} className={`
            orderSentModal centeredElement flexColumn10
            ${modal ? 'modalOn' : ''}
        `}>
            <div className="orderSentModalImageWrapper flexCenter">
                <Image
                    src='/app-images/true.png'
                    alt='Successful'
                    width={50}
                    height={50}
                    priority
                />
            </div>
            <h2>Thanks {clientName}!</h2>
            <h3>We received your order!</h3>
            <p>We’ll prepare it right away and serve you as soon as possible.</p>
            <button onClick={() => setModal(false)}>OK</button>
        </div>
    )
}

export default Modal;