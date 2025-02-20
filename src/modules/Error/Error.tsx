/* eslint-disable max-len */
import React from 'react';
import {isMobile} from 'react-device-detect';
import Header from '@app/components/header';
import {ErrorDiv, ErrorMsg, Image, Label, LabelMsg} from './error-component';
import meditation from '@app/assets/images/Meditation.gif';

/**
 * Renders Component.
 * @return {Error} renders Component.
 */
export default function Error() {
  return (
    <React.Fragment>
      <Header hideBackArrow={false} className="txt-left bg-white" desktopMenu={isMobile ? false : true} />
      <ErrorDiv>
        <ErrorMsg>
          <Image src={meditation} className={isMobile ? 'h-380  ' : ''} />
          <Label className={isMobile ? 'f-24' : ''}>Something’s wrong here</Label>
          <LabelMsg className={isMobile ? 'f-14' : ''}>This is a 404 error, which means you have clicked on a bad link or entered an invalid URL.</LabelMsg>
        </ErrorMsg>
      </ErrorDiv>
    </React.Fragment>
  );
}
