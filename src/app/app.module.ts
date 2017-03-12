import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScnPage } from '../pages/scn/scn';
import { UpprofilePage } from '../pages/upprofile/upprofile';
import { ReviewPage } from '../pages/review/review';
import { DownloadPage } from '../pages/download/download';
import { RecordPage } from '../pages/record/record';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { Elastic } from './elastic';
import { AcademicPage } from '../pages/academic/academic';
import { CompanyStudentPage } from '../pages/company-student/company-student';
import { StudentInforPage } from '../pages/student-infor/student-infor';
import { TabPage } from '../pages/tab/tab';
import { TeaSpvsPage } from '../pages/tea-spvs/tea-spvs';
import { TeaComPage } from '../pages/tea-com/tea-com';
import { TeaAssPage } from '../pages/tea-ass/tea-ass';
import { CpnAssPage } from '../pages/cpn-ass/cpn-ass';
import { CpnStdlistPage } from '../pages/cpn-stdlist/cpn-stdlist';
import { AdminAnnouncePage } from '../pages/admin-announce/admin-announce';
import { AdminApprovePage } from '../pages/admin-approve/admin-approve';
import { AdminConfirmPage } from '../pages/admin-confirm/admin-confirm';
import { AdminPinPage } from '../pages/admin-pin/admin-pin';
import { LogoutPage } from '../pages/logout/logout';
import { SignupCompanyPage } from '../pages/signup-company/signup-company';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScnPage,
    UpprofilePage,
    ReviewPage,
    DownloadPage,
    RecordPage,
    LoginPage,
    LogoutPage,
    SignupPage,
    Elastic,
    AcademicPage,
    CompanyStudentPage,
    StudentInforPage,
    TabPage,
    TeaSpvsPage,
    TeaComPage,
    TeaAssPage,
    CpnAssPage,
    CpnStdlistPage,
    AdminAnnouncePage,
    AdminApprovePage,
    AdminConfirmPage,
    AdminPinPage,
    SignupCompanyPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ScnPage,
    UpprofilePage,
    ReviewPage,
    DownloadPage,
    RecordPage,
    LoginPage,
    LogoutPage,
    SignupPage,
    AcademicPage,
    CompanyStudentPage,
    StudentInforPage,
    TabPage,
    TeaSpvsPage,
    TeaComPage,
    TeaAssPage,
    CpnAssPage,
    CpnStdlistPage,
    AdminAnnouncePage,
    AdminApprovePage,
    AdminConfirmPage,
    AdminPinPage,
    SignupCompanyPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
