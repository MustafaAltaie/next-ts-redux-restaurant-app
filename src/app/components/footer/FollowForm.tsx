import React, { useEffect, useRef } from "react";
import { FooterFollow } from "../../../../types/FooterFollow";
import { useUpdateFooterFollowMutation } from "../../../../features/footer/footerApi";

interface FollowFormProps {
    linksObj: FooterFollow,
    setLinksObj: React.Dispatch<React.SetStateAction<FooterFollow>>,
    form2: boolean,
    followLinks?: FooterFollow,
}

const FollowForm = ({
    linksObj,
    setLinksObj,
    form2,
    followLinks,
}: FollowFormProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [updateFooterFollow] = useUpdateFooterFollowMutation();

    useEffect(() => {
        if(followLinks) {
            setLinksObj({
                facebook: followLinks.facebook,
                instagram: followLinks.instagram,
                twitter: followLinks.twitter,
                linkedIn: followLinks.linkedIn,
                pinterest: followLinks.pinterest,
                tiktok: followLinks.tiktok,
            });
        }
    }, [followLinks, setLinksObj]);

    useEffect(() => {
        if(!formRef.current) return;
        if(form2) {
            formRef.current.style.height = `${formRef.current.scrollHeight}px`;
        } else {
            formRef.current.style.height = '0px';
        }
    }, [form2]);

    const handlePrepareObj = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLinksObj(prev => ({
            ...prev, [name]: value
        }));
    }

    const handleSaveLinks = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateFooterFollow(linksObj).unwrap();
        } catch (err) {
            console.error('Error saving data:', err);
            alert('Error saving data');
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSaveLinks} className="footerFollowForm">
            <div className="footerFollowFormInnerWrapper flexColumn10">
                <input type="text" placeholder="Facebook" name="facebook" value={linksObj.facebook} onChange={handlePrepareObj} />
                <input type="text" placeholder="Instagram" name="instagram" value={linksObj.instagram} onChange={handlePrepareObj} />
                <input type="text" placeholder="Twitter" name="twitter" value={linksObj.twitter} onChange={handlePrepareObj} />
                <input type="text" placeholder="LinkedIn" name="linkedIn" value={linksObj.linkedIn} onChange={handlePrepareObj} />
                <input type="text" placeholder="Pinterest" name="pinterest" value={linksObj.pinterest} onChange={handlePrepareObj} />
                <input type="text" placeholder="Tiktok" name="tiktok" value={linksObj.tiktok} onChange={handlePrepareObj} />
                <button type="submit">Save</button>
            </div>
        </form>
    )
}

export default FollowForm;