/* eslint-disable max-len */
const apiEndpoint = {
  getBoardingDataAPI: 'mobile/pwaLandingPages',
  getPlansAPI: 'mobile/plans/',
  signInApi: 'clientLogin ',
  guestLogin: 'guestLogin',
  forgotApi: 'forgotPassword',
  verifyTokenApi: 'VerifyForgotToken',
  resetPasswordApi: 'ResetPassword',
  signUpAPI: 'client/clientUser',
  paymentAPI: 'mobile/clients/subscription',
  signInDocs: 'mobile/pwasignInDocs',
  getProfileApi: 'profile',
  changePasswordApi: 'changePassword',
  uploadProfilePicApi: 'office/uploadProfilePic',
  updateProfile: '',
  appointmentList: 'client/appointments',
  validateAppointment: 'client/validateAppointment',
  appointmentPayment: 'client/appointmentPayment',
  configApi: 'configList',
  cardsApi: 'mobile/clients/cards',
  updateDefaultApi: 'mobile/clients/updateDefaultCard',
  pauseSubscription: 'mobile/clients/pauseSubscription',
  unPauseSubscription: 'mobile/clients/unPausingSubscription',
  cancelSubscription: 'mobile/clients/cancelSubscription',
  billingHistory: 'client/myPaymentHistory',
  downloadHistory: 'client/downloadPaymentHistory',
  getIntakeAPI: 'client/intakeForm',
  downloadIntake: 'client/downloadIntakeForm',
  getSymptomAPI: 'client/symptomAnalysis',
  downloadSymptom: 'client/downloadSymptomAnalysis',
  getTimeLineAPI: 'client/timeLineAnalysis',
  downloadTimeLine: 'client/downloadTimeLineAnalysis',
  getRootCauseAPI: 'client/imbalanceAnalysis',
  downloadRootCause: 'client/downloadImbalanceAnalysis',
  billingInvoice: 'client/payment',
  downloadInvoice: 'client/downloadPaymentDetails',
  reSendEmailVerification: 'client/reSendEmailVerification',
  autoLogin: 'autoLogin',
  phases: 'client/myPhasesOfCare',
  phaseStaus: 'office/clients/healthplan/statuses/phasesOfCare',
  custStatus: 'client/customerStats',
  recommendations: 'client/myhealthPlan',
  markAsComplete: 'client/myhealthPlanMarkasComplete',
  myTests: 'client/myTests',
  markAsViewed: 'client/myhealthPlanItemasViewed',
  undoComplete: 'client/undoDailyGoalMarkasComplete/',
  cart: 'mobile/cart',
  order: 'mobile/order',
  orderPayment: 'mobile/orderPayment',
  address: 'mobile/customerAddresses',
  makeDefAdd: 'mobile/updateDefaultCustomerAddress/',
  downloadOrder: 'mobile/downloadOrderInvoice/',
  updateTestResult: 'client/updateMyTestStatus',
  caseStudies: 'mobile/caseStudies',
  logOut: 'logout',
  getSubscriptionsPlan: 'mobile/plans',
  healthRiskForm: 'office/clients/typeform/getHealthSpectrumForm',
  healthRiskFormPostApi: 'api/syncFilterQuiz/',
  currentHealthPlan: 'client/myCurrentHealthPlan',
  customerExtendCarePlans: 'client/customerExtendCarePlans',
  planExtend: 'mobile/clients/extendSubscription',
  userChats: 'client/liveHelperUserChats/',
  userChatInfo: 'client/liveHelperFetchchatInfo/',
  fetchChatMsgs: 'client/liveHelperFetchChatMessages/',
  addMsgs: 'client/liveHelperAddMsgToChatAsAdmin',
  createChat: 'client/LiveHelperUserOperatorChats',
  addMsgAsUser: 'client/liveHelperAddMsgUser',
  urmStatusUpdate: 'client/liveHelperURMStatusUpdate',
  myPreviousNotes: 'client/myPreviousNotes',
  deleteProfilePic: 'office/profilePicture/',
  applyPromoCode: 'client/verifyStripeCoupon',
  retryPaymentApi: 'mobile/clients/updateSubscriptionPaymentCard',
  FilterApi: 'office/masters/',
  removeTests: 'client/removeTests',
  removeAddress: 'client/removeAddress',
  verifyAddress: 'client/verifyAddress',
  locationApi: 'client/locationUpdate',
  rootCausePlans: 'client/rootCausePlans',
  getLocation: 'client/getUserLocation',
  rootCausePlan: 'client/rootCausePlan',
  rootCausePaymentApi: 'client/rootCausePayment',
  rootCauseTodos: 'client/todos',
  registerInflamationTest: 'client/registerInflammationTest',
  rootcauseAppointments: 'client/getRootCauseAppointment',
};

export default apiEndpoint;

export const AssesmentHomePage = {
  tagline: 'We’re glad you’re here! ',
  heading: 'Let’s start your Health Assessment',
  content:
    'Your answers help us identify the most' +
    ' suitable plan to address the root cause of' +
    ' your symptoms. The more you share, the more we can help!',
  footer: '~6 minutes to complete',
};
export const IntakeForm = {
  tagline: 'Thank you for joining Gritwell ',
  heading: 'Complete the intake form',
};
export const InflaForm = {
  tagline: 'We’re glad you’re here! ',
  heading: 'Register Inflammation test kit',
  content:
  'Please fill out your shipping information so that we can mail you your at-home inflammation blood test. Once you submit your address, expect to receive your test in ~2-5 business days. All instructions on how to take the test and mail back to the lab will be in your kit. However please text your care manager if you have any questions during the process.',
  footer: '~30 seconds to complete',
};
export const SymptomAnalysis = {
  tagline: 'Let’s get to know you better',
  heading: 'Complete your symptom analysis',
  content:
    'Completing the symptom analysis' +
    ' helps us craft the perfect plan for you' +
    ' based on your symptoms and severity.',
  footer: '~6 minutes to complete',
};
export const PreSurveyData = {
  tagline: 'Before your appointment',
  heading: 'Check-in survey',
};
export const PostSurveyData = {
  tagline: 'After your appointment',
  heading: 'How did your appointment go?',
};


export const PlansPage = {
  tagline: `Find the plan that's right for you`,
  heading: 'Your recommended Gritwell plan is in!',
  content: 'Based on your results we recommend the following plan:',
};

export const confirmStatements = {
  pauseSubscription: {
    heading: 'Pause Subscription',
    description: 'Are you sure you want to pause the subscription?',
    notes: 'Subscription can be paused for maximum of 2 months only',
    buttonText: 'Pause and Continue',
    confirmAPI: apiEndpoint.pauseSubscription,
    loadingMsg: 'Pausing Subscription Please wait ...',
    type: 'confirm',
  },
  resumeSubscription: {
    heading: 'Resume Subscription',
    description: 'Are you sure you want to resume the subscription?',
    notes: '',
    buttonText: 'Resume and Continue',
    confirmAPI: apiEndpoint.unPauseSubscription,
    loadingMsg: 'Resuming Subscription Please wait ...',
    type: 'confirm',
  },
  cancelSubscription: {
    heading: 'Cancel Subscription',
    description: 'Are you sure you want to cancel the subscription?',
    notes: 'Once Cancelled cannot be retrived',
    buttonText: 'Cancel',
    loadingMsg: 'Cancelling Subscription Please wait ...',
    confirmAPI: apiEndpoint.cancelSubscription,
    type: 'confirm',
  },
  intakeForm: {
    heading: 'Intake Form',
    getAPI: apiEndpoint.getIntakeAPI,
    downloadAPI: apiEndpoint.downloadIntake,
  },
  symptomForm: {
    heading: 'Symptom Analysis',
    getAPI: apiEndpoint.getSymptomAPI,
    downloadAPI: apiEndpoint.downloadSymptom,
  },
  timelineForm: {
    heading: 'Timeline Quiz',
    getAPI: apiEndpoint.getTimeLineAPI,
    downloadAPI: apiEndpoint.downloadTimeLine,
  },
  rootcauseForm: {
    heading: 'Imbalance Analysis',
    getAPI: apiEndpoint.getRootCauseAPI,
    downloadAPI: apiEndpoint.downloadRootCause,
  },
};
export const Recommended = {
  question: 'What are you interested in?',
  options: [
    {
      heading: 'Extend my current plan',
      id: 1,
      description: 'Continue to meet bi-weekly with my coach',
    },
    {
      heading: 'Meet my coach on-demand',
      id: 2,
      description:
        'Purchase appointments on-demand to check in with my coach periodically throughout the year',
    },
  ],
  buttontext: 'Next',
};
export const Extendplans = {
  subheading: 'As a GritWell Member you can choose an appointment package that fits your need ',
  heading: 'You’ve got options!',
  tasks: [
    {
      heading: '2 appointments per month',
      subheading: 'Order Gritwell supplements & tests',
      description: 'Continued Gritwell care team support',
    },
  ],
  options: [
    {
      heading: '4-appointment package',
      price: '$340 ($85/appointment) expires with membership',
      id: 1,
    },
    {
      heading: '6-appointment package',
      price: '$480 ($80/appointment) valid for a year.',
      id: 2,
    },
    {
      heading: '8-appointment package',
      price: '$600 ($75/appointment)',
      id: 3,
    },
  ],
  buttontext: 'Continue',
  buttontext1: 'Buy Later',
};

export const Ondemand = {
  heading: 'Become a member, so you’ve got options',
  subheading: 'As a member you have access to check in with',
  subheading2: 'throughout the year.',
  title: 'Purchase Gritwell membership ',
  price: '$99/year, billed one-time',
  content: 'Access to purchase more appointments.',
  tag: ' View available options.',
  text: 'Reorder any supplements & tests',
  description: 'Continued care team support',
  description1: 'Access to all your notes anytime',
  question: 'Why should I purchase a membership?',
  answer: 'Symptoms can ebb and flow, so having the ability to check in whenever there is a flare allows us to stay on the right path, re-testing & adjusting where necessary.',
  buttontext: 'Continue',
  Choose: 'Choose between',
  tasks: [
    {
      points: '1. Program Extension - continue your monthly subscription and meet your coach twice a month for as long as you need, with the option to cancel at any time.'},
    {points: '2. Flexible Care - Flexibility to choose the number of appointments and when you want to use them'},
    {points: '4 appointments at $340 ($85/appt)'},
    {points: '6 appointments at $480 ($80/appt)'},
    {points: '8 appointments at $600 ($75/appt)'},

  ],
};
export const TimeLineQuiz = {
  tagline: 'We’re glad you’re here! ',
  heading: 'Let’s start your Timeline Analysis',
  content:
    'The timeline is a crucial tool that allows us to take a comprehensive look at your history. The goal is to understand all environmental and lifestyle factors that could have contributed to the state of your health today (i.e. begin to uncover potential root causes). ',
  footer: '~20 minutes to complete.',
};

export const RootCauseQuiz = {
  tagline: 'We’re glad you’re here! ',
  heading: 'Let’s start your Imbalance Analysis',
  content:
    'The imbalance analysis is a thorough assessment of every symptom across all systems in your body. The goal is to understand what imbalances or dysfunctions are contributing to your symptoms (i.e. hormones, adrenals, mitochondrial and more). ',
  footer: '~20 minutes to complete.',
};
