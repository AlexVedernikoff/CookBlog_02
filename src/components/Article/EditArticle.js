import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

import NewArticle from '../Article/NewArticle';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { db } from '../../firebase';

function EditArticle() {
    const [isSuccessAlert, setSuccessAlert] = useState(false);
    const id = useParams();

    const articleUpdate = async (val) => {
        const modifiedArticle = {
            name: val.title.trim(),
            description: val.description,
            body: val.body,
            difficulty: val.difficulty,
            ingredients: val.ingredients.map((el) => el.trim()).filter((el) => el && el !== ''),
            image: val.image || '',
        };
        await setDoc(doc(db, '1', id.id), { 'recipes': modifiedArticle }, { merge: true }),
        setSuccessAlert(true);
    };

    const atCloseAletr = () => {
        setSuccessAlert(false);
    };

    const form = !isSuccessAlert && (
        <NewArticle
            title="Edit recipes"
            transferData={articleUpdate}
        />
    );

    const successAlert = isSuccessAlert && (
        <SuccessMessage description="Recipe update successfully!" closingAlert={atCloseAletr} closable={true} />
    );
    return (
        <>
            {successAlert}
            {form}
        </>
    );
}

export default EditArticle;