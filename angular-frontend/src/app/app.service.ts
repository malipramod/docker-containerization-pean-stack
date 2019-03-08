import { Injectable } from "@angular/core";
import axios from 'axios';
import {APIURL_LOCAL} from './app.constant';

@Injectable()
export class AppService {
    getData(){
        let body ={
            "table":"shipments_data",
            "fields": [
                "shipment_id",
                "source_id",
                "destination_id",
                "date",
                "weight",
                "cost",
                "new_shipment_id",
                "new_weight",
                "new_cost",
                "total_tls"
            ]
        };
        return axios.post(`${APIURL_LOCAL}getdata`,body);
    };
}