/* eslint-disable max-len */

import Header from '@app/components/header/header';
import {ScrollSection} from '@app/modules/boarding-screens/component/boarding-screen-components';
import {DesktopWidth, MainContainer} from '@app/styles/common-styles';
import React from 'react';
import {isMobile} from 'react-device-detect';
import rectangle from '@app/assets/images/rectangle.png';
import Button from '@app/components/button';
import {ButtonMain, FilterContainer, FilterHeading, FilterMain, ImageContainer, QuitzContainer} from './quitz-component';
// import {ApiResponseProps, PayloadProps} from '@app/schema/schema';
// import apiEndpoint from '@app/core/apiend_point';
// import {triggerApi} from '@app/services';
// import {getLocalStorage} from '@app/core/localStorageService';
// import {useParams} from 'react-router-dom';
/**
 * Renders Component.
 *
 * @return {filtering} renders Component.
 */
export default function filtering() {
  // const [data, setData] = useState<any>([]);
  // const token = getLocalStorage('token') ? getLocalStorage('token') : '';
  // const {id}: any = useParams();
  // useEffect(() => {
  //   console.log(token, 'ganesh');
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   const apiObject: PayloadProps = {
  //     payload: {},
  //     method: 'GET',
  //     apiUrl: apiEndpoint.healthRiskForm + id,
  //     // headers: {
  //     //   Authorization: 'Bearer aa0ba7d2176b9b4c2c906206d3d4d5168f9c6248',
  //     // },
  //     headers: {
  //       Authorization: 'Bearer a349794875c4a27fed4d789b4e0eef3edad44896',
  //     },
  //     // headers: {Authorization: token},
  //   };
  //   triggerApi(apiObject)
  //       .then((response: ApiResponseProps) => {
  //         setData(response.data.form);
  //       // if (response.status_code == 200) {
  //       //   setShowSectionMsg(true);
  //       //   setApperance('success');
  //       //   setInfoMsg('Deatils submitted successfully');
  //       //   setTimeout(() => {
  //       //     setShowSectionMsg(false);
  //       //   }, 1000);
  //       // }
  //       // setApperance('success');
  //       // setInfoMsg('Deatils submitted successfully');
  //       })
  //       .catch((error) => {
  //       // setShowSectionMsg(false);
  //       // setApperance('success');
  //       // setInfoMsg(error?.message || 'Deatils submitted successfully');
  //       // setTimeout(() => {
  //       //   setShowSectionMsg(true);
  //       // }, 1000);
  //       });
  // };


  return (
    <>

      <MainContainer bgColor="#F8F5F0" className="flx-start">

        {!isMobile ? <Header hideBackArrow={false} navigateLink="/" hideLogo={true} className="bg-white" /> : null}

        <ScrollSection id="scrollable-div" className={isMobile?'flex-1 flex-unset mb-64':'flex-1 flex-unset'}>

          <DesktopWidth className={isMobile ? ' m-auto' : 'w-1150 m-auto  '} >

            <FilterContainer className='container ' >
              <FilterMain>
                <ImageContainer>  <img src={isMobile ? rectangle: rectangle} alt="User" /></ImageContainer>
                < QuitzContainer>
                  <FilterHeading >First, we’re going to ask you a few questions about your unique symptom set. Every single symptom matters and is an important piece of the puzzle.</FilterHeading>

                  <ButtonMain >
                    <Button variant={'primary'} width="50%" >Let`s get Started</Button>
                  </ButtonMain>
                </QuitzContainer>
              </FilterMain>
            </FilterContainer>

          </DesktopWidth >

        </ScrollSection>
      </MainContainer>
    </>
  );
}
