import {Component} from '@angular/core';
import {NavController, Alert, Platform, Toast, Modal, NavParams, ViewController, Storage, LocalStorage} from 'ionic-angular';
import {Http} from "@angular/http";

@Component({
    templateUrl: 'build/pages/home/addcase.html'
})

export class AddCasePage {

    casess:any;
    host:any;
    drugs:any;
    patient:any;
    local: Storage;

    constructor(private navController:NavController,
                private viewController:ViewController,
                private platform:Platform,
                private http:Http,
                private navParams:NavParams) {

        this.local = new Storage(LocalStorage);

        this.casess = {};
        this.casess.drugname = "";
        this.casess.drugroom = "";
        this.drugs = [
            {"drugId": 1, "drugName": "板蓝根", "drugRoom": "A500", "drugUpdateTime": "2016-1-20", "drugBad": "Flase"}
        ];

        this.patient = navParams.get('item');
    }

    onPageWillEnter() {
        this.local.get('host').then((result) => {
            this.host = result;
            this.http.get(this.host + "drug_page.action?pageNum=1")
                .subscribe(data => {
                    console.log(data.json());
                    if (data.json().status == "200") {
                        console.log("200");
                        this.drugs = data.json().drugPageData;
                    } else {
                        console.log("400");
                    }
                }, error => {
                    console.log("500");
                });
        });

    }

    dismiss() {
        this.viewController.dismiss();
    }

    addCase(drug) {
        let addCaseAlert = Alert.create({
            title: '智能药柜APP',
            message: '您确定要为该病人的病例添加' + drug.drugName + '作为治疗药物吗?',
            buttons: [
                {
                    text: '取消',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '确定',
                    handler: () => {
                        this.http.get(this.host + "add_case.action?drugId=" + drug.drugId
                            + "&patientId=" + this.patient.patientId)
                            .subscribe(data => {
                                console.log(data.json());
                                console.log("http://localhost:8080/drug/add_case.action?drugId=" + drug.drugId
                                    + "&patientId=" + this.patient.patientId)
                                if (data.json().status == "200") {
                                    let toastAddCaseOk = Toast.create({
                                        message: '添加成功!',
                                        duration: 3000
                                    });
                                    this.navController.present(toastAddCaseOk);
                                } else {
                                    let toastAddCaseFailed = Toast.create({
                                        message: "对不起，网络连接失败。",
                                        duration: 2000
                                    });
                                    this.navController.present(toastAddCaseFailed);
                                }
                            }, error => {
                                console.log("500");
                            });
                    }
                }
            ]
        });
        this.navController.present(addCaseAlert);
    }
}