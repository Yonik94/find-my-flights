import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightComponent } from './pages/flight/flight.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { FlightPreviewComponent } from './components/flight-preview/flight-preview.component';
import { FilterComponent } from './components/filter/filter.component';
import { FlightLengthPipe } from './pipes/flightLength/flight-length.pipe';
import { TimePipe } from './pipes/time/time.pipe';
import { SortComponent } from './components/sort/sort.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ModalComponent } from './components/modal/modal.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { SingleFlightComponent } from './pages/single-flight/single-flight.component';
import { FlightMainDetailsComponent } from './components/flight-main-details/flight-main-details.component';
import { FlightAdditionalDetailsComponent } from './components/flight-additional-details/flight-additional-details.component';
@NgModule({
  declarations: [
    AppComponent,
    FlightComponent,
    FlightListComponent,
    FlightPreviewComponent,
    FilterComponent,
    FlightLengthPipe,
    TimePipe,
    SortComponent,
    DatePickerComponent,
    ModalComponent,
    SingleFlightComponent,
    FlightMainDetailsComponent,
    FlightAdditionalDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3030/graphql'
          }),
        };
      },
      deps: [HttpLink]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
