/* eslint-disable require-jsdoc */

import React from 'react';
import {Headering} from './quitz-component';
import {BodyText2, IconsContainer} from
  '@app/modules/assesment-questions/assesment-questions-components';
import Icon from '@app/components/icon';
// import {useNavigate} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import {getLocalStorage} from '@app/core/localStorageService';


export default function FormHeader(props:any) {
//   const Calling =()=>{
//     // eslint-disable-next-line new-cap
//     myfunction(true);
//     };
  const {progressIndex, myfunction} = props;
  function checkNavUrl() {
    const configLists = getLocalStorage('configList') ?
   JSON.parse(getLocalStorage('configList')) :
   {
     websiteUrl: 'https://www.grit-well.com/',
   };
    const webSitePage = configLists['websiteUrl'] ?
   configLists['websiteUrl'] :
   'https://www.grit-well.com/';
    window.location.replace(webSitePage);
  }

  return (
    <Headering>

      {isMobile ? '': (progressIndex !== 0 && <div>
        <IconsContainer className='d-flex mrt-6 gap-10' onClick={()=>{
          myfunction();
        }}
        >
          <Icon name="chervonLeft" />
          <BodyText2 className={'p-0'}>

            Previous question
          </BodyText2>
        </IconsContainer>
      </div>)}
      <div><IconsContainer
        color='black'

      >
        <Icon name='headerLogo' />
      </IconsContainer></div>

      <div><IconsContainer className='d-flex mrt-6'
        onClick={checkNavUrl}
      >

        <BodyText2>
    Back to Website
        </BodyText2>
        <Icon name={'close'} />
      </IconsContainer></div>

    </Headering>

  );
}
