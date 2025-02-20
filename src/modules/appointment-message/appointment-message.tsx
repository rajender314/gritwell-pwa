/* eslint-disable max-len */
import Calendar from '@app/assets/images/calendar.png';
import Loader from '@app/assets/images/Loading.gif';
import MsgIcon from '@app/assets/images/msg.png';
import Header from '@app/components/header/header';
import Icon from '@app/components/icon/icon';
import {DescViewMore} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import apiEndpoint from '@app/core/apiend_point';
import {getLocalStorage} from '@app/core/localStorageService';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {whiteColor} from '@app/styles';
import {MainContainer} from '@app/styles/common-styles';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {useNavigate} from 'react-router-dom';
import {IconsContainer} from '../assesment-questions/assesment-questions-components';
import {ScrollSection} from '../boarding-screens/component/boarding-screen-components';
import {HeroBannerSection} from '../home/home-components';

import {
  BackContainer,
  MessageMainContainer,
  MsgContainer,
  MsgDate,
  MsgHeadContainer,
  MsgHeading,
  MsgLabel,
  MsgPara,
  MsgParaDiv,
  MsgTitle,
} from './appointment-message-component';

const countLines = (element) => {
  const elementHeight = element.offsetHeight;
  const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
  const lines = elementHeight / lineHeight;
  return lines;
};

const useCountLines = (ref) => {
  const [titleLines, setTitleLines] = useState({});
  useEffect(() => {
    if (ref.current) {
      const lines = countLines(ref.current);
      setTitleLines(lines);
    }
  }, [ref.current]);

  return [titleLines];
};


/**
 * @return {AppointmentMessage}
 */
export default function AppointmentMessage() {
  const navigate = useNavigate();
  const listInnerRef = useRef();
  const [previousNotes, setPreviousNote] = useState([]);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [lastList, setLastList] = useState(false);
  const [viewMore, setViewMore] = useState([]);
  const [loader, setLoader] = useState(true);
  const textRef = useRef();
  const [textLines] = useCountLines(textRef);
  console.log(textLines);

  useEffect(() => {
    const getPreviousNotes = async () => {
      const apiObject: PayloadProps = {
        payload: {},
        method: 'GET',
        apiUrl: apiEndpoint.myPreviousNotes + `?page=${page}&perPage=10`,
        headers: {Authorization: getLocalStorage('token')},
      };
      await triggerApi(apiObject).then((response: ApiResponseProps) => {
        if (response.status_code == 200) {
          if (!response.data.result.length) {
            setLastList(true);
            setLoader(false);
            return;
          }
          setPrevPage(page);
          setPreviousNote([...previousNotes, ...response['data']['result']]);
          setLoader(false);
        }
      });
    };
    if (!lastList && prevPage !== page) {
      getPreviousNotes();
      setLoader(true);
    }
  }, [page, lastList, prevPage, previousNotes]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const {scrollTop, scrollHeight, clientHeight} = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPage(page + 1);
      }
    }
  };

  const handleViewMore = (ID: any, index: number) => {
    const data = viewMore;
    if (viewMore[index]) {
      data[index] = null;
      setViewMore([...data]);
    } else {
      data[index] = ID;
      setViewMore([...data]);
    }
  };

  return (
    <>
      <MainContainer bgColor={whiteColor}>
        <Header
          className="justify-content-between"
          bgCol={isMobile ? '#E9DCCE' : ''}
          desktopMenu={isMobile ? false : true}
          showMessage={true}
          hideBackArrow={false}
        />
        {
          <ScrollSection
            id="scrollable-div"
            className={
              isMobile ? 'flex-1 flex-unset mb-64' : 'flex-1 flex-unset mb-40'
            }
            onScroll={onScroll}
            ref={listInnerRef}
          >
            <HeroBannerSection
              bgColor={'#E9DCCE'}
              className={isMobile ? 'm-auto p-0 h-300' : 'm-auto pt-24 h-300'}
            >
              <BackContainer>
                <IconsContainer
                  className="d-flex gap-15"
                  onClick={() => {
                    navigate('/home');
                  }}
                >
                  <Icon name={'backArrow'} />
                  <div className="nav-name d-flex">Back to home</div>
                </IconsContainer>
              </BackContainer>
              <MessageMainContainer>
                <MsgContainer>
                  <MsgHeadContainer>
                    <img
                      src={MsgIcon}
                      alt="Message Icon"
                      width={18}
                      height={18}
                    />
                    <MsgTitle className="ml-5">
                      Previous Message from your Health Coach
                    </MsgTitle>
                  </MsgHeadContainer>
                  {previousNotes.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="d-flex justify-content-between">
                          <MsgHeading className="d-flex">
                            <img
                              src={Calendar}
                              alt="calendar"
                              width={15}
                              height={15}
                            />
                            <MsgLabel>{item['session']}</MsgLabel>
                          </MsgHeading>
                          <div>
                            <MsgDate>
                              {moment(item['date']).format('MMM DD, YYYY')}
                            </MsgDate>
                          </div>
                        </div>
                        <MsgParaDiv>
                          <MsgPara ref={textRef}
                            className={`${viewMore[index] ? '' : 'line-clamp'} word-wrap`}
                          >
                            {item['message']?.replaceAll(/\n\s*\n/g, '\n')}
                          </MsgPara>
                          {textLines <= 3 ? null :
                          (viewMore[index] ? (
                            <DescViewMore
                              onClick={() => {
                                handleViewMore(item['_id'], index);
                              }}
                            >
                              View Less
                            </DescViewMore>
                          ) : (
                            <DescViewMore
                              onClick={() => {
                                handleViewMore(item['_id'], index);
                              }}
                            >
                              View More
                            </DescViewMore>
                          ))}
                        </MsgParaDiv>
                      </div>
                    );
                  })}
                  {loader && (
                    <div className="d-flex justify-content-center">
                      <img src={Loader} alt="Loader" width={30} />
                    </div>
                  )}
                </MsgContainer>
                &nbsp;
              </MessageMainContainer>
            </HeroBannerSection>
          </ScrollSection>
        }
      </MainContainer>
    </>
  );
}
