import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  ViewEncapsulation
} from "@angular/core";
import {
  SchedulerComponent,
  SchedulerEvent,
  SchedulerViews,
  Scheduler
} from "@smart-webcomponents-angular/scheduler";
import { Window, WindowComponent } from "@smart-webcomponents-angular/window";
import {
  DateTimePicker,
  DateTimePickerComponent
} from "@smart-webcomponents-angular/datetimepicker";
import { DropDownListComponent } from "@smart-webcomponents-angular/dropdownlist";
import { SwitchButtonComponent } from "@smart-webcomponents-angular/switchbutton";
import { ButtonComponent } from "@smart-webcomponents-angular/button";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild("scheduler", { read: SchedulerComponent, static: false })
  scheduler!: SchedulerComponent;
  @ViewChild("editingWindow", { read: WindowComponent, static: false })
  editingWindow!: WindowComponent;
  @ViewChild("dateStart", { read: DateTimePickerComponent, static: false })
  dateStart!: DateTimePickerComponent;
  @ViewChild("dateEnd", { read: DateTimePickerComponent, static: false })
  dateEnd!: DateTimePickerComponent;
  @ViewChild("timeOff", { read: SwitchButtonComponent, static: false })
  timeOff!: SwitchButtonComponent;
  @ViewChild("serviceInput", { read: DropDownListComponent, static: false })
  serviceInput!: DropDownListComponent;
  @ViewChild("locationInput", { read: DropDownListComponent, static: false })
  locationInput!: DropDownListComponent;
  @ViewChild("clientInput", { read: DropDownListComponent, static: false })
  clientInput!: DropDownListComponent;
  @ViewChild("staffInput", { read: DropDownListComponent, static: false })
  staffInput!: DropDownListComponent;
  @ViewChild("walkIn", { read: SwitchButtonComponent, static: false })
  walkIn!: SwitchButtonComponent;
  @ViewChild("repeat", { read: SwitchButtonComponent, static: false })
  repeat!: SwitchButtonComponent;
  @ViewChild("repeatFreqInput", { read: DropDownListComponent, static: false })
  repeatFreqInput!: DropDownListComponent;
  @ViewChild("cancelBtn", { read: ButtonComponent, static: false })
  cancelBtn!: ButtonComponent;
  @ViewChild("submitBtn", { read: ButtonComponent, static: false })
  submitBtn!: ButtonComponent;

  dataSource: any = (() => {
    const today = new Date(),
      currentYear = today.getFullYear(),
      currentMonth = today.getMonth();

    return [
      {
        label: "World Climate Changes",
        dateStart: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 3,
          12,
          0,
          0
        ),
        dateEnd: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 3,
          15,
          30,
          0
        ),
        staff: "Staff 1",
        service: "Service 1",
        location: "Location 1",
        client: "Client 1",
        timeOff: false,
        walkIn: true,
        backgroundColor: "#F4511E",
        repeat: {
          repeatFreq: "daily",
          repeatInterval: 2,
          repeatEnd: 10
        }
      },
      {
        label: "Technologies",
        dateStart: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 1,
          10,
          0,
          0
        ),
        dateEnd: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 1,
          12,
          0,
          0
        ),
        staff: "Staff 1",
        service: "Service 1",
        location: "Location 1",
        client: "Client 1",
        timeOff: false,
        walkIn: true,
        backgroundColor: "#7986CB",
        repeat: {
          repeatFreq: "monthly",
          repeatInterval: 1,
          repeatOn: today.getDate()
        }
      },
      {
        label: "Company Strategy",
        dateStart: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          6,
          0,
          0
        ),
        dateEnd: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          22,
          30,
          0
        ),
        allDay: true,
        staff: "Staff 1",
        service: "Service 1",
        location: "Location 1",
        client: "Client 1",
        timeOff: false,
        walkIn: true,
        backgroundColor: "#039BE5"
      },
      {
        label: "Marketing",
        dateStart: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          6,
          0,
          0
        ),
        dateEnd: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          22,
          0,
          0
        ),
        staff: "Staff 1",
        service: "Service 1",
        location: "Location 1",
        client: "Client 1",
        timeOff: false,
        walkIn: true,
        backgroundColor: "#8E24AA"
      },
      {
        label: "Workflow",
        dateStart: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          8,
          0,
          0
        ),
        dateEnd: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          18,
          0,
          0
        ),
        staff: "Staff 1",
        service: "Service 1",
        location: "Location 1",
        client: "Client 1",
        timeOff: false,
        walkIn: true
      }
    ];
  })();

  view: string = "month";

  views: SchedulerViews | undefined[] = [];

  firstDayOfWeek: number = 1;

  updating: boolean = false;

  itemInUpdate: any = undefined;

  heading: string = "Add Appointment";

  subHeading: string = "Create an appointment or time-off";

  serviceDataSource = [
    { label: "Service 1", value: "Service 1" },
    { label: "Service 2", value: "Service 2" }
  ];

  locationDataSource = [
    { label: "Location 1", value: "Location 1" },
    { label: "Location 2", value: "Location 2" }
  ];

  clientDataSource = [
    { label: "Client 1", value: "Client 1" },
    { label: "Client 2", value: "Client 2" }
  ];

  staffDataSource = [
    { label: "Staff 1", value: "Staff 1" },
    { label: "Staff 2", value: "Staff 2" }
  ];

  ngOnInit(): void {
    // onInit code.
  }

  ngAfterViewInit(): void {
    // afterViewInit code.
    this.init();
  }

  repeatChange(event: any) {
    const checked = event.detail.value;
    const element = this.editingWindow.nativeElement.querySelector(
      "#repeat-editor"
    ) as HTMLElement;
    if (checked) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    this.setRepeatEditor("daily");
  }

  repeatFreqChange(event: any) {
    let selectedValue = event.detail.value.toLowerCase();
    this.setRepeatEditor(selectedValue);
  }

  setRepeatEditor(type: any) {
    const window = this.editingWindow.nativeElement.querySelector(
      "#repeat-editors"
    );
    window!.innerHTML = "";
    const repeatFreqEditor = document.createElement("div");
    const repeatFreqLabel = document.createElement("div");
    let word;
    switch (type) {
      case "hourly":
        word = "hours";
        break;
      case "daily":
        word = "days";
        break;
      case "weekly":
        word = "weeks";
        break;
      case "monthly":
        word = "months";
        break;
      case "yearly":
        word = "years";
        break;
    }
    repeatFreqLabel.innerHTML = `Repeat every (${word})`;
    repeatFreqEditor.appendChild(repeatFreqLabel);
    const repeatInterval = document.createElement("smart-number-input");
    repeatInterval.id = "repeatInterval";
    repeatInterval.min = 1;
    repeatFreqEditor.appendChild(repeatInterval);

    window!.appendChild(repeatFreqEditor);

    if (type === "weekly" || type === "monthly" || type === "yearly") {
      const repeatOnEditor = document.createElement("div");
      const repeatOnLabel = document.createElement("label");
      repeatOnLabel.innerHTML = "Repeat on ";
      repeatOnEditor.appendChild(repeatOnLabel);
      if (type === "weekly") {
        const repeatOn = document.createElement("smart-button-group");
        repeatOn.id = "repeatOn";
        repeatOn["selectionMode"] = "zeroOrMany";
        repeatOn.dataSource = [
          { label: "Mon", value: "1" },
          { label: "Tue", value: "2" },
          { label: "Wed", value: "3" },
          { label: "Thu", value: "4" },
          { label: "Fri", value: "5" },
          { label: "Sat", value: "6" },
          { label: "Sun", value: "0" }
        ];
        repeatOnEditor.appendChild(repeatOn);
      } else if (type === "monthly") {
        const repeatOn = document.createElement("smart-number-input");
        repeatOn.id = "repeatOn";
        repeatOn.min = 1;
        repeatOn.max = 31;
        repeatOnEditor.appendChild(repeatOn);
      } else if (type === "yearly") {
        repeatOnEditor.style.display = "flex";
        repeatOnEditor.style.alignItems = "center";
        const repeatOn = document.createElement("smart-drop-down-list");
        repeatOn.id = "repeatOn";
        repeatOn.dataSource = [
          { label: "January", value: "0" },
          { label: "February", value: "1" },
          { label: "March", value: "2" },
          { label: "April", value: "3" },
          { label: "May", value: "4" },
          { label: "June", value: "5" },
          { label: "July", value: "6" },
          { label: "August", value: "7" },
          { label: "September", value: "8" },
          { label: "October", value: "9" },
          { label: "November", value: "10" },
          { label: "December", value: "11" }
        ];
        repeatOnEditor.appendChild(repeatOn);
        const repeatOnDay = document.createElement("smart-number-input");
        repeatOnDay.id = "repeatOnDay";
        repeatOnDay.min = 1;
        repeatOnDay.max = 31;
        repeatOnEditor.appendChild(repeatOnDay);
      }

      window!.appendChild(repeatOnEditor);
    }
    const endRepeatEditor = document.createElement("div");
    const endRepeatLabel = document.createElement("div");
    endRepeatLabel.innerHTML = "End repeat";
    endRepeatEditor.appendChild(endRepeatLabel);
    const neverWrapper = document.createElement("div");
    neverWrapper.classList.add("radio-button-wrapper");
    neverWrapper.innerHTML =
      "<smart-radio-button group-name='repeat' id='never' checked>Never</smart-radio-button>";
    endRepeatEditor.appendChild(neverWrapper);
    const onWrapper = document.createElement("div");
    onWrapper.classList.add("radio-button-wrapper");
    onWrapper.innerHTML = `<smart-radio-button group-name='repeat' id='on'>On</smart-radio-button>
      <smart-date-time-picker id='dateOfRepeat' formatString="dd MM yyyy" calendar-button drop-down-append-to="body" disabled></smart-date-time-picker>`;
    endRepeatEditor.appendChild(onWrapper);
    const afterWrapper = document.createElement("div");
    afterWrapper.classList.add("radio-button-wrapper");
    afterWrapper.innerHTML =
      "<smart-radio-button group-name='repeat' id='after'>After</smart-radio-button><smart-number-input id='repeatAfter' min='1' disabled></smart-number-input>occurrences";
    endRepeatEditor.appendChild(afterWrapper);
    Array.from(endRepeatEditor.querySelectorAll("smart-radio-button")).forEach(
      (button: any) => {
        button.addEventListener("checkValue", (event: any) => {
          const target = event.target;
          //disable the other inputs
          if (target.id === "never") {
            (onWrapper.querySelector(
              "smart-date-time-picker"
            ) as any).disabled = true;
            (afterWrapper.querySelector(
              "smart-number-input"
            ) as any).disabled = true;
          } else if (target.id === "on") {
            (onWrapper.querySelector(
              "smart-date-time-picker"
            ) as any).disabled = false;
            (afterWrapper.querySelector(
              "smart-number-input"
            ) as any).disabled = true;
          } else if (target.id === "after") {
            (onWrapper.querySelector(
              "smart-date-time-picker"
            ) as any).disabled = true;
            (afterWrapper.querySelector(
              "smart-number-input"
            ) as any).disabled = false;
          }
        });
      }
    );
    window!.appendChild(endRepeatEditor);
  }

  FillWindowContent = (item: any) => {
    this.itemInUpdate = item;
    this.updating = true;
    this.heading = "Edit Appointment";
    this.subHeading = "";
    this.dateStart.setDate(item.dateStart);
    this.dateEnd.setDate(item.dateEnd);
    this.timeOff.checked = item.timeOff;
    this.serviceInput.selectedValues = [item.service];
    this.locationInput.selectedValues = [item.location];
    this.clientInput.selectedValues = [item.client];
    this.staffInput.selectedValues = [item.staff];
    this.walkIn.checked = item.walkIn;
    if (item.repeat) {
      this.repeat.checked = true;
      this.repeatFreqInput.selectedValues = [
        item.repeat.repeatFreq[0].toUpperCase() +
          item.repeat.repeatFreq.substring(1)
      ];
      setTimeout(() => {
        this.setRepeatEditor(item.repeat.repeatFreq);
        this.fillRepeatEditors(item.repeat);
      });
    }
  };

  fillRepeatEditors = (repeat: any) => {
    if (repeat.repeatInterval) {
      (document.querySelector("#repeatInterval") as any)!.value =
        repeat.repeatInterval;
    }

    if (repeat.repeatOn) {
      if (repeat.repeatFreq === "weekly") {
        (document.querySelector(
          "#repeatOn"
        ) as any)!.selectedValues = repeat.repeatOn.map((day: number) =>
          day.toString()
        );
      } else if (repeat.repeatFreq === "monthly") {
        (document.querySelector("#repeatOn") as any)!.value = repeat.repeatOn;
      } else if (repeat.repeatFreq === "yearly") {
        if (repeat.repeatOn instanceof Date) {
          (document.querySelector("#repeatOn") as any)!.selectedIndexes = [
            repeat.repeatOn.getMonth()
          ];
          (document.querySelector(
            "#repeatOnDay"
          ) as any)!.value = repeat.repeatOn.getDate();
        } else {
          (document.querySelector("#repeatOn") as any)!.selectedValue =
            repeat.repeatOn.month;
          (document.querySelector("#repeatOnDay") as any)!.value =
            repeat.repeatOn.date;
        }
      }
    }

    if (repeat.repeatEnd) {
      if (typeof repeat.repeatEnd === "number") {
        (document.querySelector("#repeatAfter") as any)!.value =
          repeat.repeatEnd;
        (document.querySelector("#after") as any)!.checked = true;
      } else if (repeat.repeatEnd instanceof Date) {
        let dateTimePicker = document.querySelector(
          "#dateOfRepeat"
        ) as DateTimePicker;
        dateTimePicker.setDate(repeat.repeatEnd);
        (document.querySelector("#on") as any)!.checked = true;
      }
    } else {
      (document.querySelector("#never") as any)!.checked = true;
    }
  };

  getRepeatData = (item: any) => {
    const repeat: any = {
      repeatFreq: this.repeatFreqInput.value[0].value.toLowerCase(),
      repeatInterval: parseInt(
        (document.querySelector("#repeatInterval") as any)!.value
      )
    };

    if (repeat.repeatFreq === "weekly") {
      repeat.repeatOn = (document.querySelector(
        "#repeatOn"
      ) as any)!.selectedValues.map((day: string) => parseInt(day));
    } else if (repeat.repeatFreq === "monthly") {
      repeat.repeatOn = parseInt(
        (document.querySelector("#repeatOn") as any)!.value
      );
    } else if (repeat.repeatFreq === "yearly") {
      repeat.repeatOn = {
        month: (document.querySelector("#repeatOn") as any)!.selectedValue,
        day: (document.querySelector("#repeatOnDay") as any)!.value
      };
    }

    if ((document.querySelector("#never") as any)!.checked) {
      repeat.repeatEnd = null;
    } else if ((document.querySelector("#on") as any)!.checked) {
      repeat.repeatEnd = (document.querySelector(
        "#dateOfRepeat"
      ) as any)!.getDate();
    } else if ((document.querySelector("#after") as any)!.checked) {
      repeat.repeatEnd = parseInt(
        (document.querySelector("#repeatAfter") as any)!.value
      );
    }
    if (item) {
      item.repeat = repeat;
    }
  };

  resetWindowContent = (dateStart: any = null, dateEnd: any = null) => {
    this.itemInUpdate = undefined;
    this.updating = true;
    this.heading = "Create Appointment";
    this.subHeading = "Create an appointment or time-off";
    this.dateStart.value = dateStart || new Date();
    this.dateEnd.value = dateEnd || new Date();
    this.timeOff.checked = false;
    this.serviceInput.selectedIndexes = [0];
    this.locationInput.selectedIndexes = [0];
    this.clientInput.selectedIndexes = [0];
    this.staffInput.selectedIndexes = [0];
    this.walkIn.checked = false;
    this.repeat.checked = false;
    this.repeatFreqInput.selectedIndexes = [1];
  };

  init(): void {
    // init code.
    this.resetWindowContent();
    this.scheduler.addEventListener("editDialogOpening", (event: any) => {
      const detail = event.detail,
        target = detail.target,
        item = detail.item,
        type = detail.type,
        eventObj = detail.eventObj;
      //Prevent default window from opening
      event.preventDefault();
      //Check if this is new Event or Update operation
      let isUpdate = item.label !== undefined;
      //Send info to other components
      if (isUpdate) {
        this.FillWindowContent(item);
      } else {
        this.resetWindowContent(item.dateStart, item.dateEnd);
      }
      this.editingWindow.open();
    });
    this.submitBtn.addEventListener("click", async () => {
      let updatedItem: any = {
        label: this.itemInUpdate?.label || "New Event",
        backgroundColor: this.itemInUpdate?.backgroundColor || "",
        dateStart: await this.dateStart.getDate(),
        dateEnd: await this.dateEnd.getDate(),
        timeOff: this.timeOff.checked,
        service: this.serviceInput.selectedValues[0],
        location: this.locationInput.selectedValues[0],
        client: this.clientInput.selectedValues[0],
        staff: this.staffInput.selectedValues[0]
      };
      if (this.repeat.checked) {
        this.getRepeatData(updatedItem);
      }
      if (this.itemInUpdate) {
        const index = this.scheduler.events.findIndex((item) => {
          return (
            item.label === this.itemInUpdate.label &&
            item.dateStart?.valueOf() ===
              this.itemInUpdate.dateStart.valueOf() &&
            item.dateEnd?.valueOf() === this.itemInUpdate.dateEnd.valueOf()
          );
        });
        console.log(this.itemInUpdate.repeat, updatedItem.repeat);
        this.scheduler.updateEvent(index, updatedItem);
      } else {
        this.scheduler.addEvent(updatedItem);
      }

      this.editingWindow.close();
    });

    this.cancelBtn.addEventListener("click", () => {
      this.editingWindow.close();
    });
  }
}
