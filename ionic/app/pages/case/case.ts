import {Component} from '@angular/core';
import {
    NavController,
    Platform,
    Alert,
    Toast,
    NavParams,
    Modal,
    ViewController,
    Storage,
    LocalStorage
} from 'ionic-angular';
import {Http} from "@angular/http";

@Component({
    templateUrl: 'build/pages/case/case.html'
})

export class CasePage {

    host:any;
    casess:any;
    local: Storage;

    constructor(private navController:NavController,
                private viewController:ViewController,
                private platform:Platform,
                private http:Http) {

        this.local = new Storage(LocalStorage);

        this.casess = [
            {"caseId": 1}
        ];
    }

    onPageWillEnter() {
        this.local.get('host').then((result) => {
            this.host = result;

            this.http.get(this.host + "case_page.action?pageNum=1")
                .subscribe(data => {
                    console.log(data.json());
                    if (data.json().status == "200") {
                        console.log("200");
                        this.casess = data.json().casePageData;
                    } else {
                        console.log("400");
                    }
                }, error => {
                    console.log("500");
                });
        });
    }

    itemDeleted(item) {

    }

    itemSelected(item) {
        let wantRoomAlert = Alert.create({
            title: '智能药柜APP',
            message: '您确定要打开' + item.drugName + '的药柜吗?',
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
                        this.http.get(this.host + "want_room.action?drugRoom=" + item.drugRoom)
                            .subscribe(data => {
                                console.log(data.json());
                                if (data.json().status == "200") {
                                    let toastWantRoomOk = Toast.create({
                                        message: '打开成功!',
                                        duration: 3000
                                    });
                                    this.navController.present(toastWantRoomOk);
                                } else {
                                    let toastWantRoomFailed = Toast.create({
                                        message: "对不起，网络连接失败。",
                                        duration: 2000
                                    });
                                    this.navController.present(toastWantRoomFailed);
                                }
                            }, error => {
                                console.log("500");
                            });
                    }
                }
            ]
        });
        this.navController.present(wantRoomAlert);
    }
}
