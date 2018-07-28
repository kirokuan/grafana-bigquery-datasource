///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from 'lodash';
import {QueryCtrl} from 'app/plugins/sdk';
//import './css/query_editor.css!';

export interface BigQuery {
  refId: string;
  format: string;
  alias: string;
  rawSql: string;
}

export interface QueryMeta {
  sql: string;
}

const defaultQuery = "SELECT * FROM `ds-logging.sms.ds_logging_20180727` LIMIT 1000;";

export class BigQueryQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  showLastQuerySQL: boolean;
  formats: any[];
  query: any;
  lastQueryMeta: QueryMeta;
  lastQueryError: string;
  showHelp: boolean;

  /** @ngInject **/

  constructor($scope, $injector) {
    super($scope, $injector);

    this.target.format = this.target.format || 'time_series';
    this.query= {};
    this.query.alias = '';
    this.formats = [{ text: 'Time series', value: 'time_series' }, { text: 'Table', value: 'table' }];
    
    if (!this.query.rawSql) {
      // special handling when in table panel
      if (this.panelCtrl.panel.type === 'table') {
        this.target.format = 'table';
        this.query.rawSql = 'SELECT 1';
      } else {
        this.query.rawSql = defaultQuery;
      }
    }
    this.target=Object.assign(this.target,this.query);
    this.panelCtrl.events.on('data-received', this.onDataReceived.bind(this), $scope);
    this.panelCtrl.events.on('data-error', this.onDataError.bind(this), $scope);
  }

  onDataReceived(dataList) {
    this.lastQueryMeta = null;
    this.lastQueryError = null;

   // let anySeriesFromQuery = _.find(dataList, { refId: this.query.refId });
   // if (anySeriesFromQuery) {
   //   this.lastQueryMeta = anySeriesFromQuery.meta;
   //  }
  }

  onDataError(err) {
    if (err.data && err.data.results) {
      let queryRes = err.data.results[this.query.refId];
      if (queryRes) {
        this.lastQueryMeta = queryRes.meta;
        this.lastQueryError = queryRes.error;
      }
    }
  }
}
