import React from 'react';
import {AutoimmuneInflammation, DigestiveHealth, Fertility, HeaderLogo,
  Hormonal, Lifestyle, Metabolism, Nutrition, SkinHealth,
  Supplements, Testing, WarningIcon} from './icons';
import Address from './icons/address';
import ArrowBack from './icons/arrow-back';
import ArrowLeft from './icons/arrow-left';
import Bar from './icons/bar';
import Billing from './icons/billing';
import Calendar from './icons/calendar';
import Cart from './icons/cart';
import CartPlus from './icons/cart-plus';
import Chat from './icons/chat';
import Check from './icons/check';
import ChervonLeft from './icons/chervon-left';
import ChervonRight from './icons/chervon-right';
import ChervonBot from './icons/chervonBot';
import ChervonRightN from './icons/chervonrightn';
import ChervonTop from './icons/chervonTop';
import Close from './icons/close';
import Delay from './icons/dealy';
import DeleteIcon from './icons/delete-icon';
import Drop from './icons/drop';
import Email from './icons/email';
import ExtendCare from './icons/extend-care';
import Eye from './icons/eye';
import Goals from './icons/goals';
import Heart from './icons/heart';
import Home from './icons/home';
import Info from './icons/info';
import InTake from './icons/intake';
import InTakeN from './icons/intake-new';
import Lock from './icons/lock';
import Logout from './icons/logout';
import Menu from './icons/menu';
import Minus from './icons/minus';
import Msg from './icons/msg';
import OpenEye from './icons/open-eye';
import Payment from './icons/payment';
import Phone from './icons/phone';
import Plus from './icons/plus';
import Profile from './icons/profile';
import RightArrow from './icons/right-arrow';
import Settings from './icons/settings';
import Shipping from './icons/shipping';
import Star from './icons/star';
import Symptom from './icons/symptom';
import Team from './icons/team';
import Test from './icons/test';
import TestResults from './icons/test-results';
import TestTube from './icons/test-tube';
import User from './icons/user';
import UserCheck from './icons/usercheck';
import Visa from './icons/visa';
import HomeSquare from './icons/home-square';
import RoundCheck from './icons/round-check';
import PadIcon from './icons/pad-icon';
import UsersIcon from './icons/users-icon';
import RoundCheckInactive from './icons/round-check-inactive';
import TextMessage from './icons/text-message';
import TaskCheckIn from './icons/task-checkIn';
import TaskOrder from './icons/task-order';
import TaskResult from './icons/task-result';
import ArrowRightUp from './icons/arrow-rightUp';
import NotificationBellIcon from './icons/notification-bell';
import PlusIcon from './icons/plus-icon';
import Journey from './icons/journey';
import ChevronRightCircled from './icons/chevronrightcircled';
import ChevronRightCircledRed from './icons/chevronrightcircled-red';
import UnderLineArrow from './icons/underlinearrow';
import TestBlack from './icons/testblack';
import TestPad from './icons/testpad';
import file from './icons/file';
import checks from './icons/checks';
import SubTest from './icons/sub-test';
import ComReg from './icons/com-reg';
import CartBlue from './icons/cart-blue';
import Clock from './icons/clock';
import UpArrow from './icons/UpArrow';
import redCross from './icons/red-cross';
import GritwellLogo from './icons/gritwell-logo';
import BackArrow from './icons/back-arrow';
import CheckboxIcon from './icons/checkboxicon';
import EmptyCheckbox from './icons/empty-checkbox';
import CloseIcon from './icons/close-icon';
import CheckMarkIcon from './icons/checkmark-icon';
import EmptyCheckboxIcon from './icons/emptyCheck-icon';
import NewCheckmarkIcon from './icons/new_checkmark';

export const iconNames = {
  autoimmuneInflammation: AutoimmuneInflammation,
  digestivehealth: DigestiveHealth,
  fertility: Fertility,
  headerLogo: HeaderLogo,
  hormonal: Hormonal,
  lifestyle: Lifestyle,
  lifeStyle: Drop,
  metabolism: Metabolism,
  nutrition: Nutrition,
  skinhealth: SkinHealth,
  supplements: Supplements,
  testing: Testing,
  testResults: TestResults,
  backArrow: ArrowBack,
  leftArrow: ArrowLeft,
  rightArrow: RightArrow,
  info: Info,
  close: Close,
  user: User,
  phone: Phone,
  email: Email,
  check: Check,
  heart: Heart,
  lock: Lock,
  eye: Eye,
  openEye: OpenEye,
  msg: Msg,
  star: Star,
  team: Team,
  calendar: Calendar,
  bar: Bar,
  cart: Cart,
  cartblue: CartBlue,
  userCheck: UserCheck,
  inTake: InTake,
  inTakeN: InTakeN,
  deleteIcon: DeleteIcon,
  chat: Chat,
  profile: Profile,
  testResult: TestResults,
  home: Home,
  setings: Settings,
  symptom: Symptom,
  chervonLeft: ChervonLeft,
  chervonRight: ChervonRight,
  chervonRightN: ChervonRightN,
  goals: Goals,
  chervonTop: ChervonTop,
  chervonBot: ChervonBot,
  billing: Billing,
  extendCare: ExtendCare,
  payment: Payment,
  logout: Logout,
  menu: Menu,
  delay: Delay,
  visa: Visa,
  test: Test,
  testTube: TestTube,
  plus: Plus,
  minus: Minus,
  cartPlus: CartPlus,
  shipping: Shipping,
  address: Address,
  homeSquare: HomeSquare,
  roundCheck: RoundCheck,
  padIcon: PadIcon,
  usersIcon: UsersIcon,
  roundCheckInactive: RoundCheckInactive,
  textMessage: TextMessage,
  taskCheckIn: TaskCheckIn,
  taskOrder: TaskOrder,
  taskResult: TaskResult,
  arrowRightUp: ArrowRightUp,
  notificationBellIcon: NotificationBellIcon,
  plusIcon: PlusIcon,
  journey: Journey,
  chevronRightCircled: ChevronRightCircled,
  ChevronRightCircledRed: ChevronRightCircledRed,
  underLineArrow: UnderLineArrow,
  testblack: TestBlack,
  TestPad: TestPad,
  file: file,
  checks: checks,
  subTest: SubTest,
  comReg: ComReg,
  clock: Clock,
  redCross: redCross,
  uparrow: UpArrow,
  gritwellLogo: GritwellLogo,
  backarrow: BackArrow,
  menudoticon: CheckboxIcon,
  emptyCheckbox: EmptyCheckbox,
  closeIcon: CloseIcon,
  checkmarkIcon: CheckMarkIcon,
  emptyCheckboxIcon: EmptyCheckboxIcon,
  newCheckIcon: NewCheckmarkIcon,
  warningicon: WarningIcon,
};
export type IconProps = {
    name: keyof typeof iconNames;
};
/**
 * Renders Component.
 * @param {IconProps} name name of the icon. *
 * @return {Component} The Icons global Component.
 */
export default function Icon({name}: IconProps) {
  const IconComponent = iconNames[name] ? iconNames[name] : Bar;
  return <IconComponent />;
}
