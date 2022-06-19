import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { SignupComponent } from './components/signup/signup.component';
import { AddCoursesComponent } from './components/add-courses/add-courses.component';
import { TutorsComponent } from './components/tutors/tutors.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AdminComponent } from './components/admin/admin.component';
import { SearchEventComponent } from './components/search-event/search-event.component';
import { CoursesInfoComponent } from './components/courses-info/courses-info.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { SignUpTutorComponent } from './components/sign-up-tutor/sign-up-tutor.component';
import { SignUpAdminComponent } from './components/sign-up-admin/sign-up-admin.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { PasswordComponent } from './components/password/password.component';
import { ContactComponent } from './components/contact/contact.component';
import { WeatherSearchComponent } from './components/weather-search/weather-search.component';








const routes: Routes = [
  {path:'', component:HomeComponent,},
  {path:'search', component:SearchSectionComponent,},
  {path:'welcome', component:WelcomeComponent,},
  {path:'courses', component:CoursesComponent,},
  {path:'mycourses', component:CoursesComponent,},
  {path:'myStudents', component:CoursesComponent,},
  {path:'subscribtions', component:SubscribtionsComponent,},
  {path:'events', component:EventsComponent,},
  {path:'EventInfo/:id', component:EventsComponent,},
  {path:'searchEvent', component:EventsComponent,},
  {path:'myEvent', component:EventsComponent,},
  {path:'bestTutor', component:BestTutorsComponent,},
  {path:'news', component:NewsComponent,},
  {path:'login', component:LoginComponent,},
 // {path:'signup', component:SignupComponent,},
 // {path:'signUpTutor', component:SignupComponent,},
  {path:'addCourse', component:AddCoursesComponent,},
  {path:'editCourse/:id', component:AddCoursesComponent,},
  {path:'tutors', component:TutorsComponent,},
  {path:'tutorInfo/:id', component:TutorsComponent,},
  {path:'admin/addEvent', component:AddEventComponent,},//le meme componant que edit
  {path:'editEvent/:id', component:AddEventComponent,},//le meme componant que add
  {path:'admin', component:AdminComponent,},
  {path:'searchEvents', component:SearchEventComponent,},
  {path:'coursesInfo/:id', component:CoursesInfoComponent,},
 // {path:'userInfo/:id', component:TutorsComponent,},
  {path:'userInfo/:id', component:UserInfoComponent,},
  {path:'editUser/:id', component:UsersTableComponent,},
  
  {path:'signUpTutor', component:SignUpTutorComponent,},
  {path:'editProfile/:id', component:SignUpTutorComponent,},
  {path:'signup', component:SignUpTutorComponent,},
  {path:'signUpAdmin', component:SignUpAdminComponent,},
  {path:'editPassword/:id', component:PasswordComponent,},
  {path:'contact', component:ContactComponent,},
  {path:'weather', component:WeatherSearchComponent,},

  

  {path:'**', component:NotFoundComponent,},


 // {path:'tutors', component:FooterComponent,},
//  {path:'aaa', component:TutorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
 // declarations: []
})
export class AppRoutingModule { }
