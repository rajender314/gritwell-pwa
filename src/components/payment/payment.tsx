import React, {useMemo} from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import {PaymentSuccess} from '@app/utils';
import Button from '../button';
import {
  PaymentForm,
  CardDetails,
  ExpiryDate,
  Cvv,
  CardHolderName,
  CardError,
  FooterButtonContainer,
  CardPromoField,
} from './payment-componnets';
import {Description} from '../layout-onBoarding/layout-onBoarding-components';
import {appFontColor, color8, color9} from '@app/styles';
import {Mixpanel} from '@app/App';
import {action} from '@app/mixpanel/Service';
import {gaAction} from '@app/googleAnalytics/googleAnalytics';
import gtag from 'ga-gtag';
import {IconContainer} from '../input/input-components';
import Icon from '../icon/icon';
import {Actions} from '@app/modules/sign-up/component/signup.components';
import {setLocalStorage} from '@app/core/localStorageService';

type PaymentProps = {
  amount: number;
  tokenId: any;
  onCancel: (e: any) => void;
  transactionPayment: any;
  paymentStatus?: PaymentSuccess;
  saveCard?: any;
  disMsg: any;
  updatePaymentText: any;
  paymentText: string;
  disableBtn: boolean;
  setDisableBtn: any;
  applyPromoCode?: any;
  codeStatus?: string;
  savedAmt?: number;
  showPromoField?: string;
  setCodeStatus?: any;
  setDiscAmt?: any;
  setCouponCode?: any;
  isRootcausePayment?: boolean;
};

const useOptions = () => {
  const options = useMemo(
      () => ({
        style: {
          base: {
            'fontSize': '16px',
            'color': appFontColor,
            'letterSpacing': '0.025em',
            '::placeholder': {
              color: color8,
            },
          },
          invalid: {
            color: color9,
          },
        },
      }),
      [],
  );

  return options;
};
/**
 *
 * @return {paymentcomponent} global component
 */
export default function Payment({
  amount,
  onCancel,
  tokenId,
  transactionPayment,
  saveCard,
  disMsg,
  updatePaymentText,
  paymentText,
  disableBtn,
  setDisableBtn,
  applyPromoCode,
  codeStatus,
  savedAmt,
  showPromoField,
  setCodeStatus,
  setDiscAmt,
  setCouponCode,
  isRootcausePayment,
}: PaymentProps) {
  // const dollar: string = '$';
  const [cardHolderName, setCardHolderName] = React.useState('');
  const [promoCode, setPromoCode] = React.useState('');
  const stripe: any = useStripe();
  const elements: any = useElements();
  const options = useOptions();
  // const [paymentText, updatePaymentText] = React.useState('Add Card');
  const [, updateIsSubmitted] = React.useState(false);
  const [cardError, updateCardError] = React.useState('');
  const [makeDefa, updateMakeDef] = React.useState(true);
  /**
   *
   * @param {event} event to make payment
   */
  const makePayment = async (event: any) => {
    setDisableBtn(true);
    updateIsSubmitted(true);
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const cardNumber = elements.getElement(CardNumberElement);
    let tokenKey = '';
    if (cardNumber) {
      const payload = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumber,
      });
      if (payload.error || !cardHolderName) {
        updateCardError(
          payload.error ?
            payload.error.message :
            'Please enter card holder name',
        );
        setDisableBtn(false);
        updateIsSubmitted(false);
        updatePaymentText('Add Card');
      } else {
        updatePaymentText('Processing...');
        if (isRootcausePayment) {
          setTimeout(() => {
            updatePaymentText('Add Card');
            setDisableBtn(false);
          }, 4000);
        }
        stripe.createToken(cardNumber).then(function(result) {
          tokenKey = result.token.id;
          if (tokenKey) {
            tokenId({token_Key: tokenKey, is_def: makeDefa});
          }
        });
        // const paymentStatus = await
        // transactionPayment(payload, cardHolderName, tokenKey);
        // if (paymentStatus) {
        //   updateIsSubmitted(false);
        // }
      }
    }
  };

  /**
   *
   * @param {event} event update error message
   * @param {type} type update error message
   */
  function onCardChange(event: any, type?: string) {
    updateCardError('');

    if (type === 'holderName') {
      setCardHolderName(event.target.value);
    } else if (type === 'promoCode') {
      console.log(event.target.value.length);
      if (event.target.value.length === 0) {
        localStorage.removeItem('promo');
      }
      if (event.target.value.length > 0) {
        setPromoCode(event.target.value);
      } else {
        setCouponCode('');
        setPromoCode('');
        setCodeStatus('');
        setDiscAmt();
      }
    }
  }
  return (
    <>
      <PaymentForm style={{flex: 1}}>
        {showPromoField === 'show' && (
          <>
            <Description className="mt-15">Promo Code</Description>
            <CardPromoField>
              <CardHolderName
                value={promoCode}
                placeholder="Type promo code here"
                className="b-0"
                onChange={(e) => onCardChange(e, 'promoCode')}
              />
              {codeStatus === 'success' && (
                <IconContainer className="mrt-6">
                  <Icon name="check" />
                </IconContainer>
              )}
              {codeStatus === 'error' && (
                <IconContainer
                  className="mrt-6"
                  onClick={() => {
                    setCouponCode('');
                    setPromoCode('');
                    setCodeStatus('');
                    setDiscAmt();
                    localStorage.removeItem('promo');
                  }}
                >
                  <Icon name="redCross" />
                </IconContainer>
              )}
              <Button
                width="auto"
                variant="secondary"
                // eslint-disable-next-line max-len
                className={`${
                    promoCode.length > 0 ?
                      'pointer' :
                      'restricted restricted-border'
                } h-40 mb-8 br-5 w-85`}
                onClick={() => {
                  applyPromoCode(promoCode);
                  setLocalStorage('promo', promoCode);
                }}
              >
                  Apply
              </Button>
            </CardPromoField>
            {codeStatus === 'success' && (
              <p className="mt-8 l-5 success">
                  Congratulations! You saved ${savedAmt?.toFixed(2)}
              </p>
            )}
            {codeStatus === 'error' && (
              <p className="mt-8 error l-5">Invalid Promo Code</p>
            )}
          </>
        )}
        <Description className="mt-15">Card number</Description>
        <CardNumberElement
          options={options}
          onChange={(e: any) => onCardChange(e)}
        />
        <CardDetails className='gap-16'>
          <ExpiryDate>
            <Description>Expiry date</Description>
            <CardExpiryElement
              options={options}
              onChange={(e: any) => onCardChange(e)}
            />
          </ExpiryDate>
          <Cvv>
            <Description>CVV / CVC</Description>
            <CardCvcElement
              options={options}
              onChange={(e: any) => onCardChange(e)}
            />
          </Cvv>
        </CardDetails>
        <CardDetails>
          <ExpiryDate style={{width: '100%',
            borderBottom: '1px solid rgb(224, 224, 224)',
            paddingBottom: '0px'}}>
            <Description>Card Holder Name</Description>
            <CardHolderName
              style={{borderBottom: 'none'}}
              value={cardHolderName}
              placeholder="Enter card holder name"
              onChange={(e) => onCardChange(e, 'holderName')}
            ></CardHolderName>
          </ExpiryDate>
          {/* {!saveCard ? <Cvv>
          <Description>Amount</Description>
          <CardHolderName
            value={`${dollar}${currencyFormat(amount)}`}
            disabled={true}></CardHolderName>
        </Cvv> : null} */}
        </CardDetails>
        <CardError>{cardError}</CardError>
        <div
          className="d-flex gap-5 my-22"
          onClick={() => {
            updateMakeDef(!makeDefa);
          }}
        >
          <input type="checkbox" checked={makeDefa} />
          <Description className="m-0">Save card as default</Description>
        </div>
      </PaymentForm>
      <FooterButtonContainer>
        {/* <CancelPayment onClick={onCancel}>Cancel</CancelPayment> */}
        {/* {!saveCard ? <Button
      variant="primary"
      onClick={(e: any) => {
        makePayment(e);
        Mixpanel.track(
            action['payment']['payNow']['title'],
            action['payment']['payNow']['props']);
        gtag('event',
            gaAction['payment']['payNow']['title'], {
              'event-category':
            gaAction['payment']['payNow']['category'],
            });
      }}>
      {paymentText}
    </Button> : */}
        <Actions className='mb-24' style={{justifyContent: 'center'}}>
          <Button
            variant={disableBtn ? 'disabled' : 'primary'}
            className={'responsive-Imbalance-btn'}
            onClick={(e: any) => {
              makePayment(e);
              Mixpanel.track(
                  action['payment']['addCard']['title'],
                  action['payment']['addCard']['props'],
              );
              gtag('event', gaAction['payment']['addCard']['title'], {
                'event-category': gaAction['payment']['addCard']['category'],
              });
            }}
          >
            {paymentText}
          </Button>
        </Actions>
        {/* } */}
      </FooterButtonContainer>
    </>
  );
}
