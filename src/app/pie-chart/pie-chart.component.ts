
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartComponent } from '@progress/kendo-angular-charts';
import { saveAs } from '@progress/kendo-file-saver';

import * as XLSX from 'xlsx';
import { ValueAxisLabels } from '@progress/kendo-angular-charts';

type AOA = any[][];
@Component({
  selector: 'pie',
 templateUrl: './pie-chart.component.html',
  styleUrls:['./pie-chart.component.css']

})
export class PieChartComponent {

@ViewChild('chart')
  private chart: ChartComponent;
constructor(private router: Router) { }


  public exportChart(): void {
    this.chart.exportImage({
      width: 600,
      height: 600,
	  
    }).then((dataURI) => {
      saveAs(dataURI, 'PieChart.png');
    });
  }

  
  data: AOA = [];
	public arr_names:number[] = new Array() ;
	// public categories: string[] = new Array();
    public normal: string[] = new Array();
    public high: string[] = new Array();
    public low: string[] = new Array();

   public nc:number = 0 ;
   public hc:number = 0 ;
   public lc:number = 0 ;
   public pos:number = 0 ;
   public PRIORITY: string;
   public pieData: any;
   
	 
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'SheetJS.xlsx';
 
	onFileChange(evt: any) {

		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
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
			
			for (var index = 0; index < this.data.length; index++) 
			{
				var element = this.data[index];
       
			    
				   for (var i = 0; i < element.length ; i++)
				    {
                        var  val = element[i];
                        if(val=="Priority")
                           this.pos= i
                            
								if(i%this.pos==0 && i!= 0)
						      {

                    if(val=="Normal")
                      {this.normal.push(val)
                        this.nc = this.nc+1;
                        
                      }
                      else if(val=="High")
                      {this.high.push(val)
                        this.hc = this.hc+1;
                      }
                       else if(val=="Low")
                      {this.low.push(val)
                        this.lc = this.lc+1;
                      }
                      
               
                  }
			}
    }
  
  
      

this.pieData = [{ category: 'Normal', value: this.nc },
    { category: 'High', value: this.hc},
    { category: 'Low', value: this.lc}]
   };
		 console.log(this.pieData);
    this.PRIORITY = "PRIORITY";
		reader.readAsBinaryString(target.files[0]);
	}

	 
    }