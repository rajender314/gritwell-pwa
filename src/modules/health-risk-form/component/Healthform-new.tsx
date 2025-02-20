/* eslint-disable react/no-unescaped-entities */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React from 'react';
import {useEffect, useRef, useState} from 'react';
// import Question from './Questions';
// import axios from 'axios';
// import CommonSnackbar from '@app/core/snackbar';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
// import {useForm} from 'react-hook-form';
import Button from '@app/components/button';
// import Header from '@app/components/header/header';
import {Description} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import {ScrollSection} from '@app/modules/boarding-screens/component/boarding-screen-components';
import {
  DesktopWidth,
  FormWidth,
  Loader,
  MainContainer,
} from '@app/styles/common-styles';
// import {Error} from '@app/styles/common-styles';
import apiEndpoint from '@app/core/apiend_point';
import {getLocalStorage, setLocalStorage} from '@app/core/localStorageService';
import {triggerApi} from '@app/services';
// import {useNavigate} from 'react-router-dom';
import {
  ButtonMain,
  EmailContainer,
  Errormessage,
  FilterContainer,
  FilterHeading,
  FilterMain,
  FilterOptions,
  FormDescription,
  ImageContainer,
  ImageDiv,
  InputField,
  MultiSelect,
  Options,
  Progress,
  ProgressBarContainer,
  Progresssub,
  QuestionContainer,
  QuestionScreen,
  QuitzContainer,
  Wraps,
} from './quitz-component';
import './style.css';
import {isMobile} from 'react-device-detect';
import Icon from '@app/components/icon';
import {emailPattern} from '@app/core/pattern';
// import CommonSnackbar from '@app/core/snackbar';
import {
  BodyText2,
  IconsContainer,
} from '@app/modules/assesment-questions/assesment-questions-components';
import {formatPhoneNumbers} from '@app/utils';
import FormHeader from './FormHeader';
import ReactPixel from 'react-facebook-pixel';
import gtag from 'ga-gtag';
import Spinner from '@app/components/icon/icons/loader';
import CommonSnackbar from '@app/core/snackbar';

export default function FullPage() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  // const {id}: any = useParams();
  // const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  // const [redirectUrl, updateRedirectUrl] = useState('');
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.healthRiskForm,
      // headers: {
      //   Authorization: 'Bearer a349794875c4a27fed4d789b4e0eef3edad44896',
      // },
    };
    triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            setData(response.data.form);
            setLoader(false);
          }
        })
        .catch((error) => {
        });
  };

  return (
    <>{loader ? <Loader>
      <Spinner size="6px" />
    </Loader> : data.length ? <FormGenerator questions={data} /> :
    <div>No questions Found...</div>}</>
  );
}

function FormGenerator({questions}) {
  // const [showSectionMsg, setShowSectionMsg] = useState(false);
  // const [apperance, setApperance] = useState('success');
  // const [infoMsg, setInfoMsg] = useState<string>('');
  // const redirectUrl = getLocalStorage('webreUrl') ? getLocalStorage('webreUrl') : '';
  // const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(() => {
    return JSON.parse(localStorage.getItem('currentQuestion')) || questions[0];
  });
  const [form, setForm] = useState(() => {
    return JSON.parse(localStorage.getItem('form')) || [questions[0]];
  });
  const [progressIndex, setProgressIndex] = useState(() => {
    return localStorage.getItem('progressIndex') ?
      JSON.parse(localStorage.getItem('progressIndex')) :
      0;
  });

  useEffect(() => {
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
  }, [currentQuestion]);

  useEffect(() => {
    localStorage.setItem('form', JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    localStorage.setItem('progressIndex', JSON.stringify(progressIndex));
  }, [progressIndex]);

  const [error, setError] = useState('');
  const [sohId, setSohId] = useState('');
  const question = useRef<any>();

  const getNextQuestion = () => {
    ReactPixel.trackCustom(currentQuestion.title);
    gtag('event', currentQuestion.title, {
      'event_category': 'question',
    });
    // scroll to top move next question
    question.current.scrollTo(0, 0);
    // change question based on selected option
    if (
      currentQuestion.type !== 'statement' &&
      currentQuestion.value.length === 0 &&
      currentQuestion.other === undefined
    ) {
      if (currentQuestion.type === 'multiple_choice' || currentQuestion.type==='yes_no') {
        setError(' Please make a selection');
      } else {
        setError('Please fill this in  ');
      }
    } else {
      let next_question_ref_id;
      if ((currentQuestion.response_type === 'choice' || currentQuestion.response_type === 'boolean') && currentQuestion.value) {
        const chosenOption = currentQuestion.options.find((option) => {
          return option.label === currentQuestion.value;
        });
        if (chosenOption.next_question === '') {
          next_question_ref_id = currentQuestion.next_question_ref_id;
        } else {
          next_question_ref_id = chosenOption.next_question;
        }
      } else if (currentQuestion.response_type !== 'choice' && currentQuestion.response_type !== 'boolean') {
        next_question_ref_id = currentQuestion.next_question_ref_id;
      }
      const new_question_index = questions.findIndex((question) => {
        return question.question_ref_id === next_question_ref_id;
      });
      const new_question = questions[new_question_index];
      if (new_question != null) {
        setProgressIndex(new_question_index);
        setCurrentQuestion(new_question);
        setForm([...form, new_question]);
      }
    }
  };

  const getPrevQuestion = () => {
    const temp_form = JSON.parse(JSON.stringify(form));
    temp_form.pop();
    const prev_question = temp_form[temp_form.length - 1];
    if (prev_question != null) {
      setProgressIndex(progressIndex - 1);
      setForm(temp_form);
      setCurrentQuestion(prev_question);
    }
  };
  const inputHandler = (value) => {
    // console.log('value');
    if (value !== '' && value.length !== 0) {
      setError('');
    }
    const tempquestion = currentQuestion;
    tempquestion.value = value;
    setCurrentQuestion(tempquestion);
  };
  const inputOther = (other: string) => {
    const tempquestion = currentQuestion;
    tempquestion.other = other;
    setCurrentQuestion(tempquestion);
  };
  const [inProg, updateInProg] = useState(false);
  const [apperance, setApperance] = useState('success');
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const submitHandler = () => {
    // console.log('dgdg');
    // console.log(currentQuestion);
    if (inProg) {
      return;
    }
    updateInProg(true);
    // if (currentQuestion.value==='' ) {
    //   setError('Please enter a valid Phone Number');
    //   updateInProg(false);
    // } else
    if (error ==='') {
      localStorage.clear();

      const payloadData = [];
      form.map((question: any, i: any) => {
        const currData = {
          type: question.response_type,
          field: {
            id: question.id,
            type: question.type,
            ref: question.question_ref_id,
          },
        };
        currData[question.response_type] =
          question.response_type === 'choices' ?
            question.properties.allow_other_choice === true ?
          {labels: question.value ? question.value : [],
            other: question.other} :
            {labels: question.value} :
            question.response_type === 'choice' ?
            {label: question.value} :
            question.value;
        payloadData.push(currData);
      });

      const apiObject: PayloadProps = {
        payload: {
          answers: payloadData,
          soh_id: sohId,
        },
        method: 'POST',
        apiUrl: apiEndpoint.healthRiskFormPostApi,
        // headers: {
        //   Authorization: 'Bearer a349794875c4a27fed4d789b4e0eef3edad44896',
        // },
      };
      triggerApi(apiObject)
          .then((res) => {
            // updateRedirectUrl(res.data?.redirectionUrl);
            if (res.status_code === 200) {
              ReactPixel.trackCustom(currentQuestion.title);
              ReactPixel.trackCustom(res.data?.redirectionUrl);
              ReactPixel.trackCustom('Health spectrum submitted successfully');
              gtag('event', currentQuestion.title, {
                'event_category': 'submit',
              });
              gtag('event', 'Health spectrum submitted successfully', {
                'event_category': 'submit',
              });
              setLocalStorage('webreUrl', res.data?.redirectionUrl);
              // navigate('/health-spectrum-end?data='+res.data?.redirectionUrl);
              window.location.replace(res.data?.redirectionUrl);
              updateInProg(false);
              // ReactPixel.trackCustom(res.data?.redirectionUrl);
            // setApperance('success');
            // setInfoMsg('Details submitted successfully');
            // setShowSectionMsg(true);
            } else {
              setApperance('error');
              setInfoMsg(res.data ? res.data : res.data.message);
              setShowSectionMsg(true);
              updateInProg(false);
            }
          })
          .catch((error) => {
            // ReactPixel.trackCustom('Health spectrum submitted successfully');
            // setShowSectionMsg(false);
            // setApperance('success');
            // setInfoMsg(error?.message || 'Details submitted successfully');
            // setTimeout(() => {
            //   setShowSectionMsg(true);
            // }, 1000);
            updateInProg(false);
          });
      // window.location.replace(redirectUrl);

      // console.log('send data', apiObject.payload);
      // navigate('/health-spectrum-end');
    }
  };
  const saveEmailData = () => {
    const payloadData = [];
    form.map((question: any, i: any) => {
      const currData = {
        type: question.response_type,
        field: {
          id: question.id,
          type: question.type,
          ref: question.question_ref_id,
        },
      };
      currData[question.response_type] =
        question.response_type === 'choices' ?
          question.properties.allow_other_choice === true ?
          {labels: question.value ? question.value : [],
            other: question.other} :
            {labels: question.value} :
          question.response_type === 'choice' ?
          {label: question.value} :
          question.value;
      payloadData.push(currData);
    });
    const apiObject: PayloadProps = {
      payload: {
        answers: payloadData,
        soh_id: sohId ? sohId : '',
      },
      method: 'POST',
      apiUrl: apiEndpoint.healthRiskFormPostApi,
      headers: {Authorization: getLocalStorage('token')},
    };
    triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response['status_code'] === 200) {
            setSohId(response['data']['soh_id']);
          }
        })
        .catch((error) => {
        });
  };

  return (
    <>
      <CommonSnackbar
        title="Error"
        appearance={apperance}
        message={infoMsg}
        open={showSectionMsg}
        close={() => setShowSectionMsg(false)}
      />
      <MainContainer bgColor="#F8F5F0" id="Mycontainer">

        <FormHeader
          myfunction={() => {
            getPrevQuestion();
          }}
          progressIndex={progressIndex}
        />
        <FormWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto  '}>
          {currentQuestion.type === 'statement' || isMobile ? (
          ''
        ) : (
          <Progress>
            <span>
              {Math.round(((progressIndex ) / questions.length) * 100)}%
              complete
            </span>
            <ProgressBarContainer>
              <Progresssub
                style={{
                  width: `${((progressIndex) / questions.length) * 100}%`,
                }}
              ></Progresssub>
            </ProgressBarContainer>
          </Progress>
        )}
        </FormWidth>
        <ScrollSection
          id="scrollable-div"
          ref={question}
          className={isMobile ? 'flex-1 flex-unset' : 'flex-1 flex-unset smooth'}
        >
          {/* <div>
          <CommonSnackbar
            title="Error"
            appearance={apperance}
            message={infoMsg}
            open={showSectionMsg}
            close={() => setShowSectionMsg(false)}
          />
        </div> */}
          <div style={{width: '100%', height: '100%'}}>
            {progressIndex !== 0 && (
              <div>
                {isMobile ? (
                <IconsContainer
                  className="d-flex mrt-6 prev-p gap-10 my-10"
                  onClick={() => {
                    getPrevQuestion();
                  }}
                >
                  <Icon name="chervonLeft" />
                  <BodyText2 className={'p-0'}>Previous question</BodyText2>
                </IconsContainer>
              ) : null}
              </div>
            )}
            {currentQuestion.type != 'statement' && isMobile ? (
            <Progress className="my-10">
              <span>
                {Math.round(((progressIndex + 1) / questions.length) * 100)}%
                complete
              </span>
              <ProgressBarContainer>
                <Progresssub
                  style={{
                    width: `${((progressIndex + 1) / questions.length) * 100}%`,
                  }}
                ></Progresssub>
              </ProgressBarContainer>
            </Progress>
          ) : null}
            <Question2
              question={currentQuestion}
              inputHandler={inputHandler}
              getNextQuestion={getNextQuestion}
              error={error}
              submitHandler={submitHandler}
              inputOther={inputOther}
              saveEmailData={saveEmailData}
            />
          </div>
        </ScrollSection>
      </MainContainer>
    </>
  );
}

function Question2({
  question,
  inputHandler,
  getNextQuestion,
  submitHandler,
  inputOther,
  error,
  saveEmailData,
}) {
  let components;


  if (question.response_type === 'statement') {
    components = (
      <Statement question={question} getNextQuestion={getNextQuestion} />
    );
  } else if (question.response_type === 'choices') {
    components = (
      <ChoicesInput
        question={question}
        inputHandler={inputHandler}
        getNextQuestion={getNextQuestion}
        error={error}
        inputOther={inputOther}
      />
    );
  } else if (question.response_type=== 'choice') {
    components = (
      <ChoiceInput
        question={question}
        inputHandler={inputHandler}
        getNextQuestion={getNextQuestion}
        error={error}
      />
    );
  } else if (question.response_type=== 'text') {
    components = (
      <TextInput
        question={question}
        inputHandler={inputHandler}
        getNextQuestion={getNextQuestion}
        error={error}
      />
    );
  } else if (question.response_type=== 'boolean') {
    components = (
      <BooleanInput
        question={question}
        inputHandler={inputHandler}
        getNextQuestion={getNextQuestion}
        error={error}
      />
    );
  } else if (question.response_type=== 'number') {
    components = (
      <NumberInput
        question={question}
        inputHandler={inputHandler}
        getNextQuestion={getNextQuestion}
        error={error}
      />
    );
  } else if (question.response_type=== 'email') {
    components = (
      <EmailInput
        question={question}
        inputHandler={inputHandler}
        getNextQuestion={getNextQuestion}
        error={error}
        saveEmailData={saveEmailData}
      />
    );
  } else if (question.response_type=== 'phone_number') {
    components = (
      <PhoneNumberInput
        question={question}
        inputHandler={inputHandler}
        getNextQuestion={getNextQuestion}
        submitHandler={submitHandler}
        error={error}
      />
    );
  } else {
    components = (
      <Statement question={question} getNextQuestion={getNextQuestion} />
    );
  }


  return <div className="question-container">{components}</div>;
}

function Statement({question, getNextQuestion}) {
  return (
    <MainContainer bgColor="#F8F5F0">
      <DesktopWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto  '}>
        <FilterContainer className="container ">
          <FilterMain className={isMobile ? 'py-40' : 'customPaddingTop pb-40'}>
            <ImageContainer>
              {' '}
              <img
                src={
                  isMobile ?
                    question.layout.webImage :
                    question.layout.webImage
                }
                alt="User"
              />
            </ImageContainer>
            <QuitzContainer className="d-flex">
              <div>
                <FilterHeading>{question.title}</FilterHeading>
                {
                  question.description ? <FormDescription>{question.description}</FormDescription> :null
                }
                {/* <FormDescription>It's important to understand what external factors may be driving your symptoms so we can eliminate them at the root</FormDescription> */}

                <ButtonMain>
                  <Button
                    variant={'primary'}
                    width="150px"
                    onClick={getNextQuestion}
                  >
                    {question.button}
                  </Button>
                </ButtonMain>
              </div>
            </QuitzContainer>
          </FilterMain>
        </FilterContainer>
      </DesktopWidth>
    </MainContainer>
  );
}

function ChoicesInput({question, inputHandler, inputOther, getNextQuestion, error}) {
  const [value, setValue] = useState(question.value);
  const [other, setOther] = useState(question.other);
  useEffect(() => {
    setValue(question.value);
    if (question.other === undefined) {
      setOther('');
    } else {
      setOther(question.other.trim());
    }
  }, [question]);
  useEffect(() => {
    inputOther(other);
    inputHandler(value);
  }, [value, other]);

  const options = question.options.map((option, i: number) => {
    return (
      <>
        <MultiSelect
          key={'check' + i}
          style={{
            width:
            question.layout.webImage || question.options.length <= 7 ?
              ' 100%  ' :
              '',
          }}
        >
          <label>
            <Options
              className={
                value !== '' && value.includes(option.label) ?
                  'active b-c ' :
                'b-c'
              }
            >
              <input
                name={question.question_ref_id}
                type="checkbox"
                value={option.label}
                checked={value !== '' && value.includes(option.label)}
                onChange={(e) => {
                  if (value === '') {
                    setValue([option.label]);
                  } else if (value.includes(option.label)) {
                    const i = value.indexOf(option.label);
                    const temp_value = value;
                    temp_value.splice(i, 1);
                    setValue(JSON.parse(JSON.stringify(temp_value)));
                  } else {
                    const temp_value = value;
                    temp_value.push(option.label);
                    setValue(JSON.parse(JSON.stringify(temp_value)));
                  }
                }}
              />

              <span style={{flex: 1}}> {option.label}</span>
            </Options>
          </label>
        </MultiSelect>
        {question.options.length === i + 1 &&
          question.properties.allow_other_choice === true && (
          <MultiSelect style={{
            width:
            question.layout.webImage || question.options.length <= 7 ?
              ' 100%  ' :
              '',
          }}>
            <label>
              <Options className={other !== '' ? 'active b-c' : 'b-c'}>
                <InputField
                  type="text"
                  placeholder="Other"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                />
              </Options>
            </label>
          </MultiSelect>
        )}
      </>
    );
  });
  return (
    <MainContainer bgColor="#F8F5F0">
      {question.layout.webImage ? (
        <>
          <DesktopWidth className={isMobile ? ' m-auto px-16' : 'w-1150 m-auto  '}>
            <QuestionScreen>
              <FilterOptions>
                {question.layout.webImage ? (
                  <ImageDiv style={{height: '100%'}}>
                    {' '}
                    <img
                      src={
                        isMobile ?
                          question.layout.webImage :
                          question.layout.webImage
                      }
                    />
                  </ImageDiv>
                ) : null}
                <QuestionContainer>
                  <FilterHeading>{question.title}</FilterHeading>
                  {
                  question.description ? <FormDescription>{question.description}</FormDescription> :null
                  }
                  {/* <FormDescription>It's important to understand what external factors may be driving your symptoms so we can eliminate them at the root</FormDescription> */}
                  {question.options.length <= 7 ? (
                    <div
                      className="flx-col-10"
                      style={{paddingTop: '40px', paddingBottom: '40px'}}
                    >
                      {options}
                    </div>
                  ) : (
                    <div
                      className="d-flex flex-wrap gap-15 "
                      style={{paddingTop: '40px', paddingBottom: '40px'}}
                    >
                      {options}
                    </div>
                  )}
                  <div>
                    <Errormessage>
                      <span>{error}</span>
                    </Errormessage>

                    <ButtonMain>
                      <Button
                        variant={'primary'}
                        width="150px"
                        onClick={getNextQuestion}
                      >
                        {question.button}
                      </Button>
                    </ButtonMain>
                  </div>
                </QuestionContainer>
              </FilterOptions>
            </QuestionScreen>
          </DesktopWidth>{' '}
        </>
      ) : (
        <>
          <FormWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto  '}>
            <QuestionContainer>
              <FilterHeading>{question.title}</FilterHeading>
              {
                  question.description ? <FormDescription>{question.description}</FormDescription> :null
              }
              {question.options.length <= 7 ? (
                <div
                  className="flx-col-10"
                  style={{paddingTop: '40px', paddingBottom: '40px'}}
                >
                  {options}
                </div>
              ) : (
                <div
                  className="d-flex flex-wrap gap-15 "
                  style={{paddingTop: '40px', paddingBottom: '40px'}}
                >
                  {options}
                </div>
              )}
              <div>
                <Errormessage>
                  <span>{error}</span>
                </Errormessage>
                <ButtonMain className={isMobile ? 'p-0' : ''}>
                  <Button
                    variant={'primary'}
                    width="150px"
                    onClick={getNextQuestion}
                  >
                    {question.button}
                  </Button>
                </ButtonMain>
              </div>
            </QuestionContainer>
          </FormWidth>
        </>
      )}
    </MainContainer>
  );
}

function ChoiceInput({question, inputHandler, getNextQuestion, error}) {
  const [value, setValue] = useState(question.value);

  useEffect(() => {
    inputHandler(value);
  }, [value]);

  const options = question.options.map((option, i: number) => {
    return (
      <Wraps key={'radio' + i} style={{paddingTop: '20px'}}>
        <label>
          <Options
            className={
              value !== '' && value.includes(option.label) ?
                'active b-c ' :
                'b-c'
            }
          >
            <input
              name={question.question_ref_id}
              type="radio"
              value={option.label}
              checked={option.label === value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <span>{option.label}</span>
          </Options>
        </label>
      </Wraps>
    );
  });
  return (
    <MainContainer bgColor="#F8F5F0">
      <ScrollSection
        id="scrollable-div"
        className={isMobile ? 'flex-1 flex-unset mb-64' : 'flex-1 flex-unset'}
      >
        <FormWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto  '}>
          <QuestionScreen>
            <FilterContainer className="container">
              <FilterOptions>
                {question.layout.webImage ? (
                  <ImageDiv>
                    {' '}
                    <img
                      src={
                        isMobile ?
                          question.layout.webImage :
                          question.layout.webImage
                      }
                    />
                  </ImageDiv>
                ) : null}
                <QuestionContainer>
                  <FilterHeading>{question.title}</FilterHeading>
                  {
                  question.description ? <FormDescription>{question.description}</FormDescription> :null
                  }
                  <div className=" gap-15">{options}</div>
                  <div>
                    <Errormessage>
                      <span>{error}</span>
                    </Errormessage>
                    <ButtonMain className="btn">
                      <Button
                        variant={'primary'}
                        width="150px"
                        onClick={getNextQuestion}
                      >
                        {question.button}
                      </Button>
                    </ButtonMain>
                  </div>
                </QuestionContainer>
              </FilterOptions>
            </FilterContainer>
          </QuestionScreen>
        </FormWidth>
      </ScrollSection>
    </MainContainer>
  );
}

function TextInput({question, inputHandler, getNextQuestion, error}) {
  const [value, setValue] = useState(question.value);

  useEffect(() => {
    inputHandler(value);
  }, [value]);

  return (
    <>
      <MainContainer bgColor="#F8F5F0">
        <ScrollSection
          id="scrollable-div"
          className={isMobile ? 'flex-1 flex-unset mb-64' : 'flex-1 flex-unset'}
        >
          <FormWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto'}>
            <div>
              <EmailContainer>
                <FilterHeading className="quitz">
                  {question.title}
                </FilterHeading>
                {
                  question.description ? <FormDescription>{question.description}</FormDescription> :null
                }
                <Description className="f-16s ">
                  Your Name <span>*</span>
                </Description>
                <Options className="email">
                  <input
                    type="email"
                    placeholder=" Please enter your Name
             "
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </Options>
                <div>
                  <Errormessage>
                    <span>{error}</span>
                  </Errormessage>
                  <ButtonMain>
                    <Button
                      variant={'primary'}
                      width="150px"
                      onClick={getNextQuestion}
                    >
                      {question.button}
                    </Button>
                  </ButtonMain>
                </div>
              </EmailContainer>
            </div>
          </FormWidth>
        </ScrollSection>
      </MainContainer>
    </>
  );
}

function BooleanInput({question, inputHandler, getNextQuestion, error}) {
  const [value, setValue] = useState(question.value);

  useEffect(() => {
    inputHandler(value);
  }, [value]);

  const options = question.options.map((option, i: number) => {
    return (
      <Wraps key={'radio' + i} style={{paddingTop: '20px'}}>
        <label>
          <Options
            className={
              value !== '' && value.includes(option.label) ?
                'active b-c ' :
                'b-c'
            }
          >
            <input
              name={question.question_ref_id}
              type="radio"
              value={option.label}
              checked={option.label === value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <span>{option.label}</span>
          </Options>
        </label>
      </Wraps>
    );
  });
  return (
    <MainContainer bgColor="#F8F5F0">
      <ScrollSection
        id="scrollable-div"
        className={isMobile ? 'flex-1 flex-unset mb-64' : 'flex-1 flex-unset'}
      >
        <FormWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto  '}>
          <QuestionScreen>
            <FilterContainer className="container">
              <FilterOptions>
                <QuestionContainer>
                  <FilterHeading>{question.title}</FilterHeading>
                  {
                  question.description ? <FormDescription>{question.description}</FormDescription> :null
                  }
                  <div className=" gap-15">{options}</div>
                  <div>
                    <Errormessage>
                      <span>{error}</span>
                    </Errormessage>
                    <ButtonMain className="btn">
                      <Button
                        variant={'primary'}
                        width="150px"
                        onClick={getNextQuestion}
                      >
                        {question.button}
                      </Button>
                    </ButtonMain>
                  </div>
                </QuestionContainer>
              </FilterOptions>
            </FilterContainer>
          </QuestionScreen>
        </FormWidth>
      </ScrollSection>
    </MainContainer>
  );
}

function NumberInput({question, inputHandler, getNextQuestion, error}) {
  const [value, setValue] = useState(question.value);

  useEffect(() => {
    inputHandler(value);
  }, [value]);

  return (
    <div>
      <MainContainer bgColor="#F8F5F0">
        <ScrollSection
          id="scrollable-div"
          className={isMobile ? 'flex-1 flex-unset mb-64' : 'flex-1 flex-unset'}
        >
          <FormWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto'}>
            <div>
              <EmailContainer>
                <FilterHeading className="quitz">
                  {question.title}
                </FilterHeading>
                {
                  question.description ? <FormDescription>{question.description}</FormDescription> :null
                }
                <Options className="email">
                  <input
                    type="range"
                    placeholder=" Please enter your number
             "
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </Options>
                <div>
                  <Errormessage>
                    <span>{error}</span>
                  </Errormessage>
                  <ButtonMain>
                    <Button
                      variant={'primary'}
                      width="150px"
                      onClick={getNextQuestion}
                    >
                      {question.button}
                    </Button>
                  </ButtonMain>
                </div>
              </EmailContainer>
            </div>
          </FormWidth>
        </ScrollSection>
      </MainContainer>
    </div>
  );
}

function EmailInput({question, inputHandler, getNextQuestion, error, saveEmailData}) {
  const [value, setValue] = useState(question.value);
  const [Error, setError] = useState(null);
  useEffect(() => {
    inputHandler(value);
  }, [value]);
  function isValidEmail(email) {
    return emailPattern.test(email);
  }
  const Handle = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }

    setValue(event.target.value);
  };

  return (
    <MainContainer bgColor="#F8F5F0">
      <ScrollSection
        id="scrollable-div"
        className={isMobile ? 'flex-1 flex-unset mb-64' : 'flex-1 flex-unset'}
      >
        <FormWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto'}>
          <div>
            <EmailContainer>
              <FilterHeading className="quitz">{question.title}</FilterHeading>
              {
                  question.description ? <FormDescription>{question.description}</FormDescription> :null
              }
              <Description className="f-16s">
                Your Email <span>*</span>
              </Description>
              <Options className="email">
                <input
                  type="email"
                  placeholder="Please enter your email"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                  value={value}
                  onChange={Handle}
                />
              </Options>
              <div>
                <Errormessage>
                  {question.value === '' ? (
                    <span>{error}</span>
                  ) : (
                    <span>{Error}</span>
                  )}
                </Errormessage>
                <ButtonMain>
                  <Button
                    variant={'primary'}
                    width="150px"
                    onClick={()=>{
                      if (!error && !Error) {
                        getNextQuestion();
                        saveEmailData();
                      }
                    }}
                  >
                    {question.button}
                  </Button>
                </ButtonMain>
              </div>
            </EmailContainer>
          </div>
        </FormWidth>
      </ScrollSection>
    </MainContainer>
  );
}

function PhoneNumberInput({
  question,
  inputHandler,
  getNextQuestion,
  submitHandler,
  error,
}) {
  const [value, setValue] = useState(question.value);
  // const [Error, setError] = useState(null);

  useEffect(() => {
    inputHandler(value);
  }, [value]);
  // function isValidPhone(phone) {
  //   return phone.length === 14 ? true : false;
  // }
  const Handle = (event) => {
    // if (!isValidPhone(event.target.value)) {
    //   setError('Phone Number is invalid');
    // } else {
    //   setError(null);
    // }
    setValue(formatPhoneNumbers(event.target.value));
  };

  return (
    <div>
      <MainContainer bgColor="#F8F5F0">
        <ScrollSection
          id="scrollable-div"
          className={isMobile ? 'flex-1 flex-unset mb-64' : 'flex-1 flex-unset'}
        >
          <DesktopWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto'}>
            <FilterContainer className="content">
              <FilterMain>
                <ImageContainer>
                  {' '}
                  <img
                    src={
                      isMobile ?
                        question.layout.webImage :
                        question.layout.webImage
                    }
                    alt="User"
                  />
                </ImageContainer>
                <QuitzContainer className={isMobile ? '' : 'w-50'}>
                  <FilterHeading>{question.title}</FilterHeading>
                  {
                  question.description ? <FormDescription>{question.description}</FormDescription> :null
                  }
                  {/* <FormDescription>It's important to understand what external factors may be driving your symptoms so we can eliminate them at the root</FormDescription> */}
                  <Description className="f-16s">
                    Your Phone Number for us to text
                  </Description>
                  <Options className="email">
                    <input
                      type="tel"
                      // pattern="^\+?[0-9]{10}+$"
                      value={value}
                      inputMode="numeric"
                      maxLength={14}
                      placeholder="Please enter your phone number"
                      onChange={Handle}
                    />
                  </Options>
                  <div>
                    {/* <Errormessage>
                      {question.value === '' ? (
                        <span>{error}</span>
                      ) : (
                        <span>{Error}</span>
                      )}
                    </Errormessage> */}
                    <ButtonMain >
                      <Button
                        variant={'primary'}
                        width="150px"
                        onClick={submitHandler }
                      >
                        {question.button}
                      </Button>
                    </ButtonMain>
                  </div>
                </QuitzContainer>
              </FilterMain>
            </FilterContainer>
          </DesktopWidth>{' '}
        </ScrollSection>
      </MainContainer>
    </div>
  );
}

