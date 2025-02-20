/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
/* eslint-disable linebreak-style */
import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  ViewPdfBox,
  PdfPlugins,
  PdfBox,
  PdfPreviousButtons,
  PdfDownloadButton,
  PdfNextButton,
  NextImage,
  Box,
  Iframe,
  PdfName,
  PDFDiv,
} from '../viewpdf/viewpdf-components';
import {isMobile} from 'react-device-detect';
import next from '@app/assets/images/next.svg';
import prev from '@app/assets/images/prev.svg';
import {LoginContainer} from '@app/modules/tests/tests-components';
import {
  BackDrop,
  ContentContainer,
  DialogContainer,
  IconsContainer,
} from '@app/modules/assesment-questions/assesment-questions-components';
import Icon from '../icon';
import {Viewer} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {Worker} from '@react-pdf-viewer/core';

type Props = {
  pdfDoc: [];
  name?: string;
  onClick?: (e: any) => void;
};
/**
 * Renders Component.
 * @return {ReactPdf} renders Component.
 */
export default function ReactPdf(props: Props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfDoc, updatePdfDoc] = useState(
    props['pdfDoc'] ? props['pdfDoc'] : [],
  );
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

  useEffect(() => {
    updatePdfDoc(props['pdfDoc']);
  }, []);

  return (
    <>
      <BackDrop>
        <DialogContainer
          className="al-center ovy-scroll w-100 max-w-70"
          style={{background: 'white'}}
        >
          <ViewPdfBox style={{width: '100%', height: '100%'}}>
            <PdfBox>
              <PdfPlugins className={PdfArray > 0 ? 'active' : '' + ' d-flex'}>
                <div className="flex-1">
                  <IconsContainer onClick={props.onClick}>
                    <Icon name={'chervonLeft'} />
                  </IconsContainer>
                </div>
                <PdfDownloadButton
                  className={PdfArray > 0 ? 'active' : ''}
                  href={pdfDoc[PdfArray]['testResult']}
                  target="_blank"
                  download
                >
                  Download PDF
                </PdfDownloadButton>
              </PdfPlugins>

              <PdfName className={PdfArray > 0 ? 'active' : ''}>
                {props.name}
              </PdfName>
              <Box>
                <PDFDiv>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                    <Viewer fileUrl={pdfDoc[PdfArray]['testResult']} />
                  </Worker>
                </PDFDiv>
              </Box>
              <PdfPlugins className="footerButtonContainer">
                <PdfPreviousButtons
                  className={PdfArray === 0 ? 'disable' : ''}
                  onClick={() => previous()}
                >
                  <NextImage src={prev} alt="Next Button" /> &nbsp; &nbsp;
                  <span>Previous</span>
                </PdfPreviousButtons>
                <PdfNextButton
                  className={PdfArray === pdfDoc.length - 1 ? 'disable' : ''}
                  onClick={() => nextButton()}
                >
                  <span>Next</span> &nbsp; &nbsp;
                  <NextImage src={next} alt="Next Button" />
                </PdfNextButton>
              </PdfPlugins>
            </PdfBox>
          </ViewPdfBox>
        </DialogContainer>
      </BackDrop>
    </>
  );
}
