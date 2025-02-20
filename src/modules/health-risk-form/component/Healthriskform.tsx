/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import {MainContainer} from '@app/styles/common-styles';
import React, {useState, useEffect} from 'react';
import Question from './Questions';
// import axios from 'axios';
import CommonSnackbar from '@app/core/snackbar';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import apiEndpoint from '@app/core/apiend_point';
// import {getLocalStorage} from '@app/core/localStorageService';
import {useParams} from 'react-router-dom';
import {ScrollSection} from
  '@app/modules/boarding-screens/component/boarding-screen-components';
import {isMobile} from 'react-device-detect';

// import {Line} from 'rc-progress';
// import {token} from '@app/mixpanel/Service';
// import {object} from 'yup';
/**
 * Renders Component.
 * @return {FullPage} renders Component.
 */
export default function FullPage() {
  const [data, setData] = useState();
  const {id}: any = useParams();

  // const [showSectionMsg, setShowSectionMsg] = useState(false);
  // const [apperance, setApperance] = useState('success');
  // const [infoMsg, setInfoMsg] = useState<string>('');
  // const token = getLocalStorage('token') ? getLocalStorage('token') : '';

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const {data: response} = await axios.get(
  //           'http://localhost:5558/office/clients/typeform/g45XgQJ9',
  //           {
  //             headers: {
  //               Authorization:
  //                'Bearer aa0ba7d2176b9b4c2c906206d3d4d5168f9c6248',
  //             },
  //           },
  //       );
  //       setData(response.data.form);
  //       // setShowSectionMsg(true);
  //       // setTimeout(() => {
  //       setShowSectionMsg(false);
  //       setApperance('success');
  //       setInfoMsg('Deatils submitted successfully');
  //       setTimeout(() => {
  //         setShowSectionMsg(true);
  //       }, 1000);
  //       // }, 3000);
  //     } catch (error) {
  //       setShowSectionMsg(false);
  //       setApperance('success');
  //       setInfoMsg(error?.message || 'Deatils submitted successfully');
  //       setTimeout(() => {
  //         setShowSectionMsg(true);
  //       }, 1000);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.healthRiskForm + id,
      // headers: {
      //   Authorization: 'Bearer aa0ba7d2176b9b4c2c906206d3d4d5168f9c6248',
      // },
      headers: {
        Authorization: 'Bearer a349794875c4a27fed4d789b4e0eef3edad44896',
      },
      // headers: {Authorization: token},
    };
    triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          setData(response.data.form);
        // if (response.status_code == 200) {
        //   setShowSectionMsg(true);
        //   setApperance('success');
        //   setInfoMsg('Deatils submitted successfully');
        //   setTimeout(() => {
        //     setShowSectionMsg(false);
        //   }, 1000);
        // }
        // setApperance('success');
        // setInfoMsg('Deatils submitted successfully');
        })
        .catch((error) => {
        // setShowSectionMsg(false);
        // setApperance('success');
        // setInfoMsg(error?.message || 'Deatils submitted successfully');
        // setTimeout(() => {
        //   setShowSectionMsg(true);
        // }, 1000);
        });
  };

  return (
    <div>
      {/* <CommonSnackbar
      title="Error"
      appearance={apperance}
      message={infoMsg}
      open={showSectionMsg}
      close={() => setShowSectionMsg(false)}
    /> */}

      {data ? <FormGenerator data={data} /> : <div>Loading...</div>}
    </div>
  );
}

function FormGenerator({data}) {
  // const {id}: any = useParams();
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [apperance, setApperance] = useState('success');
  const [infoMsg, setInfoMsg] = useState<string>('');

  // const [red, setRed] = useState(false);
  // const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(() => {
    return JSON.parse(localStorage.getItem('questions')) || [];
  });
  const [nextQuestion, setNextQuestion] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('nextQuestion')) ||
      data[0]['question_ref_id']
    );
  });
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const curr = JSON.parse(localStorage.getItem('currentQuestion'));
    return curr === null ? -1 : curr;
  });
  const [newQuestionIndex, setNewQuestionIndex] = useState(0);

  useEffect(() => {
    questions.forEach((question) => {
      if (question.display_title !== 'undefined') {
        const regexp =
          // eslint-disable-next-line max-len
          /{{field:[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}}}/;
        const match = question.title.match(regexp) || null;
        if (match) {
          const i = questions
              .map((q: any) => q.question_ref_id)
              .indexOf(match[0].substring(8, 44));
          question.display_title = question.title.replaceAll(
              match[0],
              questions[i].value,
          );
        }
      }
    });
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
    // console.log(
    //     ((currentQuestion + 2) / data.length) * 100,
    //     currentQuestion + 2,
    //     data.length,
    // );
  }, [currentQuestion]);

  useEffect(() => {
    questionHandler();
    localStorage.setItem('nextQuestion', JSON.stringify(nextQuestion));
  }, [nextQuestion]);

  const questionHandler = () => {
    setQuestions((s:any) => {
      const indx = data.findIndex((obj: object) => {
        return obj['question_ref_id'] === nextQuestion;
      });
      setNewQuestionIndex(indx);
      const newQuestion = data[indx];
      const regexp =
        // eslint-disable-next-line max-len
        /{{field:[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}}}/;
      // const match = newQuestion['title'].match(regexp) || null;
      const match = newQuestion ? newQuestion['title'].match(regexp) : null;
      if (match) {
        const i = questions
            .map((q) => q.question_ref_id)
            .indexOf(match[0].substring(8, 44));
        newQuestion.display_title = newQuestion.title.replaceAll(
            match[0],
            questions[i].value,
        );
      }
      return [...s.slice(0, currentQuestion + 1), newQuestion];
    });
    setTimeout(() => {
      document.getElementById(nextQuestion).focus();
    }, 200);
  };
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    setQuestions((q) => {
      const newQuestions = q.slice();
      const index = newQuestions
          .map((q: any) => q.question_ref_id)
          .indexOf(name);
      if (type !== 'checkbox') {
        newQuestions[index].temp_value = value;
      }
      if (questions.type === 'email') {
        return 'A Email is required';
      }
      if (questions.type === 'number') {
        return 'Phone number is required';
      }
      return newQuestions;
    });
  };

  // const validate = (values) => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   if (!values.username) {
  //     errors.username = 'Username is required!';
  //   }
  //   if (!values.email) {
  //     errors.email = 'Email is required!';
  //   } else if (!regex.test(values.email)) {
  //     errors.email = 'This is not a valid email format!';
  //   }
  //   if (!values.password) {
  //     errors.password = 'Password is required';
  //   } else if (values.password.length < 4) {
  //     errors.password = 'Password must be more than 4 characters';
  //   } else if (values.password.length > 10) {
  //     errors.password = 'Password cannot exceed more than 10 characters';
  //   }
  //   return errors;
  // };

  const submitHandler = () => {
    questions[questions.length - 1].value =
      questions[questions.length - 1].temp_value;
    localStorage.clear();
    // console.log(questions);
    const payloadData = [];
    questions.map((question: any, i: any) => {
      const currData = {
        type: question.response_type,
        field: {
          id: question.id,
          type: question.type,
          ref: question.question_ref_id,
        },
      };
      // eslint-disable-next-line max-len
      currData[question.response_type] =
        question.response_type === 'choices' ?
          {labels: question.value} :
          question.response_type === 'choice' ?
          {label: question.value} :
          question.value;
      payloadData.push(currData);
    });
    // console.log('send data', payloadData);

    // setApperance('success');
    // setInfoMsg('Deatils submitted successfully');
    // setShowSectionMsg(true);
    // console.log(payloadData);
    // const result = Object.entries(questions);
    // const [showSectionMsg, setShowSectionMsg] = useState(false);
    // const payload = {
    //   answers: questions,
    // };

    const apiObject: PayloadProps = {
      payload: {
        answers: payloadData,
      },
      method: 'POST',
      apiUrl: apiEndpoint.healthRiskFormPostApi,
      // headers: {
      //   Authorization: 'Bearer aa0ba7d2176b9b4c2c906206d3d4d5168f9c6248',
      // },
      headers: {
        Authorization: 'Bearer a349794875c4a27fed4d789b4e0eef3edad44896',
      },
    };
    triggerApi(apiObject)
        .then(() => {
          setApperance('success');
          setInfoMsg('Details submitted successfully');
          setShowSectionMsg(true);
        })
        .catch((error) => {
          setShowSectionMsg(false);
          setApperance('success');
          setInfoMsg(error?.message || 'Details submitted successfully');
          setTimeout(() => {
            setShowSectionMsg(true);
          }, 1000);
        });
  };

  return (
    <>
      <MainContainer>

        <ScrollSection id="scrollable-div"
          className={
            isMobile ? 'flex-1 flex-unset mb-64 pb-30' :
             'flex-1 flex-unset smooth'
          }>
          <div style={{width: '100%', height: '100vh'}}>
            {/* <div>
        <Line percent={score +25} strokeWidth={1} strokeColor="green" />
      </div> */}
            <div>
              <CommonSnackbar
                title='Error'
                appearance={apperance}
                message={infoMsg}
                open={showSectionMsg}
                close={() => setShowSectionMsg(false)}
              />
            </div>

            {questions.map((question: any, i: any) => {
              return (
                <div className='questionContainer' key={i}>
                  <div className='questons-seprate-container'>
                    <Question
                      question={question}
                      // onClick={()=>}
                      index={i}
                      setNextQuestion={setNextQuestion}
                      inputHandler={inputHandler}
                      submitHandler={submitHandler}
                      setCurrentQuestion={setCurrentQuestion}
                    />
                  </div>
                </div>
              );
            })}
            <div className='progressbar'>
              <div
                style={{
                  width: `${((newQuestionIndex + 1) / data.length) * 100}%`,
                }}
              ></div>
            </div>
            {/* <div>
        {questions.map((question:any, i:any) => {
          return (
            <div key={i}>
              <div >
                <Question
                  question={question}
                  index={i}
                  setNextQuestion={setNextQuestion}
                  inputHandler={inputHandler}
                  submitHandler={submitHandler}
                  setCurrentQuestion={setCurrentQuestion}
                />
              </div>
            </div>
          );
        })}
      </div> */}
          </div>
        </ScrollSection>
      </MainContainer>
    </>
  );
}
