import './LoadingModal.css';

const LoadingModal = () => {
    return (
        <div className="loadingModal flexCenter centeredElement gap10">
            <h1>Please wait</h1>
            <p>This might take a few seconds</p>
            <div className='loadingModalLight1'></div>
            <div className='loadingModalLight2'></div>
        </div>
    )
}

export default LoadingModal;