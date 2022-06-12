import { Store } from 'react-notifications-component';

function Notification(title, message, type) {
    return Store.addNotification(
        {
            title: title,
            message: message,
            type: type,
            container: "top-right",
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
}

export default Notification;