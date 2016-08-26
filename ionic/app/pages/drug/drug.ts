import {Component} from '@angular/core';
import {NavController, Platform, NavParams, Modal, ViewController, Storage, LocalStorage} from 'ionic-angular';
import {AddDrugPage} from '../drug/adddrug';
import {Http} from "@angular/http";

@Component({
    templateUrl: 'build/pages/drug/drug.html'
})
export class DrugPage {

    host:any;
    drugs:any;
    local: Storage;

    constructor(private navController:NavController,
                private viewController:ViewController,
                private platform:Platform,
                private http:Http) {

        this.local = new Storage(LocalStorage);

        this.drugs = [
            {"drugId": 1, "drugName": "板蓝根", "drugRoom": "A500", "drugUpdateTime": "2016-1-20", "drugBad": "false", "drugBadBad": "false"}
        ];
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

    addDrug() {
        let modalAddDrugPage = Modal.create(AddDrugPage);
        this.navController.present(modalAddDrugPage);
    }

    wantRoom(drug) {
        this.http.get(this.host + "want_room.action?drugRoom=" + drug.drugRoom)
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
    }

    updateRoom(drug) {
        this.http.get(this.host + "update_room.action?drugId=" + drug.drugId)
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
    }
}
