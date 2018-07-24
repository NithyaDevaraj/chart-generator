/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
import { Component } from '@angular/core';
import { ValueAxisLabels } from '@progress/kendo-angular-charts';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from '@progress/kendo-file-saver';
import { ChartComponent } from '@progress/kendo-angular-charts';
import { ViewChild } from '@angular/core'
import {AppStatus  } from './AppStatus';


type AOA = any[][];

@Component({
  selector: 'stack',
  templateUrl: './stack-chart.component.html',
    styleUrls:['./stack-chart.component.css']


})
export class StackChartComponent {
  @ViewChild('chart')
  private chart: ChartComponent;
constructor(private router: Router) { }

  


  public exportChart(): void {
    this.chart.exportImage({
      width: 600,
      height: 600,

    }).then((dataURI) => {
      saveAs(dataURI, 'Stack.png');
    });
  }


  public appstatus: AppStatus = new AppStatus();
  //  constructor(){
  //     this.appstatus = new AppStatus();
  //     //this.appstatus.application= application;
  //    //this.appstatus.status= status;
  //  }

  // // }



  public ind: number;

  public stat: number;
  public app: number;
  data: AOA = [];
  public arr_names: number[] = new Array();
	 public cat: string[] = new Array();
  public NAMES: AppStatus[] = new Array<AppStatus>();
  public new: AppStatus[] = new Array();
  public ri: number[] = new Array();
  public qi: number[] = new Array();
  public oi: number[] = new Array();
  public ii: number[] = new Array();
  public di: number[] = new Array();
  public r:string;
  public q:string;
  public i:string;
  public o:string;
  public d:string;



  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
     this.r="RESOLVED"
         this.q="QA APPROVED"
         this.o="OPEN"
         this.i="IN PROGRESS"
         this.d="DEV COMPLETED"

    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      // this.appstatus.count=0;

      for (var index = 0; index < this.data.length; index++) 
      {
           this.ind=-1
               var element = this.data[index];

        for (var i = 0; i < element.length; i++) {
          var val = element[i];


          if (val == "Status") {
            this.stat = i


          }
          else if (val == "Custom field (Application)")
            this.app = i


        }

        if (index == 0) {

          this.appstatus = new AppStatus();
          this.appstatus.application = element[this.app]
          this.appstatus.status = element[this.stat]
          this.appstatus.count = 1

          this.NAMES.push(this.appstatus)                   
        }                                                         
        for (var i = 0; i < this.NAMES.length; i++) {

          if (this.NAMES[i].application == element[this.app] && this.NAMES[i].status == element[this.stat]) {
            this.ind = i
            break;
          }
          
        }

        if (this.ind == -1)
        {
          this.appstatus = new AppStatus();
          this.appstatus.application = element[this.app]
          this.appstatus.status = element[this.stat]
          this.appstatus.count = 1
          this.NAMES.push(this.appstatus)
        
        }
        else {
          this.NAMES[this.ind].count = this.NAMES[this.ind].count + 1
        }




      }
      console.log(this.NAMES)
      this.NAMES.forEach(element => {
        if (this.cat.indexOf(element.application) == -1 && element.application != "Custom field (Application)")
          this.cat.push(element.application)
      });

      console.log(this.cat);
      console.log(this.NAMES);


    for (var i = 0; i < this.cat.length; i++)
    {  this.ind=-1
       for (var j = 0; j < this.NAMES.length; j++)
        {
        
                  if(this.cat[i]===this.NAMES[j].application && this.NAMES[j].status==="Resolved")
                    {
                    
                               

                                 this.ri.push(this.NAMES[j].count)
                              this.ind=0
                     }
                    
          }
if(this.ind==-1)
     this.ri.push(0)
  }

    for (var i = 0; i < this.cat.length; i++)
    {  this.ind=-1
       for (var j = 0; j < this.NAMES.length; j++)
        {
        
                  if(this.cat[i]===this.NAMES[j].application && this.NAMES[j].status==="QA Approved")
                    {
                    
                               

                                 this.qi.push(this.NAMES[j].count)
                              this.ind=0
                     }
                    
          }
if(this.ind==-1)
     this.qi.push(0)
  }

    for (var i = 0; i < this.cat.length; i++)
    {  this.ind=-1
       for (var j = 0; j < this.NAMES.length; j++)
        {
        
                  if(this.cat[i]===this.NAMES[j].application && this.NAMES[j].status==="Open")
                    {
                    
                                

                                 this.oi.push(this.NAMES[j].count)
                              this.ind=0
                     }
                    
          }
if(this.ind==-1)
     this.oi.push(0)
  }


    for (var i = 0; i < this.cat.length; i++)
    {  this.ind=-1
      
       for (var j = 0; j < this.NAMES.length; j++)
        {
        
                  if(this.cat[i]===this.NAMES[j].application && this.NAMES[j].status==="In Progress")
                    {
                    
                                
                                 this.ii.push(this.NAMES[j].count)
                              this.ind=0
                     }
                    
          }
if(this.ind==-1)
     this.ii.push(0)
  }


    for (var i = 0; i < this.cat.length; i++)
    {  this.ind=-1
     
       for (var j = 0; j < this.NAMES.length; j++)
        {
        
                  if(this.cat[i]===this.NAMES[j].application && this.NAMES[j].status==="Dev Completed")
                    {
                    
                                

                                 this.di.push(this.NAMES[j].count)
                              this.ind=0
                     }
                    
          }
if(this.ind==-1)
     this.di.push(0)
  }


   
 



    };

    reader.readAsBinaryString(target.files[0]);

  }


}
