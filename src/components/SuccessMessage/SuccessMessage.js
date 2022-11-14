import { Alert } from 'antd';

const SuccessMessage = ({ description, closingAlert, closable }) => {
    return (
        <div >
            <Alert
                message="Success!"
                description={description}
                type="success"
                showIcon
                closable={closable}
                onClose={() => closingAlert()}
            />
        </div>
    );
};

export { SuccessMessage };