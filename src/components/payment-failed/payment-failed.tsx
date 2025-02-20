/* eslint-disable max-len */
import React from 'react';
import {
  AlertDiv,
  AlertLabel,
  AlertPara,
  AlertParentDiv,
  ButtonDiv,
} from './payment-failed-component';
import Button from '../button/button';
import {useNavigate} from 'react-router-dom';

/**
 * Renders Component.
 * @return {PaymentFailedAlert} renders Component.
 */
export default function PaymentFailedAlert() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <AlertParentDiv>
        <AlertDiv>
          <AlertLabel>
            Subscription payment failed. Update subscription payment method.
          </AlertLabel>
          <AlertPara>
            PLACEHOLDER TEXT - dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </AlertPara>
          <ButtonDiv>
            <Button
              variant={'primary'}
              size="large"
              width="auto"
              className={'px-4'}
              onClick={() => {
                navigate('/add-payment');
              }}
            >
              Update payment method
            </Button>
          </ButtonDiv>
        </AlertDiv>
      </AlertParentDiv>
    </React.Fragment>
  );
}
