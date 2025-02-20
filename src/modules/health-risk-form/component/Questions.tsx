/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, {useState} from 'react';
// import Quitz from './Quitz';
import './style.css';
// import {Line} from 'rc-progress';
import Header from '@app/components/header/header';
import {ScrollSection} from '@app/modules/boarding-screens/component/boarding-screen-components';
import {DesktopWidth, Heading, MainContainer} from '@app/styles/common-styles';
// import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
// import rectangle from '@app/assets/images/rectangle.png';
import Button from '@app/components/button';
import {Filtercontainer, FilterQuiz, ImageDiv, Quitzcontainer} from './quitz-component';
// import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
// import apiEndpoint from '@app/core/apiend_point';
// import {triggerApi} from '@app/services';
// import {getLocalStorage} from '@app/core/localStorageService';
// import {useParams} from 'react-router-dom';
export default function Question({
  question,
  index,
  setNextQuestion,
  inputHandler,
  submitHandler,
  setCurrentQuestion,
}) {
  interface Option {
    id: string;
    label: string;
    next_question: string;
  }
  // const [showScore, setShowScore] = useState(false);
  // const [red, setRed] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError]=useState('');
  // const [currentQuestion, setcurrentQuestion] = useState(0);
  const changeQuestion = (isCorrect: any) => {
    // setError('')
    question.value = question.temp_value;
    if (question.type !=='statement' &&
     question.type !== 'opinion_scale'&& question.value ==='' ) {
      if (question.type === 'text') {
        setError('please fill this in  ');
      } else {
        setError('Oops! please make a selection ');
      }
    } else {
      if (question.options.length > 0 && question.value !== '') {
        const selectedOption = question.options.find((option: Option) => {
          return option.label === question.value;
        });
        if (
          !question.properties.allow_multiple_selection &&
        selectedOption.next_question !== ''
        ) {
          setScore(score + 1);
          // setScore(question.next_question_ref_id+1);
          setCurrentQuestion(index);
          setNextQuestion(selectedOption.next_question);
        } else {
          setScore(score + 1);
          // setScore(question.next_question_ref_id+1);
          setCurrentQuestion(index);
          setNextQuestion(question.next_question_ref_id);
        }
      } else if (question.options.length == 0) {
        setScore(score + 1);
        // setScore(question.next_question_ref_id+1);
        setCurrentQuestion(index);
        setNextQuestion(question.next_question_ref_id);
      }
    }


    // if (question.options.length > 0 && question.value !== '') {
    //   const selectedOption = question.options.find((option: Option) => {
    //     return option.label === question.value;
    //   });
    //   if (
    //     !question.properties.allow_multiple_selection &&
    //     selectedOption.next_question !== ''
    //   ) {
    //     setScore(score + 1);
    //     // setScore(question.next_question_ref_id+1);
    //     setCurrentQuestion(index);
    //     setNextQuestion(selectedOption.next_question);
    //   } else {
    //     setScore(score + 1);
    //     // setScore(question.next_question_ref_id+1);
    //     setCurrentQuestion(index);
    //     setNextQuestion(question.next_question_ref_id);
    //   }
    // } else if (question.options.length == 0) {
    //   setScore(score + 1);
    //   // setScore(question.next_question_ref_id+1);
    //   setCurrentQuestion(index);
    //   setNextQuestion(question.next_question_ref_id);
    // }
  };


  const typeFix = {
    short_text: 'text',
    email: 'email',
    // opinion_scale: 'range',
    phone_number: 'number',
  };
  let modifiedInput: JSX.Element = <div></div>;
  if (question.type === 'statement') {
    modifiedInput = (
      <MainContainer bgColor="#F8F5F0" className="flx-start">

        {!isMobile ? <Header hideBackArrow={false} navigateLink="/" hideLogo={true} className="bg-white" /> : null}

        <ScrollSection id="scrollable-div" className={isMobile?'flex-1 flex-unset mb-64':'flex-1 flex-unset'}>

          <DesktopWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto  '} >

            <Filtercontainer className='container'>
              <FilterQuiz>
                <div> <ImageDiv>  <img src={question.layout.webImage} alt="User" /></ImageDiv></div>
                < Quitzcontainer>
                  <Heading className='quitz'>{question.title}</Heading>

                  <div className='  '>
                    <Button variant={'primary'} size='large' width='25%'>Let`s get Started</Button>
                  </div>
                </Quitzcontainer>
              </FilterQuiz>
            </Filtercontainer>

          </DesktopWidth >

        </ScrollSection>
      </MainContainer>
      // <Quitz>
      //   <div

      //     style={{marginBottom: '16px'}}
      //     id={question.question_ref_id}
      //     onKeyUp={(e) => e.key === 'Enter' && changeQuestion(() => {})}
      //     tabIndex={0}
      //   ></div>
      // </Quitz>

    );
  } else if (question.type === 'opinion_scale') {
    modifiedInput = (
      <label>
        <input
          className='input-value'
          type='range'
          id={question.question_ref_id}
          name={question.question_ref_id}
          value={question.temp_value}
          min={1}
          max={10}
          onKeyUp={(e) => e.key === 'Enter' && changeQuestion(() => {})}
          onChange={inputHandler}
        />

      </label>
    );
  } else if (question.type === 'yes_no') {
    modifiedInput = (
      <div
        id={question.question_ref_id}
        onChange={inputHandler}
        onKeyUp={(e) => e.key === 'Enter' && changeQuestion(() => {})}
        tabIndex={0}
      >
        <fieldset>
          {/* <div className='yes-n yes'>
            <input
              type="radio"
              name={question.question_ref_id}
              value="yes"
              // checked={'yes' === question.value ? true : false}
            />
            <div className="input-design"></div>
            <div className="text">Yes</div>
          </div> */}
          <label className={
            'yes' === question.temp_value ?
             'active yes-n yes' : 'yes-n yes'} >
            <input
              type='radio'
              className='check-input'
              name={question.question_ref_id}
              value='yes'
              checked={'yes' === question.temp_value ? true : false}
              // onChange={() => changeQuestion(()=>{})}
              onChange={()=>setError('')}
            />
            <div className='check-design'></div>
            <div className='check-text'>Yes</div>
          </label>
          <label className={
            'no' === question.temp_value ?
             'active yes-n yes' : 'yes-n yes'}>
            <input
              className='check-input'
              type='radio'
              name={question.question_ref_id}
              value='no'
              checked={'no' === question.temp_value ? true : false}
              // onChange={() => changeQuestion(()=>{})}
              onChange={()=>setError('')}
            />
            <div className='check-design'></div>
            <div className='check-text'>No</div>
          </label>
        </fieldset>
      </div>
    );
  } else if (question.type === 'multiple_choice') {
    let isMultipleSelect = true;
    if ('allow_multiple_selection' in question.properties) {
      isMultipleSelect = question.properties.allow_multiple_selection;
    }
    const inputoptions = question.options.map((option: Option, i: any) => {
      if (isMultipleSelect) {
        return (
          <div className='Mutiple' key={i}>
            <div className={
              question.temp_value !== '' &&
                  question.temp_value.includes(option.label) ?
                   'active checkbox' : 'checkbox'
            } key={i}>
              <input
                className='check-input'
                type={'checkbox'}
                id={option.id}
                name={question.question_ref_id}
                value={option.label}
                checked={
                  question.temp_value !== '' &&
                  question.temp_value.includes(option.label)
                }
                // onChange={() => changeQuestion(()=>{})}
                onChange={()=>setError('')}
                onClick={(e) => {
                  // console.log(e.target);

                  if (question.temp_value === '') {
                    question.temp_value = [option.label];
                  } else if (question.temp_value.includes(option.label)) {
                    const i = question.temp_value.indexOf(option.label);
                    question.temp_value.splice(i, 1);
                  } else {
                    question.temp_value.push(option.label);
                  }
                }}
              />
              <label htmlFor={option.id} >
                {option.label}

                {/* {question.value} */}
              </label>
            </div>
          </div>
        );
      } else {
        return (
          <div key={i} className={
            question.temp_value === option.label ?
            'active yes-n' : 'yes-n'}>
            <div className='input-ded'>
              <input
                className='check-input'
                type={'radio'}
                id={option.id}
                name={question.question_ref_id}
                value={option.label}
                checked={question.temp_value === option.label}
                // onChange={() => changeQuestion(()=>{})}
                onChange={()=>setError('')}
              />

              {/* <label htmlFor={option.id}>{option.label}</label> */}
              <div className='check-design'></div>
            </div>
            <div className='check-text'>
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          </div>
        );
      }
    });
    modifiedInput = (
      <div
        id={question.question_ref_id}
        onChange={inputHandler}
        tabIndex={0}
        onKeyUp={(e) => e.key === 'Enter' && changeQuestion(() => {})}
        className='focu'
      >
        <div className='' style={{marginLeft: '12px '}}
          onClick={()=>{}}
        >
          {inputoptions}
        </div>
      </div>
    );
  } else {
    modifiedInput = (
      <div style={{marginTop: '32px'}}>
        <input
          placeholder='Type your answer here...'
          name={question.question_ref_id}
          id={question.question_ref_id}
          type={typeFix[question.type]}
          value={question.temp_value}
          min={1}
          max={10}
          className='input-value'
          onKeyDown={()=>setError('')}
          onKeyUp={(e) => e.key === 'Enter' && changeQuestion(() => {})}
          onChange={inputHandler}
        />
      </div>
    );
  }

  return (
    <>
      {/* <div>
        <Line percent={score * 5} strokeWidth={1} strokeColor="green" />
      </div> */}

      <div>
        <div className='title'>

          {/* <h2 className='count'>
            {index + 1}.<Icon type="arrow-right" />
          </h2>
          <h2 className='title'>{question.display_title || question.title}</h2> */}
        </div>
        {modifiedInput}
        {/* <br /> */}
        <p className='error-message'>{error}</p>
        {question.next_question_ref_id === '' ? (
          <button className='submit-btn' onClick={submitHandler}>
            SUBMIT
          </button>
        ) : (
          <div style={{marginTop: '8px', marginLeft: '24px'}}>
            <button
              className='enter-btn'
              onClick={() => changeQuestion(() => {})}
            >
              OK
            </button>
            <span className='press-enter'>
              {' '}
              press <span className='bold'>ENTER</span>
            </span>
          </div>
        )}
      </div>
    </>
  );
}
