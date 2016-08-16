import {Component} from '@angular/core';
import {NavController, Toast, Platform, Modal, ViewController, Storage, LocalStorage} from 'ionic-angular';
import {Http} from "@angular/http";

@Component({
    templateUrl: 'build/pages/drug/adddrug.html'
})

export class AddDrugPage {

    host:any;
    drug:any;
    local: Storage;

    constructor(private navController:NavController,
                private viewController:ViewController,
                private platform:Platform,
                private http:Http) {

        this.local = new Storage(LocalStorage);

        this.drug = {};
        this.drug.drugname = "";
        this.drug.drugroom = "";

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
        this.http.get(this.host + "add_drug.action?drugName=" + this.drug.drugname
            + "&drugRoom=" + this.drug.drugroom)
            .subscribe(data => {
                console.log(data.json());
                if (data.json().status == "200") {
                    let toastAddDrugOk = Toast.create({
                        message: '药品添加成功!',
                        duration: 3000
                    });
                    this.navController.present(toastAddDrugOk);
                } else {
                    let toastAddDrugFailed = Toast.create({
                        message: "对不起，网络连接失败。",
                        duration: 2000
                    });
                    this.navController.present(toastAddDrugFailed);
                }
            }, error => {
                console.log("500");
            });
    }
}