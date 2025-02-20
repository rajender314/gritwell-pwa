/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import Button from '@app/components/button';
import BotoomHeader from '@app/components/footer-menu';
import Header from '@app/components/header';
import Icon from '@app/components/icon';
import Spinner from '@app/components/icon/icons/loader';
import {Description, PdfLinkContainer, PdfLinks} from '@app/components/layout-onBoarding/layout-onBoarding-components';
import Tabs from '@app/components/tabs';
import Viewpdf from '@app/components/viewpdf/viewpdf';
import apiEndpoint from '@app/core/apiend_point';
import {TestLabels} from '@app/core/labels-messages';
import {getLocalStorage} from '@app/core/localStorageService';
import CommonSnackbar from '@app/core/snackbar';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {DesktopWidth, Heading3, Link, Loader, MainContainer} from '@app/styles/common-styles';
import {dateFormats} from '@app/utils/dateformat';
import React, {useEffect, useRef, useState} from 'react';
import {isMobile, isSafari} from 'react-device-detect';
import gtag from 'ga-gtag';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  BackDrop, ContentContainer, DialogContainer,
  IconsContainer} from '../assesment-questions/assesment-questions-components';
import {ScrollSection} from '../boarding-screens/component/boarding-screen-components';
import {BadgeHeading, BadgeLabel, BadgePill, BadgeRow} from '../home/home-components';
import {IconCount} from '../recommendations/recommendations-components';
import {TestCautionBlock} from './tests-components';
import ReactPdf from '@app/components/react-pdf';
import Download from '@app/assets/images/download.png';

/**
 * Renders Component.
 * @return {SignIn} renders Component.
 */
export default function Tests() {
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [recommendations, updateRecommendations] = useState([]);
  const [loader, updateLoader] = useState(true);
  const [selRow, updateSelRow] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currIndex, updateCurrIndex] = useState(0);
  const [cartItems, updateCartItems] = useState([]);
  const [maxQty, updateMaxQty] = useState('');
  const [healthId, updateHealthPlanId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isCheck, setIsCheck] = useState('def');
  const [viewPdfDoc, setViewPdfDoc] = useState(false);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [showPdfLinkContainer, setShowPdfLinkContainer] = useState(false);
  const ref = useRef(null);
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  useEffect(()=>{
    const handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setShowPdfLinkContainer(false);
      }
    };
    const handlerr = (e: any) => {
      if (!dialogRef.current?.contains(e.target)) {
        setOpenDialog(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('mousedown', handlerr);
    return () =>{
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('mousedown', handlerr);
    };
  }, []);

  const [selectedTab, setTab] = useState( TestLabels[0]);
  function onSelectedTabClick(tab:string) {
    updateLoader(true);
    if (tab === 'Recommended') {
      updateRecommendations(recommendedItems);
    } else {
      updateRecommendations(orderedItems);
    }
    setTab(tab);
    updateLoader(false);
    Mixpanel.track(`${tab} ${action['tests']['click']['title']}`,
        action['tests']['click']['props']);
    gtag('event', `${tab} ${gaAction['tests']['click']['title']}`, {
      'event_category': gaAction['tests']['click']['category'],
    });
  }

  const restrictUser = sessionStorage.getItem('resctrict_user_actions');
  const location = useLocation();

  useEffect(()=>{
    setIsCheck('def');
    if (location.state?.data==='yourOrders') {
      setTab(TestLabels[1]);
    }
    getRecods(new Date());
    Mixpanel.track(service['tests']['title'],
        service['tests']['props']);
    gtag('event', gaService['tests']['title'], {
      'event_category': gaService['tests']['category'],
    });
  }, []);
  const getRecods =async (date)=>{
    const convrtDate = dateFormats(date, 'YYYY-MM-DD');
    const filter= `?planDate=${convrtDate}`;
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.myTests+filter,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            const Data= response.data['tests'];
            if (Data['nutritions']) {
              Data['All'] = [...Data['nutritions'],
                ...Data['lifestyle'], ...Data['testResults']];
            }

            if (Data.length) {
              const list1 = Data.filter((item) => item['recommendationsStatusInfo']['code'] === 'new' || item['recommendationsStatusInfo']['code'] === 'not_ordered');
              setRecommendedItems(list1);
              const list2 = Data.filter((item) => item['recommendationsStatusInfo']['code'] !== 'new' && item['recommendationsStatusInfo']['code'] !== 'not_ordered');
              setOrderedItems(list2);
              if (location.state?.data==='yourOrders') {
                updateRecommendations(list2);
              } else {
                updateRecommendations(list1);
              }
            }

            getCartItems(response.data['healthPlanId']);
            updateHealthPlanId(response.data['healthPlanId']);
            updateMaxQty(response.data['cartProductMaxQuantity']);
            updateLoader(false);
          } else {
            updateRecommendations([]);
            updateLoader(false);
          }
        });
  };
  const addToCart =async ()=>{
    Mixpanel.track(action['tests']['addToCart']['title'],
        action['tests']['addToCart']['props']);
    gtag('event', gaAction['tests']['addToCart']['title'], {
      'event_category': gaAction['tests']['addToCart']['category'],
    });
    if (selRow['cartQuantity'] < 1) {
      return;
    }
    setIsTriggered(false);
    const apiObject: PayloadProps = {
      payload: {
        'healthPlanId': healthId,
        'productId': selRow['test_id'],
        'productType': 'tests',
        'quantity': selRow['cartQuantity'],
      },
      method: 'POST',
      apiUrl: apiEndpoint.cart,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            getCartItems(response.data.cartProduct.health_plan_id);
            setTimeout(() => {
              setShowPopup(true);
            }, 10);
            setTimeout(() => {
              setShowPopup(false);
            }, 2000);
          }
        });
  };
  const updateResult= async (val)=>{
    setIsCheck(val);
    if (val === 'no') {
      return;
    }
    const apiObject: PayloadProps = {
      payload: {
        'status': true,
        'testId': selRow['test_id'],
        'healthPlanId': selRow['health_plan_id'] ? selRow['health_plan_id'] : healthId,
      },
      method: 'PUT',
      apiUrl: apiEndpoint.updateTestResult,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            const selRowCpy = {...selRow};
            selRowCpy['recommendationsStatusInfo'] =
             response['data']['recommendationsStatusInfo'] ?
              response['data']['recommendationsStatusInfo'] :
             selRowCpy['recommendationsStatusInfo'];
            setIsTriggered(true);
            updateSelRow(selRowCpy);
            const recCpy = [...recommendations];
            recCpy[currIndex] = selRowCpy;
            updateRecommendations(recCpy);
            getRecods(new Date());
          }
        });
  };
  const getCartItems =async (id)=>{
    const filter= `?healthPlanId=${id}`;

    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.cart+filter,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            updateCartItems(response.data.count);
            // setLoader(false);
          }
        });
  };

  function openPdfViewDocumnet() {
    setOpenDialog(false);
    setTimeout(()=>{
      setViewPdfDoc(true);
    }, 100);
  }
  const backToTest = () => {
    setOpenDialog(true);
    setViewPdfDoc(false);
  };

  return (<>
    {loader ? <Loader>
      <Spinner size="6px" />
    </Loader> : null}
    <CommonSnackbar
      title="Error"
      appearance={'success'}
      message={'Item Added to Cart'}
      open={showPopup}
      close={() => setShowPopup(false)} />
    {openDialog && <BackDrop>
      <DialogContainer
        ref={dialogRef}
        className={isMobile && isSafari ?'h-90 p-0 ' :
         isMobile ? 'h-100 p-0 ' : 'p-0'}
        style={{width: isMobile? 'unset' : '600px'}}>
        <ContentContainer className={isMobile? 'ovy-scroll hei-9 0 mb-64' :
       '  flex-1  ovy-scroll'}>
          <div className='d-flex js-bet'>
            <IconsContainer className="d-flex" onClick={()=>{
              setOpenDialog(false);
              Mixpanel.track(action['tests']['back']['title'],
                  action['tests']['back']['props']);
              gtag('event', gaAction['tests']['back']['title'], {
                'event_category': gaAction['tests']['back']['category'],
              });
            }}>
              <Icon name='chervonLeft'/>
            </IconsContainer>
          </div>
          <div className={isMobile? 'p-0 mt-30' : 'px-18'}>
            <BadgeLabel className='d-flex f-15 ptb-15 gap-8'>
              <IconsContainer className="w-14">
                <Icon name={'testTube'} />
              </IconsContainer>{'Testing'}
            </BadgeLabel>
            <Heading3 className="f-24 d-flex txt-left">
              {selRow['type']}{selRow['name']}


            </Heading3>
            {selRow['brand'] ? <BadgeLabel className='f-15 ptb-15'>
              {selRow['brand']}
            </BadgeLabel> : null}
            <Description className="f-17 m-0 mb-10">
              {selRow['description']}
            </Description>
            {selRow['price'] ? <div className='d-flex'>
              <Heading3 className="f-18 w-500 d-flex">
          $ {selRow['price']} per kit
              </Heading3>
            </div> : null}
            {selRow['price'] &&
         ( selRow['recommendationsStatusInfo']['code'] === 'new' ||
           selRow['recommendationsStatusInfo']['code'] === 'not_ordered') ?
           <div className='d-flex gap-15'>
             <div className='d-flex gap-10'>
               <IconsContainer
                 className={selRow['cartQuantity'] < 2 ? 'not_allowed' : ''}
                 onClick={()=>{
                   if (selRow['cartQuantity'] > 1) {
                     const selRowCpy = {...selRow};
                     selRowCpy['cartQuantity'] = selRowCpy['cartQuantity'] - 1;
                     setIsTriggered(true);
                     updateSelRow(selRowCpy);
                   }
                   Mixpanel.track(action['tests']['minus']['title'],
                       action['tests']['minus']['props']);
                   gtag('event', gaAction['tests']['minus']['title'], {
                     'event_category': gaAction['tests']['minus']['category'],
                   });
                 }}>
                 <Icon name="minus"/>
               </IconsContainer>
               <BadgeHeading className='f-16'>
                 {selRow['cartQuantity']}</BadgeHeading>
               <IconsContainer className={selRow['cartQuantity'] >
            parseInt(maxQty) -1 ?
           'not_allowed' : ''}
               onClick={()=>{
                 if (selRow['cartQuantity'] <
               parseInt(maxQty)) {
                   const selRowCpy = {...selRow};
                   selRowCpy['cartQuantity'] = selRowCpy['cartQuantity'] + 1;
                   setIsTriggered(true);
                   updateSelRow(selRowCpy);
                 }
                 Mixpanel.track(action['tests']['plus']['title'],
                     action['tests']['plus']['props']);
                 gtag('event', gaAction['tests']['plus']['title'], {
                   'event_category': gaAction['tests']['plus']['category'],
                 });
               }}>  <Icon name="plus"/>
               </IconsContainer>

             </div>
             <Button variant={restrictUser === 'false' ? 'disabled' : selRow['cartQuantity'] > 0 && isTriggered ? 'primary' : 'disabled'} className=''
               width='auto' onClick={addToCart}
             >{'Add to Cart'}
             </Button>
             <IconsContainer className='align-cen-fl pos-rel'
               onClick={()=> {
                 navigate('/cart');
                 Mixpanel.track(action['tests']['cart']['title'],
                     action['tests']['cart']['props']);
                 gtag('event', gaAction['tests']['cart']['title'], {
                   'event_category': gaAction['tests']['cart']['category'],
                 });
               }}>
               <Icon name="cart"/>
               <IconCount>{cartItems}</IconCount>
             </IconsContainer>
             {/* <Heading3 className="f-16 d-flex mlt-15">
         Price : $ {selRow['price']}
        </Heading3> */}
           </div> : null}

            { selRow['recommendationsStatusInfo']['code'] === 'ordered' ?
          <TestCautionBlock className='pb-24'>
            {isCheck === 'def' ? <><div className='d-flex'>
              <Heading3 className='mx-10'>
                Did you send this test to the lab?</Heading3>
            </div>
            <div className='d-flex gap-8'>
              <Button width='auto' variant='primary'
                onClick={()=> updateResult('yes')}>Yes
              </Button>
              <Button width='auto' variant='secondary'
                onClick={()=> updateResult('no')}>No
              </Button>
            </div></> : null}
            {isCheck === 'yes' ? <><div>
              <Heading3 className='mx-10 txt-left mb-0'>
              Great!</Heading3>
              <Description className='f-17 m-10'>
              We’ll let you know when the results are in!.</Description>
            </div>
            </> : null}
            {isCheck === 'no' ? <><div>
              <Heading3 className='mx-10 txt-left mb-0'>
              Thanks!</Heading3>
              <Description className='f-17 m-10'>
              Let us know if  you had trouble receiving
               or sending the test to the lab!</Description>
            </div>
            <div className='d-flex gap-8'>
              <Button width='auto' variant='primary'
                onClick={()=>{
                  navigate('/open-chat');
                }}>Chat with a care manager
              </Button>
            </div>
            </> : null}
          </TestCautionBlock> : null}
            { selRow['recommendationsStatusInfo']['code'] === 'processing' ?
          <TestCautionBlock className='pb-24'>
            <div>
              <Heading3 className='mx-10 txt-left mb-0'>
              Great!</Heading3>
              <Description className='f-17 m-10'>
              We will let you know when the results are in!</Description>
            </div>
            {/* <div className='d-flex gap-8'>
              <Button width='auto' variant='primary'
                onClick={()=>{
                  navigate('/open-chat');
                }}>Chat with a care manager
              </Button>
            </div> */}
          </TestCautionBlock> : null}
            { selRow['recommendationsStatusInfo']['code'] === 'results_in' ?
          <TestCautionBlock className='pb-24'>
            <div>
              <Heading3 className='mx-10 mb-0 txt-left'>
            Test Results</Heading3>
              <Description className='f-17 m-10'>
              Your tests results are in!
              </Description>
            </div>
            <div className='d-flex pos-rel'>
              <Button variant='primary'
                onClick={()=>{
                  if (selRow['testResults'].length) {
                    // openPdfViewDocumnet();
                    setShowPdfLinkContainer(!showPdfLinkContainer);
                    Mixpanel.track(action['tests']['testResult']['title'],
                        action['tests']['testResult']['props']);
                    gtag('event', gaAction['tests']['testResult']['title'], {
                      'event_category': gaAction['tests']['testResult']['category'],
                    });
                  }
                }}>Download Test Results
              </Button>
              {showPdfLinkContainer && <PdfLinkContainer ref={ref}>
                {selRow['testResults'].length > 0 && selRow['testResults'].map((item, index)=>{
                  return (
                    <PdfLinks key={index} onClick={()=>{
                      window.open(`${process.env.REACT_APP_API_URL}client/download/testresults/${item['testResultId']}?token=${token.replace('Bearer ', '')}`);
                    }}>
                      <p title={item['documentName']+item['extension']}>
                        {item['documentName']+item['extension']}
                      </p>
                      <img src={Download} alt='Download pdf button'
                        className='pointer' />
                    </PdfLinks>
                  );
                })}
              </PdfLinkContainer>}
            </div>
          </TestCautionBlock> : null}
          </div>
        </ContentContainer>
        <div className=
          {isMobile? 'fix-footer-mob .br-tp': 'bg-clr-E9DCCE pad-30'}>
          <div className={isMobile ? 'd-flex js-bet flex-1' :
         'd-flex justify-content-end gap-8'}>
            <Button variant={'secondary'}
              width='auto'
              className={(currIndex == 0 || currIndex < 0) ? 'opa-0' : ''}
              onClick={()=>{
                if (currIndex > 0) {
                  setIsCheck('def');
                  updateSelRow(recommendations[currIndex -1]);
                  setIsTriggered(false);
                  updateCurrIndex(currIndex -1);
                }
                Mixpanel.track(action['tests']['previous']['title'],
                    action['tests']['previous']['props']);
                gtag('event', gaAction['tests']['previous']['title'], {
                  'event_category': gaAction['tests']['previous']['category'],
                });
              }}
            >Previous</Button>
            <Button variant={'primary'}
              width='auto'
              className={(currIndex == recommendations.length -1 ||
               currIndex > recommendations.length -1) ?
              'opa-0 d-none' : ''}
              onClick={()=>{
                if (currIndex < recommendations.length -1) {
                  setIsCheck('def');
                  updateSelRow(recommendations[currIndex +1]);
                  setIsTriggered(false);
                  updateCurrIndex(currIndex +1);
                }
                Mixpanel.track(action['tests']['next']['title'],
                    action['tests']['next']['props']);
                gtag('event', gaAction['tests']['next']['title'], {
                  'event_category': gaAction['tests']['next']['category'],
                });
              }}
            >Next</Button>
          </div>
        </div>
      </DialogContainer>
    </BackDrop>}
    <MainContainer bgColor={'#FAFAFC'} className="fxh-100" >
      <Header hideBackArrow={false} className='txt-left' desktopMenu={isMobile ? false : true}/>
      {/* {viewPdfDoc && <Viewpdf pdfDoc={selRow['testResults']} name={selRow['name']} onClick={backToTest} />} */}
      {viewPdfDoc && <ReactPdf pdfDoc={selRow['testResults']}
        name={selRow['name']} onClick={backToTest}/>}
      {!viewPdfDoc && <ScrollSection id="scrollable-div"
        className={isMobile ? 'd-flex-ovr-hid w-100 mb-64' : 'flex-1'}>
        <div className='flex-1-hid'>
          <div className='h-124-scr'>
            <DesktopWidth className='w-1150 '>
              <ContentContainer bgColor="#FAFAFC"
                className="br-20 pos-rel p-20 h-100">
                {/* <IconsContainer className='icon-rt' >
              <ImageWrapper>
                <img src={homeImg} alt="User" />
              </ImageWrapper>
            </IconsContainer>
            <IconsContainer className='icon-rt' >
              <ImageWrapper>
                <img src={homeImg1} alt="User" />
              </ImageWrapper>
            </IconsContainer> */}
                <div className='d-flex js-bet'>
                  {/* <Heading3 className="txt-left f-24 mb-15">
                Recommended Tests</Heading3> */}
                  <Tabs
                    type='secondary'
                    labels={TestLabels}
                    onClick={onSelectedTabClick}
                    selectedLabel={selectedTab}
                  />
                  {loader}
                  {/* <Description>Sort by: Recent</Description> */}
                </div>
                {recommendations.length ?<>
                  {recommendations.map((info:any, i:number)=>{
                    return (
                      <BadgeRow className="box gap-4" key={i} onClick={()=>{
                        updateSelRow(info);
                        updateCurrIndex(i);
                        setIsCheck('def');
                        setOpenDialog(true);
                        Mixpanel.track(`${info['name']} ${action['tests']['click']['title']
                        }`, action['tests']['click']['props']);
                        gtag('event', gaAction['tests']['click']['title'], {
                          'event_category': gaAction['tests']['click']['category'],
                        });
                      }}>
                        <div className='d-flex flex-1'>
                          {isMobile ? '' : <IconsContainer
                            color=
                              {info['recommendationsStatusInfo']['icon_color']}
                            className={'nut up-border'}>
                            <Icon name={'testResults'} />
                          </IconsContainer>}
                          <BadgeLabel
                            className={'flex-row w-100 caps f-18'}>
                            {info['name']}
                          </BadgeLabel>
                        </div>
                        <BadgePill className='width-unset' color=
                          {info['recommendationsStatusInfo']['color']}
                        bgColor=
                          {info['recommendationsStatusInfo']['back_ground_color']}>
                          {info['recommendationsStatusInfo']['label']}</BadgePill>

                      </BadgeRow>
                    );
                  })
                  }

                </> :
             <BadgeRow className="h-250 flx-col gp-0">
               <BadgeLabel className="h-250">
                Stay tuned, your tasks will be added after
                your first appointment!</BadgeLabel>
               <Description className='ans f-20'>Check back later.</Description>
             </BadgeRow>}
              </ContentContainer>
            </DesktopWidth>
          </div>
        </div>
      </ScrollSection>}
      {isMobile ? <BotoomHeader/> : null}
    </MainContainer>
  </>
  );
}
