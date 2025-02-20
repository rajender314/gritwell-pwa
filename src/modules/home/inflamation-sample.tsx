/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {IconsContainer} from '../assesment-questions/assesment-questions-components';
import {MainContainer} from '@app/styles/common-styles';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import Button from '@app/components/button';
import Header from '@app/components/header';
// import {FooterButtons} from
//   '../boarding-screens/component/boarding-screen-components';
import {service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaService} from '@app/googleAnalytics/googleAnalytics';
import {HeaderMain} from '@app/components/header/header-components';
import Icon from '@app/components/icon';
import {Mixpanel} from '@app/App';
import {NextPill, HomeToDoCards, HomeToDoCardTitle, InflamtionContent, InflamationHeading, CurrentPill, KitInstructions} from '../home/home-components';
import {LayoutWrapper, LeftContainer, ImageContainer, RightContainer, RightContent, BackBtnContainer, BackIconContainer, TextContent, Actions} from '../sign-up/component/signup.components';
import InflamationBg from '@app/assets/images/inflmmationBG.png';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import apiEndpoint from '@app/core/apiend_point';
import {getLocalStorage} from '@app/core/localStorageService';
import {triggerApi} from '@app/services';
import CommonSnackbar from '@app/core/snackbar';
/**
 * Renders Component.
 * @return {AssesmentQuestions} renders Component.
 */
export default function InflamationSample() {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState<any>({});
  const [infoMsg, setInfoMsg] = useState<string>('');
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [apperance, setApperance] = useState('success');
  const [configList, setConfigList] = useState<any>();

  useEffect(()=>{
    const configLists = getLocalStorage('configList') ?
    JSON.parse(getLocalStorage('configList')) : '';
    setConfigList(configLists);
    const userPlan= JSON.parse(getLocalStorage('todoData'));
    {userPlan.map((todo: any)=>{
      if (todo.code === 'COLLECTION_INFLAMMATION_SAMPLE') {
        setCurrentPlan(todo);
      }
    });
    }
  }, [getLocalStorage('todoData')]);
  useEffect(()=>{
    Mixpanel.track(service['assesmentQuestions']['title'], service['assesmentQuestions']['props']);
    gtag('event', gaService['assesmentQuestions']['title'], {
      'event_category': gaService['assesmentQuestions']['category'],
    });
  }, []);

  const onsubmit = () =>{
    const apiObject: PayloadProps = {
      payload: {},
      method: 'PUT',
      apiUrl: `${apiEndpoint.rootCauseTodos}/${currentPlan._id}`,
      headers: {Authorization: getLocalStorage('token') ? getLocalStorage('token') : ''},
    };
    triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        setApperance('success');
        setInfoMsg('Response submitted successfully!');
        setShowSectionMsg(true);
        setTimeout(()=>{
          navigate('/rootcause-home');
        }, 3000);
      } else {
        setApperance('error');
        setInfoMsg('');
        setShowSectionMsg(true);
      }
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
      <MainContainer bgColor={isMobile? '#ffffff':'#FAFAFC'}
        className={isMobile ? 'fxh-100' : ''}>
        {!isMobile? <Header hideBackArrow={false} className='txt-left'
          desktopMenu={isMobile ? false : true}/>: null}
        {isMobile? <HeaderMain className={isMobile ? 'text-center d-flex js-bet p-10' :'text-center d-flex js-bet'}>
          <IconsContainer className='d-flex mrt-6' onClick={() => {
            navigate('/home');
          }
          }>
            <Icon name={'chervonLeft'} />
          </IconsContainer>
          <IconsContainer className='flex-1'
            color='black'
            onClick={() => (0)
            }>
            <Icon name='headerLogo' />
          </IconsContainer>
        </HeaderMain>: null}
        <LayoutWrapper className='with-header'>
          <LeftContainer style={{backgroundColor: '#B0DECF'}}>
            {/* {isMobile && <BackBtnContainer className='positioned'>
              <BackIconContainer onClick={() => {
                navigate('/rootcause-home');
              }}>
                <Icon name='backarrow'/>
              </BackIconContainer>
            </BackBtnContainer>} */}
            <ImageContainer className='d-flex justify-content-center'>
              {/* <ImageHolder> */}
              <img className={isMobile ? 'w-100' : ''} alt='inflammationBG' src={InflamationBg} />
              {/* </ImageHolder> */}
            </ImageContainer>
          </LeftContainer>
          <RightContainer>
            <RightContent>
              <div className="content-wrapper">
                {!isMobile && <BackBtnContainer className='pb-24'>
                  <BackIconContainer onClick={() => {
                    navigate('/rootcause-home');
                  }}>
                    <Icon name='backarrow'/>
                  </BackIconContainer>
                </BackBtnContainer>}
                <TextContent className='p-0'>
                  <CurrentPill>Current Step</CurrentPill>
                  <InflamationHeading className='m-0 py-16'>Collect and return inflammation sample</InflamationHeading>
                  <InflamtionContent className='mt-0 mb-24'>Your kit will have detailed instructions on how to collect your sample. Make sure you follow the right steps to collecting your sample then mark this task as complete.</InflamtionContent>
                  <KitInstructions onClick={() =>
                    window.open(configList['readKitInstructions'], '_blank')
                  }>Read kit instructions</KitInstructions>
                </TextContent>
                <Actions className='pb-40' style={{paddingTop: '40px'}}>
                  <Button variant={'primary'}
                    className={'responsive-Imbalance-btn'}
                    type="submit"
                    onClick={() => onsubmit()}
                    size='large' width='100%'
                  >I have completed this step</Button>
                </Actions>
                <div style={{background: '#F8F5F0', padding: (isMobile?'40px 24px 16px':'40px 40px 16px'), margin: (isMobile?'0 -24px -24px' : '0 -40px -40px')}}>
                  <NextPill className='mb-12'>Next Step</NextPill>
                  <HomeToDoCards
                    className={`${isMobile ? 'w-100' : ''}`} style={{borderTop: ' 10px solid #E8EAF1'}}
                  >
                    <div className="flex-1 dflex justify-content-between gap-24">
                      <div className='d-flex gap-12'>
                        <HomeToDoCardTitle>
                        Book an appointment with your health coach
                        </HomeToDoCardTitle>
                      </div>
                      <div className='dflex gap-12'>
                        {/* <div>
                          {moment().diff(
                              userDetails['todo_list_dueDate'],
                              'days',
                          ) < 0 ? (
                                        <HomeToDoCardStatus>
                                          {todo.due_date ?
                                            'Due ' +
                                              dateFormats(
                                                  todo.due_date,
                                                  'MMMM Do',
                                              ) :
                                            'Complete'}
                                        </HomeToDoCardStatus>

                                      ) : (
                                        <HomeToDoCardStatus
                                          color={
                                            !userDetails[
                                                'inflamation_test_ordered'
                                            ] ?
                                              '#B11818' :
                                              ''
                                          }
                                        >
                                          {!userDetails[
                                              'inflamation_test_ordered'
                                          ] ?
                                            'Overdue ' :
                                            'Completed'}
                                        </HomeToDoCardStatus>

                                      )}
                        </div> */}
                        {/* <div>
                          <Icon name='chervonRight' />
                        </div> */}
                      </div>
                    </div>
                  </HomeToDoCards>
                </div>
              </div>
            </RightContent>
          </RightContainer>
        </LayoutWrapper>
        {/* {isMobile? <DesktopWidth className='w-100 fixed-footer h-64 br-tp'>
          <FooterButtons className='js-end'>
            <Button variant={'primary'} size='large' width='40%'
              className={'w-40'}
              onClick={() => {
                navigate('/timeline-quiz-questions');
                Mixpanel.track(action['assesmentQues']['getStarted']['title'], action['assesmentQues']['getStarted']['props']);
                gtag('event', gaAction['assesmentQues']['getStarted']['title'], {
                  'event_category': gaAction['assesmentQues']['getStarted']['category'],
                });
              }}
            >Get started</Button>
          </FooterButtons>
        </DesktopWidth>: null} */}

      </MainContainer>
    </>
  );
}
