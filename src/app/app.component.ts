import { Component, OnChanges, SimpleChanges, VERSION } from '@angular/core';
import * as XLSX from 'xlsx';
import * as $ from 'jquery';
import { Subject } from 'rxjs';
import { DataTableDirective } from "angular-datatables";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
 
  
  title = 'csv';
  public tableData: any;
  public tableTitle: any;
  public customPagination = 1;
  public recordsPerPage = 4;
  public tableRecords = [];
  public pageStartCount = 0;
  public pageEndCount = 10;
  public totalPageCount = 0;
  public currentPage = 0;
 dtOptions:DataTables.Settings= {};
 dtTrigger: Subject<any> = new Subject<any>(); 

  ngOnInit() {
  this.dtOptions = {
    paging:true,
  pagingType: 'full_numbers',
  pageLength: 2,
  processing:true
}
  }


  public uploadData(e:any) {
    console.log(e.target.files[0]);
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(<unknown>e.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(data.length); // Data will be logged in array format containing objects
      this.tableData = data;
      this.tableTitle = Object.keys(this.tableData[0]);
      this.tableRecords = this.tableData.slice(
        this.pageStartCount,
        this.pageEndCount
      );
      console.log(this.pageStartCount);
      console.log(this.pageEndCount)
      this.totalPageCount = this.tableData.length / this.recordsPerPage;
      console.log(this.totalPageCount)
    };
  }

  onPageChange() {
    console.log(this.currentPage);
    console.log(this.recordsPerPage)
    this.pageStartCount = this.currentPage * this.recordsPerPage;
    this.pageEndCount = this.pageStartCount + this.recordsPerPage;
    this.tableRecords = this.tableData.slice(
      this.pageStartCount,
      this.pageEndCount
    );
    console.log(this.tableRecords)

  }

}

$(document).ready(function () {
  $('#dtBasicExample').DataTable();
  $('.dataTables_length').addClass('bs-select');
});
