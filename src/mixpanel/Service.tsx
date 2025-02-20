const userData = JSON.parse(localStorage.getItem('userData'));
const user = userData ? {
  name: `${userData['first_name']} ${userData['last_name']}`,
  email: userData['email'],
  id: userData['_id'],
} : {};


export const action = {
  Signup: {
    signupBtn: {
      title: 'Sign Up button clicked.',
      props: {},
    },
    pwForm: {
      title: 'Patien waiver form link clicked.',
      props: {},
    },
    termsOfService: {
      title: 'Terms of service link clicked.',
      props: {},
    },
    privacyPolicy: {
      title: 'Privacy Policy link clicked',
      props: {},
    },
    signinLink: {
      title: 'Sign In link is clicked.',
      props: {},
    },
    Goto: {
      title: 'Go to plans link clicked.',
      props: {},
    },
  },
  Signin: {
    backarrow: {
      title: 'Back arrow on sign in is clicked.',
      props: {},
    },
    forgotPassword: {
      title: 'Forgot password link clicked.',
      props: {},
    },
    signinbtn: {
      title: 'Sign In button is clicked.',
      props: {},
    },
    choosePlan: {
      title: 'Choose a plan link clicked.',
      props: {},
    },
    resend: {
      title: 'Clicked on Resend Verification.',
      props: {},
    },
  },
  Home: {
    click: {
      title: 'clicked',
      props: user,
    },
    post: {
      title: 'Clicked on post check in',
      props: user,
    },
    pre: {
      title: 'Clicked on pre check in',
      props: user,
    },
    dailyTaskBackbtn: {
      title: 'Daily task > back button clicked.',
      props: user,
    },
    markAsComplete: {
      title: 'Mark as complete clicked',
      props: user,
    },
    DTMark: {
      title: 'Daily task > Mark as complete clicked.',
      props: user,
    },
    DTPrevious: {
      title: 'Daily task > previous button clicked.',
      props: user,
    },
    DTNext: {
      title: 'Daily task > next button clicked.',
      props: user,
    },
    openChat: {
      title: 'Home > open messages clicked.',
      props: user,
    },
    joinMeet: {
      title: 'Join meeting button clicked.',
      props: user,
    },
    pendingSurvey: {
      title: 'Home > pending surveys clicked.',
      props: user,
    },
    homeOrders: {
      title: 'Home > orders clicked.',
      props: user,
    },
    homeTestResult: {
      title: 'Home > Test Results clicked.',
      props: user,
    },
    yesterday: {
      title: 'Yesterday button clicked',
      props: user,
    },
    today: {
      title: 'Today button clicked',
      props: user,
    },
    tomorrow: {
      title: 'Tomorrow button clicked',
      props: user,
    },
    lastAppMsg: {
      title: 'Last appointment message clicked.',
      props: user,
    },
    showHide: {
      title: 'Show/hide complete task clicked.',
      props: user,
    },
    extendCare: {
      title: 'Home > Extend care button clicked',
      props: user,
    },
    topUp: {
      title: 'Home > Top up appointment button clicked',
      props: user,
    },
    caseStudy: {
      title: 'Home > Clicked on Read full case study.',
      props: user,
    },
    readMore: {
      title: 'Home > Clicked on Read More about your health coach.',
      props: user,
    },
    book: {
      title: 'Home > Book an appointment button clicked.',
      props: user,
    },
    bookMore: {
      title: 'Home > Book more appointment button clicked.',
      props: user,
    },
  },
  planJourney: {
    getStarted: {
      title: 'Plan-journey > get started button clicked.',
      props: user,
    },
    caseStudy: {
      title: 'Read full case study clicked.',
      props: user,
    },
  },
  Header: {
    profileDropdown: {
      title: 'Header > Open profile dropdown.',
      props: user,
    },
    backToWeb: {
      title: 'Back to website clicked',
      props: user,
    },
    logo: {
      title: 'Header logo clicked.',
      props: user,
    },
    settings: {
      title: 'Header > settings clicked.',
      props: user,
    },
    chat: {
      title: 'Header > Chat clicked.',
      props: user,
    },
    profile: {
      title: 'Header > Profile clicked',
      props: user,
    },
    home: {
      title: 'Header > Home clicked.',
      props: user,
    },
    journey: {
      title: 'Header > Journey clicked.',
      props: user,
    },
    tests: {
      title: 'Header > Tests clicked.',
      props: user,
    },
    schedule: {
      title: 'Header > Schedule clicked.',
      props: user,
    },
    careTeam: {
      title: 'Header > care team clicked',
      props: user,
    },
    profileOpt: {
      title: 'Profile option clicked',
      props: user,
    },
    logout: {
      title: 'Logout option clicked',
      props: user,
    },
  },
  add_payment: {
    back: {
      title: 'Add payment > back button clicked',
      props: user,
    },
    addCard: {
      title: 'Clicked on add card.',
      props: user,
    },
    addNewCard: {
      title: 'Clicked on add a new card.',
      props: user,
    },
    purchaseDone: {
      title: 'Payment successful for new client.',
      props: user,
    },
    purchaseFail: {
      title: 'Payment denied for new client.',
      props: user,
    },
  },
  address: {
    back: {
      title: 'Address > back button clicked',
      props: user,
    },
    next: {
      title: 'Address next button clicked.',
      props: user,
    },
    savedAddress: {
      title: 'Address > view saved addresses clicked.',
      props: user,
    },
    confirm: {
      title: 'Address > Clicked on Confirm.',
      props: user,
    },
  },
  appointment: {
    yes: {
      title: 'Yes, cancel button clicked',
      props: user,
    },
    no: {
      title: 'No, don’t cancel button clicked.',
      props: user,
    },
    upcoming: {
      title: 'Upcoming button clicked.',
      props: user,
    },
    past: {
      title: 'Past button clicked',
      props: user,
    },
    reschedule: {
      title: 'Reschedule button clicked',
      props: user,
    },
    cancel: {
      title: 'Cancel appointment button clicked.',
      props: user,
    },
    preCheckin: {
      title: 'Pre check-in button clicked.',
      props: user,
    },
    postCheckin: {
      title: 'Post check-in button clicked.',
      props: user,
    },
    joinMeet: {
      title: 'appointments > join meeting button clicked',
      props: user,
    },
    rebook: {
      title: 'Rebook appointment link clicked',
      props: user,
    },
    reschedule_cancel: {
      title: 'Reschedule or cancel appointment link clicked.',
      props: user,
    },
  },
  assesmentQues: {
    getStarted: {
      title: 'Clicked on get started on assesment questions page.',
      props: user,
    },
  },
  assesmentQuesType: {
    back: {
      title: 'Assesment question typeform back button clicked',
      props: user,
    },
    close: {
      title: 'Assesment question typeform closed',
      props: user,
    },
  },
  rootQuesType: {
    back: {
      title: 'Imbalance typeform back button clicked',
      props: user,
    },
    close: {
      title: 'Imbalance question typeform closed',
      props: user,
    },
  },
  timeQuesType: {
    back: {
      title: 'Timeline typeform back button clicked',
      props: user,
    },
    close: {
      title: 'Timeline question typeform closed',
      props: user,
    },
  },
  boardingScreen: {
    login: {
      title: 'Boarding screen > Log in button clicked.',
      props: user,
    },
    signup: {
      title: 'Boarding screen > sign up button clicked.',
      props: user,
    },
    back: {
      title: 'Boarding screen > back button clicked',
      props: user,
    },
    getStarted: {
      title: 'Boarding screen get started button clicked',
      props: user,
    },
  },
  bookAppointment: {
    back: {
      title: 'Book appointment > back button clicked.',
      props: user,
    },
  },
  cart: {
    checkout: {
      title: 'Clicked on checkout',
      props: user,
    },
    back: {
      title: 'Cart > Clicked on back button.',
      props: user,
    },
    minus: {
      title: 'Cart > Clicked on minus button',
      props: user,
    },
    plus: {
      title: 'Cart > Clicked on plus button',
      props: user,
    },
    remove: {
      title: 'Cart > Clicked on remove',
      props: user,
    },
    keepShopping: {
      title: 'Cart > Clicked on keep shopping',
      props: user,
    },
  },
  chat: {
    back: {
      title: 'Chat > back button clicked.',
      props: user,
    },
  },
  healthJourney: {
    planDetails: {
      title: 'Health journey > See Plan Details Clicked',
      props: user,
    },
    viewPhases: {
      title: 'View Phases care clicked',
      props: user,
    },
    chatWithManager: {
      title: 'Chat with care manager button clicked',
      props: user,
    },
    back: {
      title: 'back button clicked',
      props: user,
    },
  },
  healthPlan: {
    back: {
      title: 'Health plan > back button clicked',
      props: user,
    },
    cancel: {
      title: 'Health plan > cancel button clicked',
      props: user,
    },
  },
  careTeam: {
    close: {
      title: 'Care team profile closed',
      props: user,
    },
    seeFullProfile: {
      title: 'See full profile link clicked',
      props: user,
    },
    bookACall: {
      title: 'Book a call button clicked.',
      props: user,
    },
  },
  Orders: {
    back: {
      title: 'Orders > back to home clicked',
      props: user,
    },
    yourCart: {
      title: 'Orders > your cart clicked',
      props: user,
    },
    order: {
      title: 'Orders >',
      props: user,
    },
    click: {
      title: 'clicked',
      props: user,
    },
  },
  recommened: {
    back: {
      title: 'Recommened > back button clicked',
      props: user,
    },
    yourCart: {
      title: 'Recommened > Clicked on your cart',
      props: user,
    },
    minus: {
      title: 'Recommened > minus button clicked.',
      props: user,
    },
    plus: {
      title: 'Recommened > plus button clicked.',
      props: user,
    },
    addToCart: {
      title: 'Recommened > add to cart button clicked.',
      props: user,
    },
  },
  summary: {
    goToOrders: {
      title: 'Go to orders button clicked.',
      props: user,
    },
    back: {
      title: 'Summary > back button clicked',
      props: user,
    },
    invoice: {
      title: 'Download invoice button clicked.',
      props: user,
    },
  },
  yourOrders: {
    order: {
      title: 'Your orders > Clicked on order',
      props: user,
    },
  },
  phasesCare: {
    backArrow: {
      title: 'Phase care > back arrow clicked.',
      props: user,
    },
    back: {
      title: 'Phase care > back button clicked.',
      props: user,
    },
  },
  postSurveyType: {
    close: {
      title: 'Clicked on Post survey typeform > close',
      props: user,
    },
    back: {
      title: 'Post survey typeform back button clicked.',
      props: user,
    },
  },
  postSurvey: {
    home: {
      title: 'Post survey home link on image clicked.',
      props: user,
    },
    startNow: {
      title: 'Post survey start now button clicked',
      props: user,
    },
  },
  preSurveyType: {
    close: {
      title: 'Clicked on Pre survey typeform > close',
      props: user,
    },
    back: {
      title: 'Pre survey typeform back button clicked.',
      props: user,
    },
  },
  preSurvey: {
    home: {
      title: 'Pre survey home link on image clicked.',
      props: user,
    },
    startNow: {
      title: 'Pre survey start now button clicked',
      props: user,
    },
  },
  accountInformation: {
    save: {
      title: 'Acc info > save button clicked.',
      props: user,
    },
    back: {
      title: 'Acc info > back button clicked',
      props: user,
    },
  },
  billingHistory: {
    download: {
      title: 'Billing history > download pdf button clicked.',
      props: user,
    },
    subscription: {
      title: 'Subscription button clicked.',
      props: user,
    },
    order: {
      title: 'Orders button clicked',
      props: user,
    },
  },
  billingInvoice: {
    back: {
      title: 'Billing invoice > back button clicked.',
      props: user,
    },
    download: {
      title: 'Billing invoice > Download pdf button clicked.',
      props: user,
    },
  },
  changePassword: {
    back: {
      title: 'Password > back button clicked.',
      props: user,
    },
    save: {
      title: 'Password > save button clicked.',
      props: user,
    },
  },
  contactUs: {
    back: {
      title: 'Contact us > back button clicked.',
      props: user,
    },
    phone: {
      title: 'Contact us > clicked on phone number',
      props: user,
    },
    email: {
      title: 'Contact us > clicked on email',
      props: user,
    },
  },
  profileMenu: {
    back: {
      title: 'Profile menu > back button clicked.',
      props: user,
    },
    accountInfo: {
      title: 'Clicked on Account Information.',
      props: user,
    },
    password: {
      title: 'Clicked on Password',
      props: user,
    },
    paymentMethod: {
      title: 'Clicked on payment method',
      props: user,
    },
    billingHistory: {
      title: 'Clicked on billing history.',
      props: user,
    },
    chat: {
      title: 'Clicked on chat',
      props: user,
    },
    contactUs: {
      title: 'Clicked on Contact us',
      props: user,
    },
    logOut: {
      title: 'Profile menu > logout clicked',
      props: user,
    },
  },
  profile: {
    settings: {
      title: 'Clicked on Settings',
      props: user,
    },
    extendCare: {
      title: 'Profile > Extend care button clicked',
      props: user,
    },
    topUp: {
      title: 'Profile > Top up appointment button clicked',
      props: user,
    },
    needHelp: {
      title: 'Need help clicked',
      props: user,
    },
    whatsNext: {
      title: 'Whats next clicked.',
      props: user,
    },
    intakeForm: {
      title: 'Intake form button clicked',
      props: user,
    },
    symptomAnalysis: {
      title: 'Symptom analysis button clicked',
      props: user,
    },
    myOrders: {
      title: 'My orders button clicked',
      props: user,
    },
    keepShopping: {
      title: 'Keep shopping clicked.',
      props: user,
    },
    order: {
      title: 'Order',
      props: user,
    },
    clicked: {
      title: 'is clicked.',
      props: user,
    },
  },
  recommendPlans: {
    FAQPolicy: {
      title: 'Clicked on FAQ cancellation policy',
      props: user,
    },
    purchase: {
      title: 'Clicked on purchase plan',
      props: user,
    },
  },
  accountAccess: {
    access: {
      title: 'Account access >',
      props: user,
    },
    select: {
      title: 'selected',
      props: user,
    },
  },
  createPassword: {
    update: {
      title: 'Clicked on update button',
      props: user,
    },
  },
  forgotPassword: {
    back: {
      title: 'Forgot password > back button clicked',
      props: user,
    },
    send: {
      title: 'Clicked on send a link',
      props: user,
    },
  },
  verifyEmail: {
    logIn: {
      title: 'Clicked on Login button.',
      props: user,
    },
  },
  tests: {
    click: {
      title: 'is clicked',
      props: user,
    },
    addToCart: {
      title: 'Tests > Add to cart button clicked.',
      props: user,
    },
    back: {
      title: 'Tests popup back button clicked.',
      props: user,
    },
    minus: {
      title: 'Tests > minus button clicked.',
      props: user,
    },
    plus: {
      title: 'Tests > plus button clicked.',
      props: user,
    },
    cart: {
      title: 'Tests > cart clicked',
      props: user,
    },
    testResult: {
      title: 'Open Test Results clicked',
      props: user,
    },
    previous: {
      title: 'Tests > previous button clicked',
      props: user,
    },
    next: {
      title: 'Tests > next button clicked',
      props: user,
    },
  },
  typeFormAns: {
    download: {
      title: 'Download button clicked.',
      props: user,
    },
    cancel: {
      title: 'Cancel button clicked.',
      props: user,
    },
  },
  symptomAnalysisHome: {
    getStarted: {
      title: 'Get started clicked.',
      props: user,
    },
    homeLink: {
      title: 'Clicked on home link image.',
      props: user,
    },
  },
  symptomAnalysisType: {
    back: {
      title: 'Back button clicked.',
      props: user,
    },
    close: {
      title: 'Clicked on close.',
      props: user,
    },
    info: {
      title: 'Clicked on info',
      props: user,
    },
  },
  intakeForm: {
    back: {
      title: 'Back button clicked.',
      props: user,
    },
    close: {
      title: 'Clicked on close.',
      props: user,
    },
    info: {
      title: 'Clicked on info',
      props: user,
    },
  },
  intakeHome: {
    getStarted: {
      title: 'Get started clicked.',
      props: user,
    },
    homeLink: {
      title: 'Clicked on home link image.',
      props: user,
    },
  },
  extendPlan: {
    infoIcon: {
      title: 'Extend Plan page > Info Icon is clicked.',
      props: user,
    },
    viewOptions: {
      title: 'Extend Plan page > Clicked on View available options',
      props: user,
    },
    continue: {
      title: 'Extend Plan page > Clicked on Continue Button',
      props: user,
    },
  },
  planTopUp: {
    select: {
      title: 'selected.',
      props: user,
    },
    buyLater: {
      title: 'Top up appointment page > Buy Later button clicked.',
      props: user,
    },
    continue: {
      title: 'Top up appointment page > Continue button clicked.',
      props: user,
    },
  },
  rootHome: {
    inflammationTest: {
      title: 'Root Home > Inflammation Test card is Clicked.',
      props: user,
    },
    timeLineAnalysis: {
      title: 'Root Home > Time Line analysis card is Clicked.',
      props: user,
    },
    imbalanceAnalysis: {
      title: 'Root Home > Imbalance Analysis card is Clicked.',
      props: user,
    },
    caseStudy: {
      title: 'Root Home > Read full case study is Clicked.',
      props: user,
    },
  },
  orderPayment: {
    continue: {
      title: 'Order payment > Clicked on continue.',
      props: user,
    },
    gotIt: {
      title: 'Order payment > Clicked on Got it button.',
      props: user,
    },
    back: {
      title: 'Order payment > Clicked on back button',
      props: user,
    },
    newCard: {
      title: 'Order payment > Clicked on add a new card',
      props: user,
    },
    viewCard: {
      title: 'Order payment > Clicked on View Card.',
      props: user,
    },
  },
  payment: {
    payNow: {
      title: 'Order payment > Clicked on Pay now.',
      props: user,
    },
    addCard: {
      title: 'Order payment > Clicked on Add Card.',
      props: user,
    },
  },
};

export const service = {
  signup: {
    title: 'Sign up page is opened.',
    props: {},
  },
  signin: {
    title: 'Sign in page is opened.',
    props: {},
  },
  home: {
    title: 'Home page is opened.',
    props: user,
  },
  plan_Jouney: {
    title: 'Plan journey page is opened.',
    props: user,
  },
  addPayment: {
    title: 'Add payment page is opened.',
    props: user,
  },
  address: {
    title: 'Address page is opened.',
    props: user,
  },
  appointment: {
    title: 'Appointments are opened.',
    props: user,
  },
  assesmentQuestions: {
    title: 'Assesment Questions are opened.',
    props: user,
  },
  assesmentQuestionsTypeform: {
    title: 'Assesment Questions Typeform is opened.',
    props: user,
  },
  rootQuestionsTypeform: {
    title: 'Imbalance Anlaysis typeform is opened.',
    props: user,
  },
  timeQuestionsTypeform: {
    title: 'Timeline typeform is opened.',
    props: user,
  },
  boardingScreen: {
    title: 'Boarding screen is opened.',
    props: user,
  },
  bookAppointment: {
    title: 'Book a appointment is opened.',
    props: user,
  },
  cart: {
    title: 'Cart is opened.',
    props: user,
  },
  chat: {
    title: 'Chat is opened.',
    props: user,
  },
  healtJourney: {
    title: 'Health Journey is opened.',
    props: user,
  },
  healthPlan: {
    title: 'Health Plan is opened.',
    props: user,
  },
  careTeam: {
    title: 'Care Team is opened.',
    props: user,
  },
  intakeHome: {
    title: 'Intake Home is opened.',
    props: user,
  },
  inflaHome: {
    title: 'Inflammation Home is opened.',
    props: user,
  },
  intakeForm: {
    title: 'Intake Form is opened.',
    props: user,
  },
  symptomAnalysisHome: {
    title: 'Symptom Analysis Home is opened.',
    props: user,
  },
  symptomAnalysisTypeform: {
    title: 'Symptom Analysis Typeform is opened.',
    props: user,
  },
  orders: {
    title: 'Orders is opened.',
    props: user,
  },
  recommened: {
    title: 'Order > recommend is opened.',
    props: user,
  },
  summary: {
    title: 'Order summary is opened.',
    props: user,
  },
  yourOrders: {
    title: 'Your Orders is opened.',
    props: user,
  },
  phaseCare: {
    title: 'Phases Care is opened.',
    props: user,
  },
  postSurveyTypeform: {
    title: 'Post Survey Typeform is opened.',
    props: user,
  },
  postSurvey: {
    title: 'Post Survey is opened.',
    props: user,
  },
  preSurveyTypeform: {
    title: 'Pre survey typeform is opened',
    props: user,
  },
  preSurvey: {
    title: 'Pre survey is opened',
    props: user,
  },
  accountInfo: {
    title: 'Account Information is opened.',
    props: user,
  },
  billingHistory: {
    title: 'Billing History is opened.',
    props: user,
  },
  billingInvoice: {
    title: 'Billing Invoice is opened.',
    props: user,
  },
  changePassword: {
    title: 'Change Password is opened.',
    props: user,
  },
  contactUs: {
    title: 'Contact Us is opened',
    props: user,
  },
  profileMenu: {
    title: 'Profile Menu is opened.',
    props: user,
  },
  profile: {
    title: 'Profile is opened.',
    props: user,
  },
  recommendedPlans: {
    title: 'Recommended Plans page is opened.',
    props: user,
  },
  recommendations: {
    title: 'Recommendations page is opened.',
    props: user,
  },
  accountAcess: {
    title: 'Account Access page is opened.',
    props: user,
  },
  createPassword: {
    title: 'Create password page is opened.',
    props: user,
  },
  forgotPassword: {
    title: 'Forgot password page is opened.',
    props: user,
  },
  verifyEmail: {
    title: 'Verify e-mail page is opened.',
    props: user,
  },
  tests: {
    title: 'Tests page is opened.',
    props: user,
  },
  extendPlan: {
    title: 'Extend plan page is opened.',
    props: user,
  },
  planTopUp: {
    title: 'Extend plan top up appointment page is opened.',
    props: user,
  },
  orderPayment: {
    title: 'Order Payment page is opened.',
    props: user,
  },
};
