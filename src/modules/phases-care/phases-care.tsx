/* eslint-disable max-len */
import {ProgressBar} from '@app/@lib';
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import Spinner from '@app/components/icon/icons/loader';
import apiEndpoint from '@app/core/apiend_point';
import {getLocalStorage} from '@app/core/localStorageService';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {
  MainContainer,
  DesktopWidth,
  Heading3,
  Loader,
  PhasesOfCareCard,
  PhasesOfCareStepsContainer,
} from '@app/styles/common-styles';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import {
  IconsContainer,
  IconName,
  ContentContainer,
  BackDrop,
  DialogContainer,
} from '../assesment-questions/assesment-questions-components';
import {
  ScrollSection,
  MainSection,
} from '../boarding-screens/component/boarding-screen-components';
import {
  SectionCont,
  SectionPillsCont,
} from '../health-journey/health-journey-components';
import {Heading4} from '../recommend-plans/component/recommend-plans-components';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

// import {useNavigate} from 'react-router-dom';
/**
 * Renders Component.
 * @return {PhasesCare} renders Component.
 */
export default function PhasesCare() {
  const navigate = useNavigate();
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [phasesList, updatePhasesList] = useState([]);
  const [startStep, updateStep] = useState(1);
  const [loader, updateLoader] = useState(true);
  let currStaus = [];
  useEffect(() => {
    updateLoader(true);
    updateStep(1);
    getPhasesStatus();
    Mixpanel.track(service['phaseCare']['title'], service['phaseCare']['props']);
    gtag('event', gaService['phaseCare']['title'], {
      'event_category': gaService['phaseCare']['category'],
    });
  }, []);
  const getPhasesStatus = async () => {
    const apiObject1: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.phaseStaus,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject1).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        const statusList = response.data.result;
        const idx = _.findIndex(statusList, function(o: any) {
          return o.code === 'active';
        });
        currStaus = statusList[idx];
        getPhasesData();
      } else {
        updatePhasesList([]);
      }
    });
  };
  const getPhasesData = async () => {
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.phases,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject).then((response: ApiResponseProps) => {
      if (response.status_code === 200) {
        const phData = response.data.result;
        const idx = _.findIndex(phData, function(o: any) {
          return o['clientPhases']['status'] === currStaus['value'];
        });
        updateStep(idx);
        updatePhasesList(phData);
        updateLoader(false);
      } else {
        updatePhasesList([]);
        updateLoader(false);
      }
    });
  };
  return (
    <>
      {loader ? (
        <Loader>
          <Spinner size="6px" />
        </Loader>
      ) : null}
      <MainContainer bgColor="#ffff" className="flx-start">
        <Header hideBackArrow={false} className="txt-left" desktopMenu={isMobile ? false : true} />
        {!loader ? <ScrollSection id="scrollable-div" className="flex-1">
          <DesktopWidth className="w-1150">
            <MainSection className="box-cont">
              {!isMobile ? (
                <div className="ptbr-15">
                  <IconsContainer
                    className="d-flex"
                    onClick={() => {
                      navigate('/health-journey');
                      Mixpanel.track(action['phasesCare']['backArrow']['title'], action['phasesCare']['backArrow']['props']);
                      gtag('event', gaAction['phasesCare']['backArrow']['title'], {
                        'event_category': gaAction['phasesCare']['backArrow']['category'],
                      });
                    }}
                  >
                    <Icon name="backArrow" />
                    <IconName className="mlt-15 f-14">Back</IconName>
                  </IconsContainer>
                </div>
              ) : null}
              <ContentContainer
                bgColor="#FCFBF9"
                className={isMobile ? 'p-20' : 'pt-0'}
              >
                {isMobile ? (
                  <div className="pb-15">
                    <IconsContainer
                      className="d-flex"
                      onClick={() => {
                        navigate('/health-journey');
                        Mixpanel.track(action['phasesCare']['back']['title'], action['phasesCare']['back']['props']);
                        gtag('event', gaAction['phasesCare']['back']['title'], {
                          'event_category': gaAction['phasesCare']['back']['category'],
                        });
                      }}
                    >
                      <Icon name="chervonLeft" />
                    </IconsContainer>
                  </div>
                ) : null}
                <Heading3
                  className={
                    isMobile ? 'f-28 txt-left m-0' : 'f-28 text-center'
                  }
                >
                  Your phases of care
                </Heading3>
                <Heading4
                  className={isMobile ? 'f-16 txt-left' : 'f-16 text-center'}
                >
                  Your coach will guide you through these phases based on your
                  health assessment.
                </Heading4>
              </ContentContainer>
              {!phasesList.length ? (
                <ContentContainer
                  bgColor={!isMobile ? '#FCFBF9' : 'white'}
                  className="h-250 text-center flx-cont"
                >
                  <SectionCont
                    className={
                      isMobile ? 'center-250 d-flex b-0' : 'center-250 d-flex'
                    }
                  >
                    <Heading4 className={'f-16 text-center'}>
                      <b>Your phases of care are coming soon </b>
                      <br />
                      Check back later...
                    </Heading4>
                  </SectionCont>
                </ContentContainer>
              ) : (
                <ContentContainer bgColor="#FCFBF9">
                  <SectionCont>
                    <SectionPillsCont>
                      <ProgressBar
                        startingStep={startStep}
                        onSubmit={() => {}}
                        steps={phasesList}
                        stepClass="vertical"
                        progressClass="vertical"
                        showLabel
                      />
                    </SectionPillsCont>
                  </SectionCont>
                </ContentContainer>
              )}

              <BackDrop>
                <DialogContainer className= {isMobile ? 'h-100 w-100 p-0' : 'p-0'}>
                  <div
                    className={isMobile ? 'flex-1 ovy-scroll ' : 'flex-1 ovy-scroll'}
                  >
                    <div className="d-flex js-bet p-18">
                      <IconsContainer className="d-flex" onClick={() => {
                        navigate('/health-journey');
                        Mixpanel.track(action['phasesCare']['back']['title'], action['phasesCare']['back']['props']);
                        gtag('event', gaAction['phasesCare']['back']['title'], {
                          'event_category': gaAction['phasesCare']['back']['category'],
                        });
                      }}>
                        <Icon name="chervonLeft" />
                      </IconsContainer>
                    </div>

                    <PhasesOfCareCard>
                      <div className='phasesOfCareCardHeader mt-8'>Phases of Care</div>
                      <div className='phasesOfCareCardText'>Your coach will guide you through these phases based on your health assessment.</div>
                    </PhasesOfCareCard>
                    {!phasesList.length ? (
                <ContentContainer
                  bgColor={ '#FCFBF9'}
                  className="h-250 text-center flx-cont"
                >
                  <SectionCont
                    className={
                      isMobile ? 'center-250 d-flex b-0 bg-tr' : 'center-250 d-flex bg-tr b-0'
                    }
                  >
                    <Heading4 className={'f-16 text-center'}>
                      <b>Your phases of care are coming soon </b>
                      <br />
                      Check back later...
                    </Heading4>
                  </SectionCont>
                </ContentContainer>) :
                <>
                  <PhasesOfCareStepsContainer>

                    {phasesList.map((info:any, i:number)=>{
                      return (
                        <PhasesOfCareCard key={i} bgColor={i < startStep ? '#CDEAE1' :
                        i == startStep ? '#FADDBC' : '#fffff'} className={i <= startStep ? 'active' : ''}>
                          <div className='phasesOfCareCardHeader mt-8'>{info.name}</div>
                          <div className='phasesOfCareCardText'>{info['clientPhases']['description']}</div>
                        </PhasesOfCareCard>
                      );
                    })}
                  </PhasesOfCareStepsContainer>
                </>}
                  </div>
                </DialogContainer>
              </BackDrop>
            </MainSection>
          </DesktopWidth>
        </ScrollSection> : null}
      </MainContainer>
    </>
  );
}
