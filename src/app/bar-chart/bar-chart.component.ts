/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
import { Component } from '@angular/core';
import { ValueAxisLabels } from '@progress/kendo-angular-charts';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from '@progress/kendo-file-saver';
import { ChartComponent } from '@progress/kendo-angular-charts';
import { ViewChild } from '@angular/core'


type AOA = any[][];

@Component({
	selector: 'bar',
	templateUrl: './bar-chart.component.html',
  styleUrls:['./bar-chart.component.css']

})
 export class BarChartComponent {
 @ViewChild('chart')
 private chart: ChartComponent;
 constructor(private router: Router) { }




  
  public exportChart(): void {
    this.chart.exportImage({
      width: 600,
      height: 600,
	  
    }).then((dataURI) => {
      saveAs(dataURI, 'Bar-Chart.png');
    });
  }

	data: AOA = [];
	public arr_names:number[] = new Array() ;
	 public categories: string[] = new Array();
	 public app:string;
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'SheetJS.xlsx';

	onFileChange(evt: any) {
		this.app="April-May"
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    if(this.wopts.bookType != "xlsx") throw new Error('please select an excel file')
   
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
			this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
			
			for (var index = 2; index < this.data.length; index++) 
			{
				var element = this.data[index];
			    
				   for (var i = 0; i < element.length ; i++)
				    {
                        var  val = element[i];
								
						 if(i % 2 == 0)
								this.categories.push(val); 
   							
					     else
                              this.arr_names.push(val);
						 
				    }

			}
			
};
		reader.readAsBinaryString(target.files[0]);
	}

	export(): void {
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
             
		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, this.fileName);
	}
	  
   
} 