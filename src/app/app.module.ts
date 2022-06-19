import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchSectionComponent } from './components/search-section/search-section.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SubscribtionsComponent } from './components/subscribtions/subscribtions.component';
import { EventsComponent } from './components/events/events.component';
import { BestTutorsComponent } from './components/best-tutors/best-tutors.component';
import { NewsComponent } from './components/news/news.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourComponent } from './components/cour/cour.component';
import { EventComponent } from './components/event/event.component';
import { TutorComponent } from './components/tutor/tutor.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { CoursComponent } from './components/cours/cours.component';
import { CoursIntroductionComponent } from './components/cours-introduction/cours-introduction.component';
import { TutorsComponent } from './components/tutors/tutors.component';
import { AddCoursesComponent } from './components/add-courses/add-courses.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AdminComponent } from './components/admin/admin.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { EventsTableComponent } from './components/events-table/events-table.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
//import { SubscribtionsComponent } from './components/subscribtions/subscribtions.component';
import { SubscribeFooterComponent } from './components/subscribe-footer/subscribe-footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { SearchEventComponent } from './components/search-event/search-event.component';
import { CustumFilterPipe } from './pipes/custum-filter.pipe';
import { CoursesInfoComponent } from './components/courses-info/courses-info.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CustumGenderPipe } from './pipes/custum-gender.pipe';
import { CustumPasswordPipe } from './pipes/custum-password.pipe';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { CustumPricePipe } from './pipes/custum-price.pipe';
import { FiltreUniquePipe } from './pipes/filtre-unique.pipe';
import { HttpClientModule } from '@angular/common/http';
import { SignUpTutorComponent } from './components/sign-up-tutor/sign-up-tutor.component';
import { SignUpAdminComponent } from './components/sign-up-admin/sign-up-admin.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { PasswordComponent } from './components/password/password.component';
import { ContactComponent } from './components/contact/contact.component';
import { WeatherSearchComponent } from './components/weather-search/weather-search.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchSectionComponent,
    WelcomeComponent,
    CoursesComponent,
    SubscribtionsComponent,
    EventsComponent,
    BestTutorsComponent,
    NewsComponent,
    FooterComponent,
    CourComponent,
    EventComponent,
    TutorComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CoursComponent,
    CoursIntroductionComponent,
    TutorsComponent,
    AddCoursesComponent,
    AddEventComponent,
    AdminComponent,
    TeachersTableComponent,
    EventsTableComponent,
    CoursesTableComponent,
    SubscribtionsComponent,
    SubscribeFooterComponent,
    BannerComponent,
    SearchEventComponent,
    CustumFilterPipe,
    CoursesInfoComponent,
    UsersTableComponent,
    UserInfoComponent,
    CustumGenderPipe,
    CustumPasswordPipe,
    FilterUserPipe,
    CustumPricePipe,
    FiltreUniquePipe,
    SignUpTutorComponent,
    SignUpAdminComponent,
    PasswordComponent,
    ContactComponent,
    WeatherSearchComponent,
    
  ],
  imports: [
   

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,///module pour la
    NgxPaginationModule,
    JwPaginationModule,
    
    



    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
