import {color3, color4, color5, color6, color7, screenSize} from '@app/styles';
import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 12px;
  @media (${screenSize.tablet}) {
    padding: 16px 0px 0px 0px;
  }
`;

export const PaymentError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${color3};
  margin: 0;
  margin-top: -15px;
  bottom: -22px;
  @media (${screenSize.tablet}) {
    justify-content: end;
    bottom: 0;
  }
`;
export const CostItemContainer = styled.div`
  background: ${color4};
  border-radius: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid ${color5};
  flex-direction: column;
  @media (${screenSize.tablet}) {
    flex-direction: row;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
  @media (${screenSize.tablet}) {
    width: 100%;
    flex-direction: row;
  }
`;
export const Title = styled.div`
  font-size: 15px;
  line-height: 19px;
  color: ${color6};
`;
export const Cost = styled.div`
  font-size: 15px;
  line-height: 19px;
  color: ${color6};
`;
export const Value = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  color: ${color7};
  margin-top: 4px;
`;
export const TitleValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  width: 100%;
  @media (${screenSize.tablet}) {
    width: 70%;
  }
`;
export const CostValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0px 0px 16px;
  width: 100%;
  @media (${screenSize.tablet}) {
    width: 30%;
    margin: 0px;
  }
`;
export const CheckMarkIcon = styled.div`
  // .fa-check-circle {
  //   color: #dc3c7e;
  //   height: 21px;
  //   width: 21px;
  // }
  // .fa-circle {
  //   color: white;
  //   height: 21px;
  //   width: 21px;
  //   border-radius: 50%;
  //   border: 2px solid #d63763;
  // }
  // @media (${screenSize.maxMobile}) {
  //   width: 10%;
  // }
`;
export const AddCostItem = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  text-align: right;
  color: #d63763;
  display: flex;
  margin-top: 16px;
  cursor: pointer;
  width: fit-content;
`;

export const AddItemContainer = styled.div`
  background: ${color4};
  border-radius: 8px;
  padding: 16px;
  display: flex;
`;

export const CostItemInput = styled.div`
  width: 100%;
  position: relative;
  padding: 8px 8px 0px 0px;
  @media (${screenSize.tablet}) {
    width: 90%;
  }
`;
export const CostInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 8px 0px 0px;
  justify-content: space-between;
`;
export const CostInput = styled.div`
  width: 70%;
`;
export const TrashIcon = styled.div`
  padding: 0px 0px 8px 8px;
  cursor: pointer;
`;
export const PaymentFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const TotalDue = styled.div`
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  color: #000000;
  opacity: 0.8;
  margin-right: 80px;
`;
export const Amount = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 26px;
  color: #000000;
  opacity: 0.8;
`;

export const PaymentButton = styled.div`
  margin: 24px 0px;
  display: flex;
  justify-content: flex-end;
`;
export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;
export const Message = styled.div`
  font-weight: 600;
  margin: 24px 0 24px 0px;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  color: #110f1f;
`;
export const FailMessage = styled.div`
  font-weight: 600;
  margin: 24px 0 0px 0px;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  color: #110f1f;
`;
export const FailureMessage = styled.div`
  font-size: 18px;
  color: #110f1f;
  opacity: 0.6;
  text-align: center;
`;
export const TryAgain = styled.div`
  margin: 24px 0px 24px 0px;
  text-align: center;
`;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  @media (${screenSize.tablet}) {
    flex-direction: row;
  }
`;
export const Cvv = styled.div`
  padding: 8px 0;
  /* margin-top: 5px; */
  width: 100%;
  margin-top: 0;
  @media (${screenSize.tablet}) {
    width: 50%;
  }
`;
export const CancelPayment = styled.div`
  font-weight: bold;
  font-size: 15px;
  line-height: 19px;
  color: #483311;
  cursor: pointer;
`;
export const CardError = styled.div`
  color: #B11818;
  /* margin-left: 8px; */
`;

export const CardHolderName = styled.input` 
  width: 100%;
  padding: 16px;
  width: 90%; 
  /* margin-top: 5px; */
  font-size: 16px;
  color: #000;
  letter-spacing: 0.025em;
  outline: none;
  border: 0;
  border-bottom: 1px solid #e0e0e0;
  border-top: 0 !important;
        border-left: 0 !important;
        border-right: 0 !important;
  &.b-0, .b-0:focus{
    border: 0 !important;
  }
`;

export const CardPromoField = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
`;
export const CardLabel = styled.label`
  font-weight: 600;
  font-size: 16px;
  line-height: 17px;
  color: #4f5b76;
`;
export const ExpiryDate = styled.div`
  padding: 8px 0;
  /* margin-top: 5px; */
  width: 100%;
  @media (${screenSize.tablet}) {
    width: 50%;
  }
`;
export const FooterButtonContainer = styled.div`
  display: flex;
  align-items: center;
  /* border-top: 2px solid #dce0e8; */
  justify-content: center;
  /* justify-content: flex-end; */
  padding: 16px 16px 0 16px;
  button {
    margin-left: 10px;
  }
`;
export const PaymentForm = styled.div`
  /* padding: 24px; */
  input,
  .StripeElement {
    display: block;
      /* margin: 10px 0 20px 0; */
    // max-width: 500px;
    padding: 10px 0px;
    outline: 0;
    border-radius: 0;
    background: white;
    border-bottom: 1px solid #e0e0e0;
  }

  input::placeholder {
    color: #aab7c4;
  }

  input:focus,
  .StripeElement--focus {
    border: 1px solid #1E3653;
  }
`;

export const PaymentInfo = styled.div`
  background: ${color4};
  border: 1px solid #dee1e4;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;
export const AmountData = styled.div`
  display: flex;
`;
export const UserInfo = styled.div``;
export const CardNumber = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #110f1f;
`;
export const PaidBy = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`;
export const Completed = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #188f71;
`;
export const PayeeInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (${screenSize.tablet}) {
    justify-content: flex-end;
  }
`;
export const CardBrandIcon = styled.span`
  margin-right: 85px;
`;
export const CardData = styled.i``;
export const CardType = styled.div`
  font-size: 15px;
  line-height: 19px;
  color: #656a74;
`;
export const CardInfo = styled.div`
  display: flex;
`;
export const InfoHead = styled.div`
  display: flex;
  justify-content: space-between;
`;
