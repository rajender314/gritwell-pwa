/* eslint-disable max-len */
import React, {useState} from 'react';
import Header from '@app/components/header';
import {useNavigate} from 'react-router-dom';
import {Recommended} from '@app/core/apiend_point';
import {isMobile} from 'react-device-detect';
import {
  BoxLabel,
  ButtonDiv,
  ContainerBox,
  LabelDiv,
  OptionContainer,
  OptionDiv,
  OptionLabel,
  OptionPara,
} from './designs-comonents';
import Icon from '@app/components/icon';
import Button from '@app/components/button/button';
import {DesktopWidth, MainContainer} from '@app/styles/common-styles';
import {ScrollSection} from '../boarding-screens/component/boarding-screen-components';
import {ContentContainer} from '../assesment-questions/assesment-questions-components';

/**
 * Renders Component.
 * @return {Recommend} renders Component.
 */
export default function Recommend() {
  const [id, setId] = useState(Recommended['options'][0]['id']);
  const navigate = useNavigate();
  // const [select, setSelect]=useState('opt1');
  const redirection = () => {
    if (id === 1) {
      navigate('/extendplans');
    } else if (id === 2) {
      navigate('/ondemand');
    }
  };
  return (
    <>
      <MainContainer bgColor="#f9d4a9" >
        <Header
          className="justify-content-between"
          bgCol={isMobile ? '#E9DCCE' : '#fff'}
          desktopMenu={isMobile ? false : true}
          showMessage={true}
          hideBackArrow={false}
        />
        <ScrollSection
          id="scrollable-div"
          className={
            isMobile ? 'flex-1 flex-unset mb-64 ' : 'flex-1 flex-unset '
          }
        >
          <DesktopWidth >
            <ContentContainer
              bgColor={'transparent'}
              className={isMobile ? 'py-0 d-flex js-cen' : 'py-0 d-flex js-cen'}
            >
              {/* <Container> */}
              <ContainerBox>
                <div>
                  <Icon name={'chervonLeft'} />
                </div>
                <LabelDiv>
                  <BoxLabel> {Recommended['question']}</BoxLabel>
                </LabelDiv>
                <OptionContainer>
                  <div>
                    {Recommended['options'].map((item:any, key: any)=>{
                      return <OptionDiv key={key}
                        className={id === item.id ? 'active options ' : 'options'}
                        // className={select === 'opt1' ? 'border' : ''}
                        onClick={() => setId(item.id)}

                      >
                        <OptionLabel>
                          {item.heading}
                        </OptionLabel>
                        <OptionPara>
                          {item.description}
                        </OptionPara>
                      </OptionDiv>;
                    }) }
                    {/* <OptionDiv
                      className={select === 'opt2' ? 'border' : ''}
                      onClick={() => setSelect('opt2')}
                      // onClick={() => navigate('/ondemand')}
                    >
                      <OptionLabel>
                        {Recommended['options'][1].heading}
                      </OptionLabel>
                      <OptionPara>
                        {Recommended['options'][1].description}
                      </OptionPara>
                    </OptionDiv> */}
                  </div>
                  <ButtonDiv>
                    <Button variant={'primary'} width="149px" onClick={redirection}>
                      {Recommended['buttontext']}
                    </Button>
                  </ButtonDiv>
                </OptionContainer>
              </ContainerBox>
              {/* </Container> */}
            </ContentContainer>
          </DesktopWidth>
        </ScrollSection>
      </MainContainer>

    </>
  );
}
