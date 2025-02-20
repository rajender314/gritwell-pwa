import {IconsContainer} from
  '@app/modules/assesment-questions/assesment-questions-components';
import React from 'react';
import {isMobile} from 'react-device-detect';
import Icon from '../icon';

import {Tab, TabContainer} from './tab-components';
/**
* it's a Props we receive from module
*/

type Props = {
 selectedLabel?: string;
 onClick: (e: any) => void;
 labels?: any;
 type?:'primary' | 'secondary' | 'custom-yellow';
 Json?: any;
 classN?:any;
};
/**
 *
 * @param  {Props} from the api
 * @return {Tabs} global component
  */
export default function Tabs({selectedLabel, onClick, labels, type,
  classN, Json}:
   Props) {
  return (
    <TabContainer className={classN ? classN : isMobile ? 'mobile' : ''}>
      {labels && labels.length ?
labels.map((label: any, index:number) => (
  <Tab type={type} key={label+index}
    style={{width: `calc(100% / ${labels.length})`}}
    isSelected={selectedLabel === label} onClick={() => onClick(label)}
    className={classN}>
    {label}
  </Tab>
)) :
''}
      {Json && Json.length ?
Json.map((item: any, index:number) => (
  <>
    <Tab type={type} key={index}
      style={isMobile ? {width: 'auto'} :
       {width: `calc(100% / ${Json.length})`}}
      isSelected={selectedLabel === item.label}
      onClick={() => onClick(item.label)}
      className="d-flex justify-content-center p-20 caps"
      id={selectedLabel === item.label ? 'curr' : ''}>
      {item.icon && !isMobile ? <IconsContainer className='w-20 mrt-6'>
        <Icon name={item.icon}/>
      </IconsContainer> : null}
      {item.vLabel ? item.vLabel : item.label}{}
    </Tab>
  </>
)) :
''}
    </TabContainer>
  );
}
