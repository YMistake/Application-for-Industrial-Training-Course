import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScnPage } from '../pages/scn/scn';
import { UpprofilePage } from '../pages/upprofile/upprofile';
import { Upprofile2Page } from '../pages/upprofile2/upprofile2';
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
import { AdminApproveHistoryPage } from '../pages/admin-approve-history/admin-approve-history';
import { AdminChangeStatusPage } from '../pages/admin-change-status/admin-change-status';
import { AdminChangeStatus2Page } from '../pages/admin-change-status2/admin-change-status2';
import { AdminPinPage } from '../pages/admin-pin/admin-pin';
import { LogoutPage } from '../pages/logout/logout';
import { SignupCompanyPage } from '../pages/signup-company/signup-company';
import { AdminAssignCompanyPage } from '../pages/admin-assign-company/admin-assign-company';
import { AdminAssignCompanySelectPage } from '../pages/admin-assign-company-select/admin-assign-company-select';
import { AssignmentHistoryPage } from '../pages/assignment-history/assignment-history';
import { AdminSetyearPage } from '../pages/admin-setyear/admin-setyear';
import { NewsPage } from '../pages/news/news';
import { UploadfilePage } from '../pages/uploadfile/uploadfile';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScnPage,
    UpprofilePage,
    Upprofile2Page,
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
    AdminApproveHistoryPage,
    AdminChangeStatusPage,
    AdminChangeStatus2Page,
    AdminPinPage,
    SignupCompanyPage,
    AdminAssignCompanyPage,
    AdminAssignCompanySelectPage,
    AssignmentHistoryPage,
    AdminSetyearPage,
    NewsPage,
    UploadfilePage
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
    Upprofile2Page,
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
    AdminApproveHistoryPage,
    AdminPinPage,
    SignupCompanyPage,
    AdminAssignCompanyPage,
    AdminAssignCompanySelectPage,
    AdminChangeStatusPage,
    AdminChangeStatus2Page,
    AssignmentHistoryPage,
    AdminSetyearPage,
    NewsPage,
    UploadfilePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, FileChooser, File]
})
export class AppModule {}
