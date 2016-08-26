import {Component} from '@angular/core';
import {NavController, Platform, NavParams, Modal, ViewController, Storage, LocalStorage} from 'ionic-angular';
import {AddPatientPage} from '../home/addpatient';
import {AddCasePage} from '../home/addcase';
import {Http} from "@angular/http";

@Component({
    templateUrl: 'build/pages/home/home.html'
})

export class HomePage {

    host:any;
    patients:any;
    local:Storage;

    constructor(private navController:NavController,
                private viewController:ViewController,
                private platform:Platform,
                private http:Http) {

        this.local = new Storage(LocalStorage);

        this.patients = [
            {"patientId": 1, "patientName": "Airing", "patientTime": "2016-6-30"}
        ];

    }

    onPageWillEnter() {

        this.local.get('host').then((result) => {
            this.host = result;
            this.http.get(this.host + "home_page.action?pageNum=1")
                .subscribe(data => {
                    console.log(data.json());
                    if (data.json().status == "200") {
                        console.log("200");
                        this.patients = data.json().patientPageData;
                    } else {
                        console.log("400");
                    }
                }, error => {
                    console.log("500");
                });
        });
    }

    addPatient() {
        let modalAddPatientPage = Modal.create(AddPatientPage);
        this.navController.present(modalAddPatientPage);
    }

    enterCase(patient) {
        this.navController.push(AddCasePage, {
            item: patient
        });
    }

    openRooms(patient) {
        this.local.get('host').then((result) => {
            this.host = result;
            this.http.get(this.host + "patient_room.action?patientId=" + patient.patientId)
                .subscribe(data => {
                    console.log(data.json());
                    if (data.json().status == "200") {
                        console.log("200");
                    } else {
                        console.log("400");
                    }
                }, error => {
                    console.log("500");
                });
        });
    }

}
