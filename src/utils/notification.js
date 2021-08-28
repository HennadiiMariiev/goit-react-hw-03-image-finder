import { toast } from 'react-toastify';

export default function notificate(type, message) {
  let notification = null;

  switch (type) {
    case 'error':
      notification = toast.error(message);
      break;
    case 'warning':
      notification = toast.warn(message);
      break;
    case 'success':
      notification = toast.success(message);
      break;
    default:
      notification = toast.dark(message);
  }

  return notification;
}
