/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {Description}
  from '@app/components/layout-onBoarding/layout-onBoarding-components';
import {getLocalStorage} from '@app/core/localStorageService';
import {DesktopWidth, Heading3, Loader, Link} from '@app/styles/common-styles';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import {BackDrop, ContentContainer, DialogContainer, IconName, IconsContainer, ImageWrapper}
  from '../assesment-questions/assesment-questions-components';
import home1 from '@app/assets/images/done.png';
// import {ScrollSection}
//   from '../boarding-screens/component/boarding-screen-components';
import {BadgeContainer, BadgeRow, BadgeHeading, BadgeLabel, BadgePill}
  from '../home/home-components';
import moment from 'moment';
import Tabs from '@app/components/tabs';
import {RecommandationLabels, RecommandationLabelsA} from '@app/core/labels-messages';
import apiEndpoint from '@app/core/apiend_point';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import Icon from '@app/components/icon';
import {dateFormats} from '@app/utils/dateformat';
import Button from '@app/components/button';
import Spinner from '@app/components/icon/icons/loader';
import {Mixpanel} from '@app/App';
import {action, service} from '@app/mixpanel/Service';
import gtag from 'ga-gtag';
import {gaAction, gaService} from '@app/googleAnalytics/googleAnalytics';

type Props = {

  selectedDate?: any
  updateSelectedDate?: any

}

/**
 * Renders Component.
 * @return {Recommendations} renders Component.
 */
export default function Recommendations({selectedDate,
  updateSelectedDate,
}: Props) {
  const [userDetails, updateUserDetails] = useState({});
  const [loader, updateLoader] = useState(true);
  const [selectedTab, setTab] = useState( RecommandationLabels[0]);
  const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  const [recommendations, updateRecommendations] = useState({});
  const [selDate, setSelDate] = useState(new Date());
  const [selRow, updateSelRow] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [currIndex, updateCurrIndex] = useState(0);
  const [remTasks, updateRemTasks] = useState<any>('');
  const [totalTasks, updateTotalTasks] = useState<any>('');
  const [show, updateShow] = useState(false);
  const [showSectionMsg, setShowSectionMsg] = useState(false);
  const [hide, updateHide] = useState(false);
  // const [count, updateCount] = useState(0);
  const [cartItems, updateCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [viewDialog, updateView]= useState(false);
  const [date, updateDate] = useState(
      moment(new Date()).format('YYYY-MM-DD'),
  );
  const [isDataLoading, dataLoaded] = useState(true);
  moment.locale('ko', {
    week: {
      dow: 1,
      doy: 1,
    },
  });
  const navigate = useNavigate();
  useEffect(()=>{
    updateShow(false);
    updateLoader(true);
    const userData= JSON.parse(getLocalStorage('userData'));
    updateUserDetails(userData);
    getRecods(new Date());
    setSelDate(new Date());
    updateHide(isMobile ? false : true);
    Mixpanel.track(service['recommendations']['title'], service['recommendations']['props']);
    gtag('event', gaService['recommendations']['title'], {
      'event_category': gaService['recommendations']['category'],
    });
  }, []);
  /**
   * @param {string} tab label value
    *On Tab Change.
   *  */
  function onSelectedTabClick(tab:string) {
    setTab(tab);
    Mixpanel.track(`${tab} ${action['Home']['click']['title']}`, action['Home']['click']['props']);
    gtag('event', `${tab} ${gaAction['Home']['click']['title']}`, {
      'event_category': gaAction['Home']['click']['category'],
    });
  }
  const getRecods =async (date)=>{
    dataLoaded(true);
    const convrtDate = dateFormats(date, 'YYYY-MM-DD');
    const filter= `?planDate=${convrtDate}`;
    const apiObject: PayloadProps = {
      payload: {},
      method: 'GET',
      apiUrl: apiEndpoint.recommendations+filter,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            const Data= response.data;
            getCartItems(response.data['healthPlanId']);
            if (Data['nutritions']) {
              Data['All'] = [...Data['nutritions'], ...Data['lifestyle'], ...Data['supplements']];
              const completed = (Data['nutritionsCount'] +
              Data['supplementsCount'] + Data['lifeStyleCount']);
              const pending = (Data['markasCompletedLifestylesCount'] +
              Data['markasCompletedNutritionsCount'] + Data['markasCompletedSupplementsCount']);
              const remainingTasks = completed - pending; ;
              updateRemTasks(remainingTasks);
              updateTotalTasks(((pending / completed)* 100));
              if (completed < 1) {
                updateRecommendations({});
                updateLoader(false);
                updateRemTasks(-1);
                updateTotalTasks(0);
              }
              dataLoaded(false);
            }
            updateRecommendations(Data);
            updateLoader(false);
          } else {
            updateRecommendations({});
            updateLoader(false);
            updateRemTasks(-1);
            updateTotalTasks(0);
            dataLoaded(false);
          }
        });
  };
  const markComplete =async (info, date)=>{
    if ((moment().diff(dateFormats(date, 'YYYY-MM-DD'), 'seconds')) < 0 ) {
      return;
    }
    const params={
      'completedDate': dateFormats(date, 'YYYY-MM-DD'),
      'healthPlanItemId': info._id,
      'healthPlanItemType': selectedTab,
      'healthPlanId': recommendations['healthPlanId'],
    };
    const apiObject: PayloadProps = {
      payload: params,
      method: 'POST',
      apiUrl: apiEndpoint.markAsComplete,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            const currRow ={...selRow};
            currRow['markasCompleted'] = true;
            updateSelRow(currRow);
            const list =[...recommendations[selectedTab]];
            const idx= _.findIndex(list, function(o: any) {
              return o._id === info._id;
            });
            list[idx]['markasCompleted'] = true;
            list[idx]['markasCompletedId'] = response.data['_id'];
            updateSelRow(list[idx]);
            recommendations[selectedTab] = list;
            updateRecommendations(recommendations);
            updateShow(false);
            getRecods(selDate);
            setShowSectionMsg(true);
            setTimeout(() => {
              setShowSectionMsg(false);
            }, 3000);
          }
        });
  };
  const getList = (array)=>{
    const un1 = [];
    const un2 =[];
    const un3 =[];
    {array.map((item) => {
      if (item.markasCompleted) {
        un1.push(item);
      } else if (item.trackStatus === 'New') {
        un2.push(item);
      } else {
        un3.push(item);
      }
    });
    }
    return ([...un2, ...un3, ...un1]);
  };
  function getSelectedDay(date: any) {
    if (selectedDate) {
      updateDate(moment(selectedDate).format('YYYY-MM-DD'));
      getRecods(selectedDate);
      setTimeout(() => {
        updateSelectedDate('');
      }, 200);
    }
    if (!selectedDate && moment().diff(moment(date))) {
      updateDate(moment(date).format('YYYY-MM-DD'));
      setSelDate(date);
      getRecods(date);
    }
  }
  const updateStatuses=async ( info, i) =>{
    updateSelRow(info);
    updateCurrIndex(i);
    setOpenDialog(true);
    if (info['trackStatus'] !== 'New') {
      return;
    }
    const apiObject: PayloadProps = {
      payload: {
        healthPlanId: recommendations['healthPlanId'],
        healthPlanItemId: info['_id'],
      },
      method: 'POST',
      apiUrl: apiEndpoint.markAsViewed,
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            getRecods(date);
          }
        });
  };
  const undoCurr=async () =>{
    const apiObject: PayloadProps = {
      payload: {

      },
      method: 'Delete',
      apiUrl: apiEndpoint.undoComplete+selRow['markasCompletedId'],
      headers: {Authorization: token},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            getRecods(date);
          }
        });
  };
  const getCount= (tab) =>{
    if (tab === 'All') {
      return (recommendations['markasCompletedLifestylesCount'] +
          recommendations['markasCompletedNutritionsCount'] + recommendations['markasCompletedSupplementsCount']);
    } else if (tab === 'nutritions') {
      return recommendations['markasCompletedNutritionsCount'];
    } else if (tab === 'lifestyle') {
      return recommendations['markasCompletedLifestylesCount'];
    } else if (tab === 'supplements') {
      return recommendations['markasCompletedSupplementsCount'];
    }
  };
  const addToCart =async ()=>{
    if (selRow['cartQuantity'] < 1 || !isTriggered) {
      return;
    }
    setIsTriggered(false);
    const apiObject: PayloadProps = {
      payload: {
        'healthPlanId': recommendations['healthPlanId'],
        'productId': selRow['supplement_id'],
        'productType': 'supplements',
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
            getRecods(selDate);
            setTimeout(() => {
              setShowPopup(true);
            }, 10);
            setTimeout(() => {
              setShowPopup(false);
            }, 2000);
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
    <Snackbar
      open={showSectionMsg && !openDialog}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      onClose={() => setShowSectionMsg(false)}
    >
      {/* <Alert severity={'success'}>
        {`Task marked as complete! Undo`}
      </Alert> */}
      <SContent onClick={()=> undoCurr()}>Task marked as complete!<span> Undo</span></SContent>
    </Snackbar>
    {openDialog && <BackDrop>
      <DialogContainer className={isMobile ? 'h-100 p-0' : 'p-0'} style={{width: isMobile? 'unset' : '600px'}}>
        <ContentContainer className={isMobile? 'flex-1 ovy-scroll mb-64' : 'flex-1 ovy-scroll'}>
          <div className='d-flex js-bet'>
            <IconsContainer className="d-flex" onClick={()=>{
              setOpenDialog(false);
              Mixpanel.track(action['Home']['dailyTaskBackbtn']['title'], action['Home']['dailyTaskBackbtn']['props']);
              gtag('event', gaAction['Home']['dailyTaskBackbtn']['title'], {
                'event_category': gaAction['Home']['dailyTaskBackbtn']['category'],
              });
            }}>

              <Icon name='chervonLeft'/>
            </IconsContainer>
            <IconsContainer className={isMobile ? selRow['markasCompleted'] ? 'completed-s w-16-s d-flex': 'gray-s w-16-s d-flex' : 'd-none'}
              onClick={()=>{
                if (!selRow['markasCompleted']) {
                  markComplete(selRow, selDate);
                }
              }}>

              <IconName className={ ((moment().diff(dateFormats(date, 'YYYY-MM-DD'), 'seconds')) < 0 ) ? 'not_allowed' : ''}
              >{selRow['markasCompleted'] ? 'Completed' : 'Mark as complete'}</IconName>
              <div className={ ((moment().diff(dateFormats(date, 'YYYY-MM-DD'), 'seconds')) < 0 ) ? 'not_allowed icon-s' : 'icon-s' }>
                <Icon name='check'/>
              </div>
            </IconsContainer>
          </div>
          <div className={isMobile? 'p-0' : 'px-18'}>
            <BadgeLabel className='d-flex f-14 ptb-15 gap-8 '>
              <IconsContainer className="w-20 br-0" color={selRow['lifestyle_id'] ? '#72C4AA': selRow['nutrition_id'] ? '#F5B873' :'#355F92'}>
                <Icon name={selRow['lifestyle_id'] ? 'lifeStyle' : selRow['nutrition_id'] ? 'nutrition' : 'supplements'} />
              </IconsContainer>
              {selRow['lifestyle_id'] ? 'Life Style' : selRow['nutrition_id'] ? 'Nutrition' : 'Supplements'}
            </BadgeLabel>
            <div className='d-flex gap-8'>
              <Heading3 className="f-24 d-flex txt-left flex-1"> {selRow['type']}&nbsp;{selRow['name']}
                {selRow['quantity'] ? <BadgePill className="gray">{selRow['quantity']+ ' Capsules'}
                </BadgePill> : null}</Heading3>

              <IconsContainer className={!isMobile ? selRow['markasCompleted'] ? 'completed-s w-16-s d-flex': 'gray-s w-16-s d-flex':'d-none'}
                onClick={()=>{
                  if (!selRow['markasCompleted']) {
                    markComplete(selRow, selDate);
                  }
                }}>

                <IconName className={ ((moment().diff(dateFormats(date, 'YYYY-MM-DD'), 'seconds')) < 0 ) ? 'not_allowed' : ''}
                >{selRow['markasCompleted'] ? 'Completed' : 'Mark as complete'}</IconName>
                <div className={ ((moment().diff(dateFormats(date, 'YYYY-MM-DD'), 'seconds')) < 0 ) ? 'not_allowed icon-s' : 'icon-s' }>
                  <Icon name='check'/>
                </div>
              </IconsContainer>
            </div>

            {selRow['brand'] ? <BadgeLabel className='d-flex f-14 p-0 py-24 clr-gray'>
              {selRow['brand']}
            </BadgeLabel> : null}
            {selRow['lifestyle_id'] || selRow['nutrition_id'] ? <BadgeLabel className="dai">Daily</BadgeLabel> : null}
            <Description className="f-14 m-0 mb-10">
              {selRow['description']}
            </Description>
            {selRow['price'] ? <Heading3 className="f-16 d-flex">
            $ {selRow['price']} per bottle
            </Heading3> : null}
            {selRow['price'] ? <div className='d-flex gap-15'>
              <div className='d-flex gap-10 '>
                <IconsContainer className={selRow['cartQuantity'] < 2 ? 'not_allowed' : ''}
                  onClick={()=>{
                    if (selRow['cartQuantity'] > 1) {
                      const selRowCpy = {...selRow};
                      selRowCpy['cartQuantity'] = selRowCpy['cartQuantity'] - 1;
                      setIsTriggered(true);
                      updateSelRow(selRowCpy);
                    }
                  }}>
                  <Icon name="minus"/>
                </IconsContainer>
                <BadgeHeading className='f-16 res-sel'>{selRow['cartQuantity']}</BadgeHeading>
                <IconsContainer className={selRow['cartQuantity'] > parseInt(recommendations['cartProductMaxQuantity']) -1 ?
           'not_allowed' : ''}
                onClick={()=>{
                  if (selRow['cartQuantity'] < parseInt(recommendations['cartProductMaxQuantity'])) {
                    const selRowCpy = {...selRow};
                    selRowCpy['cartQuantity'] = selRowCpy['cartQuantity'] + 1;
                    setIsTriggered(true);
                    updateSelRow(selRowCpy);
                  }
                }}>  <Icon name="plus"/>
                </IconsContainer>

              </div>
              <Button variant={(selRow['cartQuantity'] > 0 && isTriggered) ? 'primary' : 'disabled'}
                className='res-sel' width='auto' onClick={addToCart}
              >{'Add to Cart'}</Button>
              <IconsContainer className='align-cen-fl pos-rel'
                onClick={()=>
                  navigate('/cart')}>
                <Icon name="cart"/>
                <IconCount className='res-sel'>{cartItems}</IconCount>
              </IconsContainer>
              {/* <Heading3 className="f-16 d-flex mlt-15">
         Price : $ {selRow['price']}
        </Heading3> */}
            </div> : null}
          </div>

        </ContentContainer>
        <div className= {isMobile? 'fix-footer-mob br-tp pt-15': 'bg-clr-E9DCCE pad-30'}>
          <div className={isMobile ? 'd-flex js-bet flex-1' : 'd-flex justify-content-end gap-8'}>
            <Button variant={'secondary'}
              width='auto'
              className={(currIndex == 0 || currIndex < 0) ? 'opa-0' : ''}
              onClick={()=>{
                if (currIndex > 0) {
                  setIsTriggered(false);
                  updateSelRow(recommendations[selectedTab][currIndex -1]);
                  updateCurrIndex(currIndex -1);
                }
                Mixpanel.track(action['Home']['DTPrevious']['title'], action['Home']['DTPrevious']['props']);
                gtag('event', gaAction['Home']['DTPrevious']['title'], {
                  'event_category': gaAction['Home']['DTPrevious']['category'],
                });
              }}
            >Previous</Button>
            <Button variant={'primary'}
              width='auto'
              className={(currIndex == recommendations[selectedTab].length -1 || currIndex > recommendations[selectedTab].length -1) ?
             'opa-0 d-none' : ''}
              onClick={()=>{
                if (currIndex < recommendations[selectedTab].length -1) {
                  setIsTriggered(false);
                  updateSelRow(recommendations[selectedTab][currIndex +1]);
                  updateCurrIndex(currIndex +1);
                }
                Mixpanel.track(action['Home']['DTNext']['title'], action['Home']['DTNext']['props']);
                gtag('event', gaAction['Home']['DTNext']['title'], {
                  'event_category': gaAction['Home']['DTNext']['category'],
                });
              }}
            >Next</Button>
          </div>
        </div>
      </DialogContainer>
    </BackDrop>}


    {/* <Header className='txt-left' desktopMenu={isMobile ? false : true}/> */}
    {/* <ScrollSection id="scrollable-div" className='flex-1'> */}
    {viewDialog &&recommendations['healthPlanMessage'] &&
          <ViewDialog header={'message'} width={isMobile? 'unset' : '480px'} description={recommendations['healthPlanMessage']}
            creDate={recommendations['healthPlanMessageCreatedDate'] ? 'Added ' +dateFormats(recommendations['healthPlanMessageCreatedDate'], 'MMMM Do ') : null} onCancel={()=> updateView(false)}/>}
    {!loader ? <DesktopWidth className='w-1150'>
      <ContentContainer className={isMobile ? '' : 'ptb-0'}>
        <Heading3 className={isMobile ? 'txt-left f-24' : 'txt-left f-32'}>Daily Tasks</Heading3>
        <FilterRow>
          <FilterPill
            onClick={()=>{
              getSelectedDay(moment().subtract(1, 'days'));
              Mixpanel.track(action['Home']['yesterday']['title'], action['Home']['yesterday']['props']);
              gtag('event', gaAction['Home']['yesterday']['title'], {
                'event_category': gaAction['Home']['yesterday']['category'],
              });
            }}
            className={moment().diff(selDate, 'days') > 0 ? 'active' : '' }>Yesterday</FilterPill>
          <FilterPill className={moment().diff(selDate, 'days') == 0 ? 'active' : '' } onClick={()=>{
            getSelectedDay(new Date());
            Mixpanel.track(action['Home']['today']['title'], action['Home']['today']['props']);
            gtag('event', gaAction['Home']['today']['title'], {
              'event_category': gaAction['Home']['today']['category'],
            });
          }} >Today</FilterPill>
          <FilterPill className={moment().diff(selDate, 'days') < 0 ? 'active' : '' } onClick={()=>{
            getSelectedDay(moment().add(1, 'days'));
            Mixpanel.track(action['Home']['tomorrow']['title'], action['Home']['tomorrow']['props']);
            gtag('event', gaAction['Home']['tomorrow']['title'], {
              'event_category': gaAction['Home']['tomorrow']['category'],
            });
          }}>Tomorrow</FilterPill>
        </FilterRow>
        <div
          className={isMobile ? 'pos-rel d-flex flx-cont flex-column  gap-10' :'d-flex gap-10 align-items-stretch'}>
          <BadgeContainer className=' bg-gray align-self br-gray' style={{maxWidth: '400px'}}>
            <div className='d-flex align-items-start'>
              <div className='flex-1 '>
                <BadgeRow>
                  <BadgeHeading className = {isMobile ? 'f-18' :'f-20'}>
                    {`Your Progress`}
                  </BadgeHeading>
                </BadgeRow>
                <BadgeRow>
                  {remTasks > 0 ? <BadgeLabel className={isMobile ? 'clr-gray ptb-15 f-16' :'clr-gray ptb-15 f-20'}>
                    {remTasks +' tasks left'}
                  </BadgeLabel> : remTasks === 0 ?
                    <BadgeLabel className={isMobile ? 'ptb-15 f-16' :'ptb-15 f-20'}>
                      {`You’re up to date`}
                    </BadgeLabel> :
                    <BadgeLabel className={isMobile ? 'ptb-15' :'ptb-15'}>
                      {`No tasks added yet!`}
                    </BadgeLabel> }
                </BadgeRow>
              </div>
              <div>
                <CircularProgressWithLabel value={totalTasks} />
              </div>
            </div>
          </BadgeContainer>
          <BadgeContainer className={isMobile? 'pos-rel-0 bg-gray align-self br-gray bg-bone' :'bg-gray  br-gray bg-bone row-rev'} style={{maxWidth: '400px'}}
            onClick={
              ()=>{
                updateView(true);
                Mixpanel.track(action['Home']['lastAppMsg']['title'], action['Home']['lastAppMsg']['props']);
                gtag('event', gaAction['Home']['lastAppMsg']['title'], {
                  'event_category': gaAction['Home']['lastAppMsg']['category'],
                });
              }
            }>
            <div className='d-flex align-items-start row-rev'>
              <IconsContainer className={isMobile ? 'd-none' : '' } >
                <ImageWrapper>
                  {/* <img src={homeImg} alt="User" /> */}
                  <Icon name='arrowRightUp' />
                </ImageWrapper>
              </IconsContainer>
              <BadgeRow onClick={()=>{
                updateHide(isMobile ? !hide : true);
              }} className='flex-1'>
                <BadgeHeading className = {isMobile ? 'f-18' :'f-20'}>
                Message from your last appointment
                </BadgeHeading>
                {isMobile ? <IconsContainer className='plt-10'>
                  {/* <Icon name={hide ? 'chervonTop' : 'chervonBot'}/> */}
                  <Icon name='arrowRightUp' />
                </IconsContainer> : null}
              </BadgeRow>
            </div>

            {userDetails['assignment_details']['ClientAssignments'] && recommendations['healthPlanMessage'] ?
              <BadgeRow className={isMobile ? 'flx-col-15' : null}>

                <BadgePill className={isMobile ? 'mt-20' : 'mt-20'}>
                  {recommendations['healthPlanMessageCreatedDate'] ? 'Added ' +dateFormats(recommendations['healthPlanMessageCreatedDate'], 'MMMM Do ') : null}
                </BadgePill>
              </BadgeRow> : null}
          </BadgeContainer>

        </div>
      </ContentContainer>
      <ContentContainer className={isMobile ? 'p-0' : 'my-22 mb-0'}>
        <Heading3 className= {isMobile ? 'flex-icon f-16 d-none' : 'f-24 text-center mb-10 d-none'}>
          {isMobile ? <Icon name='calendar'/> : null}
          {moment(date).format('MMMM YYYY')}</Heading3>
        <div className='d-none'>
          <DatePicker
            getSelectedDay={getSelectedDay}
            userSelectedDate={selectedDate}
          />
        </div>
        <Tabs
          type='primary'
          Json={RecommandationLabelsA}
          onClick={onSelectedTabClick}
          selectedLabel={selectedTab}
          classN="caps"
        />
      </ContentContainer>
      { isDataLoading ? <ContentContainer className="ptb-0 h-130 pos-rel">
        <Spinner size="3px" />
      </ContentContainer> :
          <ContentContainer className="ptb-0">
            {recommendations && (remTasks > 0 || show) &&
            recommendations[selectedTab] && recommendations[selectedTab].length ?
          <>
            {getList(recommendations[selectedTab]).map((info:any, i:number)=>{
              return (
                <BadgeRow className={(info['markasCompleted'] ? show ? 'item com-gre ' : 'hide' : 'item com-gra') } key={i}
                >
                  <div className='d-flex flex-1 gap-8' onClick={
                    () =>{
                      updateStatuses(info, i);
                    }
                  }>
                    <IconsContainer className={(info['lifestyle_id'] ? 'life' : info['nutrition_id'] ? 'nut' : 'supp')}>
                      <Icon name={info['lifestyle_id'] ? 'lifeStyle' : info['nutrition_id'] ? 'nutrition' : 'supplements'} />
                    </IconsContainer>
                    <BadgeLabel className={isMobile ?'caps f-16' : 'flex-row  js-start w-100 caps f-18'}>
                      {info['type']}&nbsp;{info['name']}
                      {info['trackStatus'] === 'New' && !isMobile ? <BadgePill className='mlt-15 bg-bei width-unset'>New</BadgePill> : ''}
                    </BadgeLabel>
                  </div>
                  <IconsContainer className={info['markasCompleted'] ? 'completed-s w-16-s d-flex': 'gray-s w-16-s d-flex'}
                    onClick={()=>{
                      if (!info['markasCompleted']) {
                        markComplete(info, selDate);
                      }
                      Mixpanel.track(action['Home']['markAsComplete']['title'], action['Home']['markAsComplete']['props']);
                      gtag('event', gaAction['Home']['markAsComplete']['title'], {
                        'event_category': gaAction['Home']['markAsComplete']['category'],
                      });
                    }}>
                    {!isMobile ?<div>
                      <IconName
                        className={ ((moment().diff(dateFormats(date, 'YYYY-MM-DD'), 'seconds')) < 0 ) ? 'not_allowed' : '' + 'f-17'}>{info['markasCompleted'] ? 'Completed' : 'Mark as complete'}</IconName>
                    </div> : null}
                    <div className={ ((moment().diff(dateFormats(date, 'YYYY-MM-DD'), 'seconds')) < 0 ) ? 'not_allowed icon-s' : 'icon-s' }>
                      <Icon name='check'/>
                    </div>
                  </IconsContainer>
                </BadgeRow>
              );
            })
            }
            {getCount(selectedTab) > 0 ? <BadgeRow className="js-cen" onClick={()=> {
              updateShow(!show);
              Mixpanel.track(action['Home']['showHide']['title'], action['Home']['showHide']['props']);
              gtag('event', gaAction['Home']['showHide']['title'], {
                'event_category': gaAction['Home']['showHide']['category'],
              });
            }}>
              <BadgeLabel className={isMobile ?'f-16' : ' f-16'}>
                <Link>{!show ? 'Show Completed Tasks' : 'Hide Completed Tasks'}
                  {`(`+getCount(selectedTab)+`)`}</Link>
              </BadgeLabel></BadgeRow> : null}
          </>: remTasks === 0 ? <>
            <BadgeRow className="flx-col">
              <IconsContainer className='pos-unset' >
                <img src={home1 } alt="User" />
              </IconsContainer>
              <Description className='text-center'>
                {`Congrats you’ve completed all of your tasks for the day!`}
              </Description>
            </BadgeRow>
            <BadgeRow className="js-cen" onClick={()=> updateShow(!show)}>{!show ? 'Show Completed Tasks' : 'Hide Completed Tasks'}
              {`(`+getCount(selectedTab)+`)`}</BadgeRow></> :
          <BadgeRow className="h-250 flx-col gp-0"> <BadgeLabel className="h-250">
                Stay tuned, your tasks will be added after your first appointment!</BadgeLabel>
          <Description className='ans f-20'>Check back later.</Description>
          </BadgeRow>}
            {/* <div className='text-center f-16'> <Link>Show completed tasks ({3})</Link></div> */}
          </ContentContainer> }
    </DesktopWidth> : null}

  </>
  );
}

import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DatePicker from '@app/components/date-picker/date-picker';
import _ from 'lodash';
import {Snackbar} from '@mui/material';
import {FilterPill, FilterRow, IconCount, SContent} from './recommendations-components';
import {useNavigate} from 'react-router-dom';
import CommonSnackbar from '@app/core/snackbar';
import ViewDialog from '@app/components/alert-dialog/view-dialog';

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{position: 'relative', display: 'inline-flex'}}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: '80px',
          border: '7px solid white',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
