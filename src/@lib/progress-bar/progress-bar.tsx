/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
import * as React from 'react';
import './styles.css';

import {StepStates, ProgressStep, StepProgressProps, ReducerAction} from './models';

function stepsReducer(steps: ProgressStep[], action: ReducerAction): ProgressStep[] {
  return steps.map(function(step, i) {
    if (i < action.payload.index) {
      step.state = StepStates.COMPLETED;
    } else if (i === action.payload.index) {
      step.state = action.payload.state;
    } else {
      step.state = StepStates.NOT_STARTED;
    }
    return step;
  });
}

function StepProgressBar(props: StepProgressProps): JSX.Element {
  const {
    steps,
    startingStep,
    wrapperClass,
    progressClass,
    stepClass,
    labelClass,
    subtitleClass,
    showLabel,
  } = props;
  const [state, dispatch] = React.useReducer(stepsReducer, steps);
  const [currentIndex] = React.useState(startingStep);

  React.useEffect(function() {
    dispatch({
      type: 'init',
      payload: {index: currentIndex, state: StepStates.CURRENT},
    });
  }, []);


  return (
    <div className={`${['progress-bar-wrapper']} ${wrapperClass || ''}`}>
      <ul className={`${['step-progress-bar']} ${progressClass || ''}   ${window.location.href.includes('orders') ? ' orderTrack' : ''}`} >

        {state.map(function(step, i) {
          return (
            <li
              key={i}
              className={`${['progress-step ']}${step.state} ${stepClass}`}
            >
              {step.state === StepStates.COMPLETED && (
                <span className={`${'step-icon'} ${(step.reviewStep) ? 'review-icon' : ''}`}>
                  {(step.reviewStep == true) ? <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.30656 11.4819C4.61605 8.45146 6.87349 5.91417 9.12506 4.10603C11.4352 2.34977 13.7396 1.32249 16.4928 2.51263C19.2188 3.73661 22.3646 6.45977 24.1944 9.30567C26.0682 12.2135 26.6259 15.244 25.1873 18.5114C23.8394 21.7613 20.7222 23.6459 17.5607 24.8306C14.3486 25.9643 11.0923 26.3984 8.29473 25.5695C5.46167 24.67 3.33869 22.6918 2.48371 20.1635C1.59287 17.636 1.97005 14.5582 3.30656 11.4819Z"
                      fill="#D29B22" stroke="#D29B22" strokeWidth="3"/>
                  </svg> :
                    ''}

                  {(!step.reviewStep) ?<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.30656 11.4819C4.61605 8.45146 6.87349 5.91417 9.12506 4.10603C11.4352 2.34977 13.7396 1.32249 16.4928 2.51263C19.2188 3.73661 22.3646 6.45977 24.1944 9.30567C26.0682 12.2135 26.6259 15.244 25.1873 18.5114C23.8394 21.7613 20.7222 23.6459 17.5607 24.8306C14.3486 25.9643 11.0923 26.3984 8.29473 25.5695C5.46167 24.67 3.33869 22.6918 2.48371 20.1635C1.59287 17.636 1.97005 14.5582 3.30656 11.4819Z" fill="#D29B22" stroke="#D29B22" strokeWidth="3"/>
                  </svg> :
 ''}
                </span>
              )}
              {step.state === StepStates.ERROR && <span className={'step-icon'}>!</span>}
              {step.state !== StepStates.COMPLETED && step.state !== StepStates.ERROR && (
                <span className={'step-index'}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.30656 11.4819C4.61605 8.45146 6.87349 5.91417 9.12506 4.10603C11.4352 2.34977 13.7396 1.32249 16.4928 2.51263C19.2188 3.73661 22.3646 6.45977 24.1944 9.30567C26.0682 12.2135 26.6259 15.244 25.1873 18.5114C23.8394 21.7613 20.7222 23.6459 17.5607 24.8306C14.3486 25.9643 11.0923 26.3984 8.29473 25.5695C5.46167 24.67 3.33869 22.6918 2.48371 20.1635C1.59287 17.636 1.97005 14.5582 3.30656 11.4819Z" fill="white" stroke="#D29B22" strokeWidth="3"/>
                  </svg>
                </span>
              )}
              {showLabel && <div className={`${'step-label det'} ${labelClass || ''} ${(step.reviewStep) ? 'step-label-review' : ''} `}>
                <span style={{display: 'block', textTransform: 'uppercase', marginBottom: '6px', lineHeight: '1'}}>{step.name}</span>
                {step.description && (
                  <div className={`${['step-label-subtitle det']} ${subtitleClass || ''}`}>
                    {step.description}
                  </div>
                )}
                {step.detail && (
                  <div className={`${['step-label-subtitle det num']} ${subtitleClass || ''}`}>
                    {step.detail['name'] ? step.detail['name'] : ''}{' '}{step.detail['supportNumber'] ? step.detail['supportNumber'] : ''}
                  </div>
                )}
                {step.subtitle && (

                  <>
                    {step.subtitleWithCode && (
                      <div className="titlewithcode">{step.subtitleWithCode}</div>
                    )}
                    <div className={`${['step-label-subtitle det']} ${subtitleClass || ''}`}>
                      {step.subtitle}{step.subtitleWithCode ? '-' : ''}{step.subtitleWithCode}
                    </div>
                  </>
                )}
              </div>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default StepProgressBar;
