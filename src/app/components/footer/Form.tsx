import { useEffect, useRef } from 'react';
import { useUpdateFooterMutation } from '../../../../features/footer/footerApi';
import { ContactObj } from '../../../../types/Footer';

interface FormProps {
    form: boolean,
    data?: ContactObj,
    setContactObj: React.Dispatch<React.SetStateAction<ContactObj>>,
    contactObj: ContactObj,
}

const Form = ({ form, data, setContactObj, contactObj }: FormProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [updateFooter] = useUpdateFooterMutation();

    useEffect(() => {
        if(data) {
            setContactObj({
                mobile: data.mobile,
                email: data.email,
                messenger: data.messenger,
                whatsapp: data.whatsapp,
            });
        }
    }, [data]);

    useEffect(() => {
        if(!formRef.current) return;
        if(form) {
            formRef.current.style.height = `${formRef.current.scrollHeight}px`;
        } else {
            formRef.current.style.height = '0px';
        }
    }, [form]);

    const handlePrepareObj = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactObj(prev => ({
            ...prev, [name]: value
        }));
    }

    const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateFooter(contactObj).unwrap();
            setContactObj({
                mobile: '',
                email: '',
                messenger: '',
                whatsapp: '',
            });
        } catch (err) {
            console.error('Error saving data:', err);
            alert('Error saving data');
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSaveSettings} className='footerFormSettings'>
            <div className="footerFormSettingsInnerWrapper flexColumn10">
                <input type="tel" placeholder='Mobile number' autoComplete='tel' name='mobile' value={contactObj.mobile || ''} onChange={handlePrepareObj} />
                <input type="email" placeholder='Email address' autoComplete='email' name='email' value={contactObj.email || ''} onChange={handlePrepareObj} />
                <input type="text" placeholder='Messenger' name='messenger' value={contactObj.messenger || ''} onChange={handlePrepareObj} />
                <input type="text" placeholder='WhatsApp number' name='whatsapp' value={contactObj.whatsapp || ''} onChange={handlePrepareObj} />
                <button type='submit'>Save</button>
            </div>
        </form>
    )
}

export default Form;