import { toast } from 'react-toastify';

class MyToastClass {
  success(message: string) {
    toast.success(message, {
      autoClose: 400,
      delay: 100,
      hideProgressBar: true,
    });
  }
  warning(message: string) {
    toast.warning(message, {
      autoClose: 400,
      delay: 100,
      hideProgressBar: true,
    });
  }
  error(message: string) {
    toast.error(message, {
      autoClose: 400,
      delay: 100,
      hideProgressBar: true,
    });
  }
}

export const MyToast = new MyToastClass();
