/* eslint-disable no-unused-vars */
export enum StepStates {
    NOT_STARTED = 'not_started',
    CURRENT = 'current',
    ERROR = 'error',
    COMPLETED = 'completed'
  }

export interface ProgressStep {
    name: string;
    subtitle?: string;
    description: string;
    state?: StepStates;
    content: React.ReactNode;
    reviewStep?:boolean;
    subtitleWithCode?:string;
    detail?:any;
    validator?: (payload?: any) => boolean;
  }

export interface StepProgressProps {
    steps: ProgressStep[];
    startingStep: number;
    wrapperClass?: string;
    progressClass?: string;
    stepClass?: string;
    labelClass?: string;
    subtitleClass?: string;
    contentClass?: string;
    buttonWrapperClass?: string;
    primaryBtnClass?: string;
    secondaryBtnClass?: string;
    submitBtnName?: string;
    onSubmit: Function;
    previousBtnName?: string;
    nextBtnName?: string;
    showLabel?:boolean
  }

export interface ReducerAction {
    type: string;
    payload: { index: number; state: StepStates };
  }
