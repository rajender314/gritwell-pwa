/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {
  ButtonDiv,
  ExtendContainer,
  ExtendTitle,
  MembershipContainer,
  MembershipDiv,
  MembershipLabel,
  MembershipPara,
  Title,
} from './designs-comonents';
import {createSearchParams, useLocation, useNavigate} from 'react-router-dom';
import apiEndpoint from '@app/core/apiend_point';
import Button from '@app/components/button';
import {
  IconsContainer,
  ImageWrapper,
} from '../assesment-questions/assesment-questions-components';
import {DesktopWidth, MainContainer} from '@app/styles/common-styles';
import {
  FooterButtons,
  ScrollSection,
} from '../boarding-screens/component/boarding-screen-components';
import {ContentContainer} from '../assesment-questions/assesment-questions-components';
import homeImg2 from '@app/assets/images/homescreen3-des.png';
import homeImg from '@app/assets/images/homescreen3.png';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {getLocalStorage} from '@app/core/localStorageService';
import Header from '@app/components/header/header';

/**
 * @return {RootCare}
 */
export default function RootCare() {
  const navigate = useNavigate();
  const location = useLocation();
  const [planDes, setPlanDes] = useState([]);
  const [coachData, setCoachData] = useState({});
  const [selectedData, updateSelectedData] = useState({});
  const [selectedID, setSelectedID] = useState('');
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';

  useEffect(() => {
    setCoachData(location?.state?.coachData);
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.customerExtendCarePlans,
      headers: {Authorization: token},
    };
    triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code == 200) {
            setPlanDes(response.data);
            updateSelectedData(response['data'][0]);
            setSelectedID(response['data'][0]['_id']);
          } else {
            setPlanDes([]);
          }
        });
  }, []);


  const selectPlan = (id) => {
    const singlePlan = planDes.filter((item) => {
      return item['_id'] === id;
    });
    updateSelectedData(singlePlan[0]);
    setSelectedID(singlePlan[0]?.['_id']);
  };

  return (
    <>
      <MainContainer bgColor='#fff'>
        <Header
          className="justify-content-between"
          bgCol={isMobile ? '#ffffff' : '#ffffff'}
          desktopMenu={isMobile ? false : true}
          showMessage={true}
          hideBack={false}
          hideBackArrow={false}
        />
        <ScrollSection
          id="scrollable-div"
          className={
            isMobile ? 'flex-1 flex-unset mb-64 pb-30' : 'flex-1 flex-unset '
          }
        >
          <DesktopWidth>
            <ContentContainer
              bgColor={'transparent'}
              className={isMobile ? 'p-0 d-flex js-cen' : 'py-0 d-flex js-cen'}
            >
              <div className="pos-rel bg-white p-0 shadow pb-15">
                <IconsContainer
                  className="bg-after"
                  onClick={() => navigate('/')}
                >
                  <ImageWrapper>
                    <img src={isMobile ? homeImg : homeImg2} alt="User" />
                  </ImageWrapper>
                </IconsContainer>
                <ExtendContainer>
                  <Title>Let’s begin working towards your goals!</Title>
                  <ExtendTitle className="pb-30">
                  Continue working with your coach {coachData?.['name']} in order to receive 1:1 care with personalized recommendations on how to reduce your symptoms and reach your goals.
                  </ExtendTitle>
                  {planDes.map((item, index) => {
                    return (
                      <>
                        <MembershipContainer
                          key={index}
                          className={`mb-1 + ${
                            item['_id'] === selectedID ? 'active' : ''
                          }`}
                          onClick={() => {
                            selectPlan(item['_id']);
                          }}
                        >
                          <MembershipDiv>
                            <MembershipLabel className="d-flex">
                              {item?.['plan_type']} - {item?.['plan_duration']} {item?.['duration_type'].toLowerCase()} &nbsp;
                            </MembershipLabel>
                            <MembershipPara>
                              <strong>${item?.['plan_price']} per month.</strong> For 1:1 sessions with your health coach <u>{item['plan_slug'] === 'jumpstart' ? '1x' : '2x'} a month</u> for {item['plan_duration']} months.
                            </MembershipPara>
                          </MembershipDiv>
                        </MembershipContainer>
                      </>
                    );
                  })}
                </ExtendContainer>
                {isMobile ? null : (
                <ButtonDiv
                  className={`${
                    isMobile ?
                      'p-0  w-100 align-items-center gap-24  ' :
                      ' gap-80 d-flex js-end'
                  } `}
                >
                  <Button
                    variant={'primary'}
                    className="w-40  "
                    width="55%"
                    onClick={() => {
                      navigate(
                          {
                            pathname: '/order-payment',
                            search:
                            // eslint-disable-next-line max-len
                            `?${createSearchParams({
                              planType: selectedData?.['plan_slug'],
                              paymentFee: selectedData?.['plan_price'],
                              addPay: 'true',
                              id: selectedData['_id'],
                              userType: 'rootcause',
                            })}`,
                          },
                          {
                            state: {
                              rootData: selectedData,
                            },
                          },
                      );
                    }}
                  >
                    Continue
                  </Button>
                </ButtonDiv>
              )}
              </div>
            </ContentContainer>
          </DesktopWidth>
        </ScrollSection>
        {isMobile ? (
        <DesktopWidth className="w-100 fixed-footer h-64 br-tp">
          <FooterButtons bgColor="#fff">
            <Button
              variant={'primary'}
              className="w-40"
              onClick={() => {
                navigate(
                    {
                      pathname: '/order-payment',
                      search:
                      // eslint-disable-next-line max-len
                      `?${createSearchParams({
                        planType: selectedData?.['plan_slug'],
                        paymentFee: selectedData?.['plan_price'],
                        addPay: 'true',
                        id: selectedData['_id'],
                        userType: 'rootcause',
                      })}`,
                    },
                    {
                      state: {
                        rootData: selectedData,
                      },
                    },
                );
              }}
            >
              Continue
            </Button>
          </FooterButtons>
        </DesktopWidth>
      ) : null}
      </MainContainer>
    </>
  );
}
