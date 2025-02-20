import React from 'react';
import {FlexContainer, Heading} from '@app/styles/common-styles';
import Icon from '../icon';
import {IconsContainer, ImageSection, IconName,
  ImageWrapper, Description, ImgTitle} from './layout-onBoarding-components';
import mdImg from '@app/assets/images/MD.png';
import hcImg from '@app/assets/images/HC.png';
import cmImg from '@app/assets/images/CM.png';
import youImg from '@app/assets/images/you.png';
import {Heading4} from
  '@app/modules/recommend-plans/component/recommend-plans-components';
import {isMobile} from 'react-device-detect';

 type Props = {
   layoutData : {};
   children: any,
}
/**
 * Renders Component.
 * @return {LayoutBoarding} component.
 */
export default function LayoutOnBoarding({layoutData, children}:Props) {
  return (
    <FlexContainer flexDirection="column" alignItems='center' >
      <ImageSection className={layoutData['layoutType']} >
        {layoutData['layoutType'] === 'layout1' ? <>

          {layoutData['iconSec'].map((info:any, i:number)=>{
            return (
              <IconsContainer className="layout1" key={i}>
                <Icon name={info['icon']} />
                <IconName className='layout1'>{info['label']}</IconName>
              </IconsContainer>
            );
          })}
          <IconsContainer className="layout1 center-aligned">
            <Heading4 className='fw-500'>You</Heading4>
          </IconsContainer>
        </> : null}
        {layoutData['layoutType'] === 'layout2' ? <>
          <IconsContainer className="layout2">
            <ImgTitle>MD</ImgTitle>
            <ImageWrapper className='img-4 w-54'>
              <img src={mdImg} alt="User" />
            </ImageWrapper>
          </IconsContainer>
          <IconsContainer className="layout2">
            <ImageWrapper className='w-54'>
              <img src={hcImg} alt="User" />
            </ImageWrapper>
            <ImgTitle>Health Coach</ImgTitle>
          </IconsContainer>
          <IconsContainer className="layout2">
            <ImageWrapper className='w-54'>
              <img src={cmImg} alt="User" />
            </ImageWrapper>
            <ImgTitle>Care manager</ImgTitle>
          </IconsContainer>
          <IconsContainer className="layout2">
            <ImageWrapper className='img-4 w-54' >
              <img src={youImg} alt="User" />
            </ImageWrapper>
            <ImgTitle className='img-4'>You</ImgTitle>
          </IconsContainer>
        </>:null}
        {layoutData['layoutType'] === 'layout3' ? <>
          {layoutData['iconSec'].map((info:any, i:number)=>{
            return (
              <IconsContainer className="layout3" key={i}>
                <Icon name={info['icon']} />
                <IconName className='layout3'>{info['label']}</IconName>
              </IconsContainer>
            );
          })}
        </> : null}
      </ImageSection>
      <div className={isMobile? '': 'pb-24'}>
        <Heading className='f-32 mt-32 '>
          {layoutData['heading']}
          <span className={layoutData['layoutType']}>
            {layoutData['subHeading']}</span>
        </Heading>
        <Description className='f-17'>
          {layoutData['content']}
        </Description>
      </div>
    </FlexContainer>

  );
}


