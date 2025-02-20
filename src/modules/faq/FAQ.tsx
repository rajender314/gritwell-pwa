/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React from 'react';
import Faq from 'react-faq-component';
import {FaqBox, FaqDiv, FaqQues} from './faq-components';
type Props ={
  data?: any
}

export default function FAQ({data}: Props) {
  const newData = data?.map(({
    answer: content,
    question: title,
    ...data
  }) => ({
    content,
    title,
    ...data,
  }));
  const faqData={
    rows: newData,
  };
  return (
    <React.Fragment>
      <FaqBox>
        <FaqDiv>
          <FaqQues>
            <Faq
              data={faqData}
            />
          </FaqQues>
          {/* <FaqButtons>
            <Button>
              Purchase Plan
            </Button>
            <FaqLabelDiv>
              <FaqLabel>See more details</FaqLabel>
            </FaqLabelDiv>
          </FaqButtons> */}
        </FaqDiv>
      </FaqBox>
    </React.Fragment>
  );
}
