import {Component} from '@angular/core';
import {NavController, Toast, Platform, Modal, ViewController, Storage, LocalStorage} from 'ionic-angular';
import {Http} from "@angular/http";

@Component({
    templateUrl: 'build/pages/home/addpatient.html'
})

export class AddPatientPage {

    host:any;
    patient;
    local: Storage;

    constructor(private navController:NavController,
                private viewController:ViewController,
                private platform:Platform,
                private http:Http) {

        this.local = new Storage(LocalStorage);

        this.patient = {};
        this.patient.patientname = "";
        this.patient.patientphone = "";
        this.patient.patientnote = "";

    }

    onPageWillEnter() {
        this.local.get('host').then((result) => {
            this.host = result;
        });
    }

    dismiss() {
        this.viewController.dismiss();
    }

    register() {
        this.http.get(this.host + "add_patient.action?patientName=" + this.patient.patientname
            + "&patientPhone=" + this.patient.patientphone + "&patientNote=" + this.patient.patientnote)
            .subscribe(data => {
                console.log(data.json());
                if (data.json().status == "200") {
                    let toastAddPatientOk = Toast.create({
                        message: '病人添加成功!',
                        duration: 3000
                    });
                    this.navController.present(toastAddPatientOk);
                } else {
                    let toastAddPatientFailed = Toast.create({
                        message: "对不起，网络连接失败。",
                        duration: 2000
                    });
                    this.navController.present(toastAddPatientFailed);
                }
            }, error => {
                console.log("500");
            });
    }
}