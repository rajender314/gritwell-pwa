/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
/* eslint-disable linebreak-style */
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import React, {useEffect} from 'react';
import {useState} from 'react';
// import Header from '@app/components/header';
import {ViewPdfBox,
  PdfPlugins,
  PdfBox,
  PdfPreviousButtons,
  PdfDownloadButton,
  PdfNextButton,
  NextImage,
  Box,
  Iframe,
  PdfName}
  from './viewpdf-components';
import {isMobile} from 'react-device-detect';
import next from '@app/assets/images/next.svg';
import prev from '@app/assets/images/prev.svg';
import {LoginContainer} from '@app/modules/tests/tests-components';
import {BackDrop, ContentContainer, DialogContainer, IconsContainer} from
  '@app/modules/assesment-questions/assesment-questions-components';
// import {useNavigate} from 'react-router-dom';
import Icon from '../icon';
import {DesktopWidth} from '@app/styles/common-styles';
import ReactPdf from '../react-pdf';
type Props = {
  pdfDoc :[];
  name ?: string;
  onClick?: (e: any) => void;


}
/**
 * Renders Component.
 * @return {SignIn} renders Component.
 */
export default function Viewpdf(props: Props) {
  const [pdfDoc, updatePdfDoc] = useState<any>(props['pdfDoc'] ?
   props['pdfDoc'] : [] );
  const [PdfArray, setPdfArray] = useState(0);

  const previous = () => {
    const length = pdfDoc.length;
    setPdfArray(PdfArray <= length - 1 ? PdfArray - 1 : 0);
  };

  const nextButton = () => {
    const length = pdfDoc.length;
    const value = PdfArray < length ? PdfArray + 1 : 0;
    setPdfArray(value);
  };

  useEffect(()=>{
    updatePdfDoc(props['pdfDoc']);
  }, []);
  // const navigate = useNavigate();

  return (<>
    {/* <Header desktopMenu={isMobile ? false : true} /> */}

    <BackDrop><DialogContainer className='al-center ovy-scroll w-100 max-w-70'
      style={{background: 'white'}}>
      {/* <ContentContainer className={isMobile ?
          '' : 'br-bg  mt-40'}> */}
      <ViewPdfBox style={{width: '100%', height: '100%'}}>
        <PdfBox>
          <PdfPlugins className={PdfArray > 0 ? 'active' : '' +
                 ' d-flex'}>
            <div className='flex-1'>
              <IconsContainer onClick={props.onClick}>
                <Icon name={'chervonLeft'} />
              </IconsContainer>
            </div>
            <PdfDownloadButton className={PdfArray > 0 ? 'active' : ''}
              href={pdfDoc[PdfArray]['testResult']}
              target="_blank" download>
            Download PDF
            </PdfDownloadButton>
          </PdfPlugins>

          <PdfName className=
            {PdfArray > 0 ? 'active' : ''}>{props.name}</PdfName>
          <Box>
            {/* <Iframe src=
              {`${pdfDoc[PdfArray]['testResult']}#toolbar=0&output=embed`}
            frameBorder={0}
            >
            </Iframe> */}
            <ReactPdf pdfDoc={pdfDoc}
              name={'Inflamation Test'}/>
            {/* <Iframe src=
              {`https://docs.google.com/gview?url=${pdfDoc[PdfArray]['testResult']}&embedded=true`} frameBorder={0}>
            </Iframe> */}
          </Box>
          <PdfPlugins className='footerButtonContainer'>

            <PdfPreviousButtons className=
              {PdfArray === 0 ? 'disable' : ''} onClick={()=>previous()}>
              <NextImage src={prev} alt='Next Button' /> &nbsp; &nbsp;
              <span>Previous</span>
            </PdfPreviousButtons>
            <PdfNextButton className=
              {PdfArray === pdfDoc.length - 1 ? 'disable' : ''}
            onClick={()=>nextButton()}>
              <span>Next</span> &nbsp; &nbsp;
              <NextImage src={next} alt='Next Button' />
            </PdfNextButton>
          </PdfPlugins>
        </PdfBox>
      </ViewPdfBox>
      {/* </ContentContainer> */}
    </DialogContainer>
    </BackDrop>
  </>);
}
