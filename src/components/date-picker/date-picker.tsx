/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import './datepicker.css';
import {
  addDays,
  addMonths,
  differenceInMonths,
  format,
  isSameDay,
  isToday,
  lastDayOfMonth,
  startOfMonth,
} from 'date-fns';
import moment from 'moment';
import Icon from '../icon';
type Props = {
  endDate2?: any
  selectDate?: any
  getSelectedDay?: any
  color?: string
  type?: any
  labelFormat?: any
  userSelectedDate?: any
}

/**
 *
 * @param  {Props} from the api
 * @return {DatePicker} global component
  */
export default function DatePicker({
  endDate2 = '',
  selectDate,
  getSelectedDay,
  color,
  labelFormat,
  userSelectedDate,
}: Props) {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  const [selectedDate, setSelectedDate] = useState(
    userSelectedDate ? userSelectedDate : new Date(),
  );
  const [forwardCount, setForwardCount] = useState(0);
  const [backwardCount, setBackwardCount] = useState(0);
  const [startDate, setStartDate] = useState<any>(d);
  const [lastDate, setLastDate] = useState<any>(addDays(d, 51));
  const getStyles = (day: any) => {
    if (isSameDay(day, selectedDate)) {
      return true;
      // return (selectedStyle);
    }
    return false;
  };
  const getId = (day: any) => {
    if (isSameDay(day, selectedDate)) {
      return 'selected';
    } else {
      return '';
    }
  };
  function renderDays() {
    const dayFormat = 'EEEEE'; // "E";
    const dateFormat = 'd';
    const monthFormat = 'MMM';
    const yearFormat = 'yyyy';
    const months = [];
    let days = [];
    for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
      let start; let end;
      const month: any = startOfMonth(addMonths(startDate, i));
      start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
      end = i === differenceInMonths(lastDate, startDate) ?
          Number(format(lastDate, 'd')) :
          Number(format(lastDayOfMonth(month), 'd'));
      for (let j = start; j < end; j++) {
        days.push(
            <div
              key={j}
              id={`${getId(addDays(startDate, j))} ${format(
                  addDays(month, j),
                  yearFormat,
              )}-${format(addDays(month, j), monthFormat)}-${format(
                  addDays(month, j),
                  dateFormat,
              )}`}
              className={`dateDayItem ${
              getStyles(addDays(month, j)) ? 'active' : ''
              }  ${
                isMobile ? ' mobile' : ''
              }`}
              onClick={() => onDateClick(addDays(month, j))}>
              <div className={'dayLabel'}>
                {format(addDays(month, j), dayFormat) }
              </div>
              <div className={'dateLabel'}>
                {isToday(addDays(month, j)) && !isMobile ? 'Today' :format(addDays(month, j), dateFormat)}
              </div>
            </div>,
        );
      }
      months.push(
          <div className={'monthContainer'} key={month}>
            <div className={'daysContainer'}>{days}</div>
          </div>,
      );
      days = [];
    }
    return (
      <div id={'container'} className={'dateListScrollable' }>
        {' '}
        {months}
      </div>
    );
  }


  const goBack = () => {
    const date = new Date(moment(startDate).subtract(7, 'days').toString());
    setStartDate(date);
    const element = document.getElementById(moment(date).format('yyyy-MMM-d'));
    if (forwardCount === 0) {
      setBackwardCount(backwardCount + 1);
    } else {
      if (element) {
        element.scrollIntoView();
      }
      setForwardCount(forwardCount - 1);
    }
  };
  const goForward = () => {
    const date = new Date(moment(lastDate).add(7, 'days').toString());
    const date1 = new Date(moment(startDate).add(7, 'days').toString());
    setLastDate(date);
    setStartDate(date1);
    setTimeout(() => {
      const element = document.getElementById(moment(date).format('yyyy-MMM-d'));
      if (element) {
        element.scrollIntoView();
      }
    }, 500);

    if (backwardCount === 0) {
      setForwardCount(forwardCount + 1);
    } else {
      setBackwardCount(backwardCount - 1);
    }
  };


  const onDateClick = (day: any) => {
    setSelectedDate(day);
    if (getSelectedDay) {
      getSelectedDay(day);
    }
  };

  useEffect(() => {
    if (getSelectedDay) {
      if (selectDate) {
        getSelectedDay(selectDate);
      } else {
        getSelectedDay(new Date());
      }
    }
  }, []);


  useEffect(() => {
    if (selectDate) {
      if (!isSameDay(selectedDate, selectDate)) {
        setSelectedDate(selectDate);
        setTimeout(() => {
          const view = document.getElementById('selected');
          if (view) {
            view.scrollIntoView({
              behavior: 'smooth',
              inline: 'center',
              block: 'nearest',
            });
          }
        }, 20);
      }
    }
  }, [selectDate]);

  return (<>
    <div className={isMobile ? 'mobile container' : 'container' }>
      {!isMobile ? <span onClick={goBack}>
        <Icon name='chervonLeft'/>
      </span> : null}
      {/* <FontAwesomeIcon
        icon={faChevronCircleLeft}
        size="2x"
        onClick={goBack}
        color={loaderColor}
      /> */}
      {renderDays()}
      {!isMobile ? <span onClick={goForward} className="r-180">
        <Icon name='chervonLeft'/>
      </span> : null}
      {/* <FontAwesomeIcon
        icon={faChevronCircleRight}
        size="2x"
        onClick={goForward}
        color={loaderColor}
      /> */}
    </div>
  </>
  );
}


