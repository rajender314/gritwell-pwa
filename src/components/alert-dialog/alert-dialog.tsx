import {BackDrop, CloseIcon, DialogContainer}
  from '@app/modules/assesment-questions/assesment-questions-components';
import {Heading3} from '@app/styles/common-styles';
// import Icon from '../icon';
import React, {useState} from 'react';
import {Description} from '../layout-onBoarding/layout-onBoarding-components';
import Button from '../button';
import {getLocalStorage} from '@app/core/localStorageService';
import {PayloadProps, ApiResponseProps} from '@app/schema/schema';
import {triggerApi} from '@app/services';
import {getProfileDetails} from '@app/utils';
import AnimationCheckmark from '@app/assets/images/animation-checkmark.gif';

type Props = {
    header ?:String;
    description?:String;
    confirmBtn?:String;
    dialogData?:any;
    subscriptionId?:any
    alertType?:string
    onCancel?: (e: any) => void
    cancelBtn?:true
    showCancelButton?: boolean
    onClickCancel?: (e: any) => void

}
/**
 * Renders Component.
 * @param  {Props} props the api
 * @return {AlertDialog} renders Component.
 */
export default function AlertDialog(props: Props) {
  const [dialogStatus, updateDialogStatus] = useState('intial');
  const [dialogMsg, updateDialogMsg] =
  useState(props['description'] ?
   props['description'] :props['dialogData']['description']);
  /**
   * @param {payload} payload
   * @param {method} method
   */
  async function confirm() {
    updateDialogStatus('loading');
    updateDialogMsg(props['dialogData']['loadingMsg']);
    const apiObject: PayloadProps = {
      payload: {
        subscriptionId: props['subscriptionId'],
      },
      method: 'POST',
      apiUrl: props['dialogData']['confirmAPI'],
      headers: {Authorization: getLocalStorage('token')},
    };
    await triggerApi(apiObject)
        .then((response: ApiResponseProps) => {
          if (response.status_code === 200) {
            getProfileDetails();
            setTimeout(()=>{
              updateDialogStatus('confirmed');
              updateDialogMsg(response.data);
            }, 1000);
            // setTimeout(() => {
            // props.onCancel('confirm');
            // }, 3000);
          } else {
            updateDialogStatus('error');
            updateDialogMsg(response.data);
            setTimeout(() => {
              // props.onCancel('confirm');
            }, 2000);
          }
        });
  }
  return (
    <>
      {<BackDrop><DialogContainer className='align-items-center'>

        {!props['dialogData'] ?<>
          {props['alertType'] === 'danger' ?
          <CloseIcon className='js-center danger'>
            {/* <Icon name="check" /> */}
            <span>!</span>
          </CloseIcon> :
          <CloseIcon style={{background: 'none'}} className='js-center'>
            <img src={AnimationCheckmark} alt='animation_checkmark' />
          </CloseIcon>}
          <Heading3>
            {props['header']}
          </Heading3>
          <Description className='text-center'>
            {props['description']}
          </Description>
          <div className='d-flex text-center mt-20 gap-24'>
            <Button variant={'primary'}
              width='auto'
              onClick={()=> {
                props.onCancel('confirm');
              }}
            >Okay</Button>
            {props['showCancelButton'] &&
             <Button className='cancelBtn' variant={'secondary'}
               size='large' width='auto'onClick={props['onClickCancel']}>
                Cancel
             </Button>}
          </div>
        </> :
          <>
            <Heading3>
              {props['dialogData']['heading']}
            </Heading3>
            <Description className='text-center'>
              {dialogMsg}
            </Description>
            {props['dialogData']['notes'] ?
            <Description className='text-center'>
              <b>Note: </b>
              {props['dialogData']['notes']}
            </Description> : null}
            {dialogStatus === 'intial' ?<><Button variant={'primary'}
              size='large' width='100%'
              onClick={()=>{
                confirm();
              }}
              className={'flx-center mt-10'}
            >Confirm</Button>
            <Button variant={'secondary'}
              size='large' width='100%'
              onClick={props['onCancel']}
              className={'flx-center mt-10'}
            >Cancel</Button></> :
          null}
          </>}
      </DialogContainer>
      </BackDrop>}
    </>
  );
}
