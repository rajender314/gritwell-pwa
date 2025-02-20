import Spinner from '@app/components/icon/icons/loader';
import ChatWin from '@app/modules/chat';
// import Healthriskform from
// '@app/modules/health-risk-form/component/Healthriskform';
import {Loader} from '@app/styles/common-styles';
import React, {lazy, Suspense} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
// import BoardingScreen from '../modules/boarding-screens/component';
const BoardingScreen = lazy(
    () => import('../modules/boarding-screens/component'),
);
const AssesmentQuestions = lazy(() => import('../modules/assesment-questions'));
const AssesmentQuestionsTypeForm = lazy(
    () => import('@app/modules/assesment-questions-typeform/component'),
);
const RecommendPlans = lazy(
    () => import('@app/modules/recommend-plans/component'),
);
// const AccountAccess = lazy(() =>
//   import('@app/modules/sign-up/component/account-access'));
const PlansSignUP = lazy(() => import('@app/modules/sign-up/component/signup'));
// const PlansSignIn = lazy(() =>
// import('@app/modules/sign-up/component/signin'));
const CreatePassword = lazy(
    () => import('@app/modules/sign-up/component/create-password'),
);
const ForgotPassword = lazy(
    () => import('@app/modules/sign-up/component/forgot-password'),
);
const AddPayment = lazy(() => import('@app/modules/add-payment'));
const OrderPayment = lazy(() => import('@app/modules/order-payment'));
const PlanJourney = lazy(() => import('@app/modules/plan-journey/component'));
const VerifyEmail = lazy(
    () => import('@app/modules/sign-up/component/verify-email'),
);
const Home = lazy(() => import('@app/modules/home'));
const IntakeForm = lazy(() => import('@app/modules/home/intakeform'));
const SymptomAnalysisHome = lazy(
    () => import('@app/modules/home/symptomanalysis-home'),
);
const SymptomAnalysis = lazy(
    () => import('@app/modules/home/symptomanalysis-typeform'),
);
const Orders = lazy(() => import('@app/modules/orders'));
const Summary = lazy(() => import('@app/modules/orders/summary'));
const PhasesCare = lazy(() => import('@app/modules/phases-care'));
const PostSurvey = lazy(() => import('@app/modules/post-survey'));
const PostSurveyQuestionsTypeForm = lazy(() =>
  import('@app/modules/post-survey/post-survey-typeform'));
const PreSurvey = lazy(() => import('@app/modules/pre-survey'));
const PreSurveyQuestionsTypeForm = lazy(() =>
  import('@app/modules/pre-survey/pre-survey-typeform'));
const Profile = lazy(() => import('@app/modules/profile'));
const AccountInformation = lazy(() =>
  import('@app/modules/profile/account-information'));
const BillingHistory = lazy(() =>
  import('@app/modules/profile/billing-history'));
const BillingInvoice = lazy(() =>
  import('@app/modules/profile/billing-invoice'));
const ChangePassword = lazy(() =>
  import('@app/modules/profile/change-password'));
const Healthriskform = lazy(() =>
  import('@app/modules/health-risk-form/component/Healthform-new'));
const ContactUs = lazy(() => import('@app/modules/profile/contact-us'));
const ProfileMenu = lazy(() => import('@app/modules/profile/profile-menu'));
const Recommendations = lazy(() => import('@app/modules/recommendations'));
const Address = lazy(() => import('@app/modules/address'));
const Tests = lazy(() => import('@app/modules/tests'));
const Appointments = lazy(() => import('@app/modules/appointments'));
const BookAppointment = lazy(() => import('@app/modules/book-appointment'));
const Cart = lazy(() => import('@app/modules/cart'));
// const ChatWin = lazy(() => import('@app/modules/chat'));
const healthJourney = lazy(() => import('@app/modules/health-journey'));
const HealthPlan = lazy(() => import('@app/modules/health-plan'));
const CareTeam = lazy(() => import('@app/modules/home/care-team'));
const IntakeHome = lazy(() => import('@app/modules/home/intake-home'));
const Error = lazy(() => import('@app/modules/Error/Error'));
const EndOfCare=lazy(() => import('@app/modules/end of care/end-of-care'));
const TimeLine = lazy(() => import('@app/modules/timelinequiz/timeline'));
const Rootcause=lazy(()=>
  import('@app/modules/assessment-rootcause/rootcause-assessment'));
const Root = lazy(() => import('@app/modules/home/root-cause'));
const RootCauseCare = lazy(() =>
  import('@app/modules/end of care/rootcause-care'));
const RootQuestionsTypeForm =
lazy(() => import('@app/modules/assessment-rootcause/root-questions-typeform'));
const TimelineQuestionsTypeForm =
lazy(() => import('@app/modules/timelinequiz/timeline-questions-typeform'));
const FilterQuitz=lazy(()=>
  import('@app/modules/health-risk-form/component/Quitz'));
const QuitzScreen=lazy(()=>
  import('@app/modules/health-risk-form/component/questionScreen'));
const Optionimage=lazy(()=>
  import('@app/modules/health-risk-form/component/Imagequestion'));
const FormHeader=lazy(()=>
  import('@app/modules/health-risk-form/component/FormHeader'));
const InflammationHome =
lazy(() => import('@app/modules/home/inflammation-home'));
const ChatScreen =
lazy(() => import('@app/modules/chat/chat-screen'));
const AppointmentMsg =
  lazy(() => import('@app/modules/appointment-message/appointment-message'));

const Startpage=lazy(()=>
  import('@app/modules/health-risk-form/component/QuitzStartpage'));
const Thankyoupage=lazy(()=>
  import('@app/modules/health-risk-form/component/Thankyou-form'));
const LocationDisclaimer=lazy(()=>
  import('@app/modules/sign-up/component/location-disclaimer'));
const ExpectationScreen=lazy(()=>
  import('@app/modules/sign-up/component/expectation-screen'));
const InflammationsPlans=lazy(()=>
  import('@app/modules/recommend-plans/component/inflammation-plans'));
const RootcausePayment=lazy(()=>
  import('@app/modules/add-payment/root-cause-payment'));
const PaymentSuccess=lazy(()=>
  import('@app/components/success-component/success-component'));
const ConfirmationTestKit=lazy(()=>
  import('@app/modules/home/confirmation-testkit'));
const InflamationSample=lazy(()=>
  import('@app/modules/home/inflamation-sample'));
const BookInitialAppointment=lazy(()=>
  import('@app/modules/home/book-appointment'));
const ReceiveReport=lazy(()=>
  import('@app/modules/home/receive-report'));
const BookRootcauseAppointment=lazy(()=>
  import('@app/modules/book-appointment/initail-book-appointment'));
const JumpstartProgram=lazy(()=>
  import('@app/modules/home/jumpstart_program'));
const ComprehensiveProgram=lazy(()=>
  import('@app/modules/home/comprehensive_program'));
const OldSignup=lazy(()=>
  import('@app/modules/sign-up/component/old_sign_up'));
const OldSignIn=lazy(()=>
  import('@app/modules/sign-up/component/old_sign_in'));
const commonRoutes = [
  {
    path: '/',
    component: PlansSignUP,
  },
  {
    path: '/boarding',
    component: BoardingScreen,
  },
  {
    path: '/assesment',
    component: AssesmentQuestions,
  },
  {
    path: '/assesment-questions',
    component: AssesmentQuestionsTypeForm,
  },
  {
    path: '/recommend-plans/:type',
    component: RecommendPlans,
  },
  {
    path: '/sign-up',
    component: PlansSignUP,
  },
  {
    path: '/sign-in',
    component: PlansSignUP,
  },
  // {
  //   path: '/plans-sign-in',
  //   component: PlansSignIn,
  // },
  {
    path: '/plans-sign-up',
    component: OldSignup,
  },
  {
    path: '/plans-sign-in',
    component: OldSignIn,
  },
  {
    path: '/locationscreen',
    component: ExpectationScreen,
  },
  {
    path: '/location',
    component: LocationDisclaimer,
  },
  {
    path: '/plans',
    component: InflammationsPlans,
  },
  {
    path: '/recoverypassword/:id/:type',
    component: CreatePassword,
  },
  {
    path: '/verifyemail/:id',
    component: VerifyEmail,
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
  },
  {
    path: '/add-payment',
    component: AddPayment,
  },
  {
    path: '/rootcause-payment',
    component: RootcausePayment,
  },
  {
    path: '/payment-success',
    component: PaymentSuccess,
  },
  {
    path: '/order-payment',
    component: OrderPayment,
  },
  {
    path: '/plan-journey',
    component: PlanJourney,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/home/:status',
    component: Home,
  },
  {
    path: '/intake-form',
    component: IntakeForm,
  },
  {
    path: '/symptom-analysis',
    component: SymptomAnalysis,
  },
  {
    path: '/intake-home',
    component: IntakeHome,
  },
  {
    path: '/symptom-home',
    component: SymptomAnalysisHome,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/profile-menu',
    component: ProfileMenu,
  },
  {
    path: '/account-info',
    component: AccountInformation,
  },
  {
    path: '/change-password',
    component: ChangePassword,
  },
  {
    path: '/book-appointment',
    component: BookAppointment,
  },
  {
    path: '/book-appointment/:id',
    component: BookAppointment,
  },
  {
    path: '/appointments',
    component: Appointments,
  },
  {
    path: '/appointments',
    component: Appointments,
  },
  {
    path: '/phases-care',
    component: PhasesCare,
  },
  {
    path: '/health-plan',
    component: HealthPlan,
  },
  {
    path: '/care-team',
    component: CareTeam,
  },
  {
    path: '/billing-history',
    component: BillingHistory,
  },
  {
    path: '/pre-survey/:id',
    component: PreSurvey,
  },
  {
    path: '/pre-survey-questions/:id',
    component: PreSurveyQuestionsTypeForm,
  },
  {
    path: '/post-survey/:id',
    component: PostSurvey,
  },
  {
    path: '/post-survey-questions/:id',
    component: PostSurveyQuestionsTypeForm,
  },
  {
    path: '/billing-invoice/:id',
    component: BillingInvoice,
  },
  {
    path: '/health-journey',
    component: healthJourney,
  },
  {
    path: '/recommendations',
    component: Recommendations,
  },
  {
    path: '/tests',
    component: Tests,
  },
  {
    path: '/orders',
    component: Orders,
  },
  {
    path: '/orders/:tab',
    component: Orders,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/address/:id/:price',
    component: Address,
  },
  {
    path: '/summary/:id',
    component: Summary,
  },
  {
    path: '/contact-us',
    component: ContactUs,
  },
  {
    path: '/open-chat',
    component: ChatWin,
  },
  {
    path: '/chat-screen',
    component: ChatScreen,
  },
  {
    path: '/health-spectrum',
    component: Healthriskform,
  },
  {
    path: '/extendplans',
    component: EndOfCare,
  },
  {
    path: '/jumpstart-program',
    component: JumpstartProgram,
  },
  {
    path: '/comprehensive-program',
    component: ComprehensiveProgram,
  },
  {
    path: '/timeline-quiz',
    component: TimeLine,
  },
  {
    path: '/timeline-quiz-questions',
    component: TimelineQuestionsTypeForm,
  },
  {
    path: '/rootcause-assessment',
    component: Rootcause,
  },
  {
    path: '/rootcause-assessment-questions',
    component: RootQuestionsTypeForm,
  },
  {
    path: '/confirmation-testkit',
    component: ConfirmationTestKit,
  },
  {
    path: '/receive-report',
    component: ReceiveReport,
  },
  {
    path: '/inflammation-sample',
    component: InflamationSample,
  },
  {
    path: '/book-initial-appointment',
    component: BookInitialAppointment,
  },
  {
    path: '/rootcause-appointment',
    component: BookRootcauseAppointment,
  },
  {
    path: '/rootcause-home',
    component: Root,
  },
  {
    path: '/rootcause-home/:status',
    component: Root,
  },
  {
    path: '/root-cause-care-options',
    component: RootCauseCare,
  },
  {
    path: '/inflammation-home',
    component: InflammationHome,
  },
  {
    path: '*',
    component: Error,
  },
  {
    path: '/filtering-quiz',
    component: FilterQuitz,
  },
  {
    path: '/questions-screen',
    component: QuitzScreen,
  },
  {
    path: '/options-image',
    component: Optionimage,
  },
  {
    path: '/Form-header',
    component: FormHeader,
  },
  {
    path: '/health-spectrum-start',
    component: Startpage,
  },
  {
    path: '/health-spectrum-end',
    component: Thankyoupage,
  },
  {
    path: '/chat-end',
    component: ChatScreen,
  },
  {
    path: '/appointment-messages',
    component: AppointmentMsg,
  },
];


/**
 * Renders Component.
 * routes are mapped here.
 * @return {Routes} and bind the components
 */
export default function RoutesGrit() {
  const allRoutes = [...commonRoutes];
  return (
    <>
      <BrowserRouter basename={process.env.REACT_APP_HOMEPAGE}>
        <Suspense
          fallback={
            <Loader>
              <Spinner size="6px" />
            </Loader>
          }
        >
          <Routes>
            {allRoutes.map((route, i: number) => (
              <Route path={route.path} key={i} element={<route.component />} />
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
