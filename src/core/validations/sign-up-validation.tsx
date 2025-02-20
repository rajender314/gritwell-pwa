import validations from './validations';

export const messages = {
  email: {
    required: 'Please enter email address',
    email: 'Please enter valid email address',
  },
  phone: {
    required: 'Please enter Phone Number',
  },
  first_name: {
    required: 'Please enter Phone Number',
  },
  last_name: {
    required: 'Please enter Phone Number',
  },
};
export const signUpSchema = validations({
  email: 'required|email',
  phone: 'required',
  last_name: 'required',
  first_name: 'required',
}, messages);
