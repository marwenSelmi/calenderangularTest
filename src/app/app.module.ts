import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { SchedulerModule } from "@smart-webcomponents-angular/scheduler";
import { WindowModule } from "@smart-webcomponents-angular/window";
import { DateTimePickerModule } from "@smart-webcomponents-angular/datetimepicker";
import { DropDownListModule } from "@smart-webcomponents-angular/dropdownlist";
import { SwitchButtonModule } from "@smart-webcomponents-angular/switchbutton";
import { ButtonModule } from "@smart-webcomponents-angular/button";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SchedulerModule,
    WindowModule,
    DateTimePickerModule,
    DropDownListModule,
    SwitchButtonModule,
    ButtonModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule {}
