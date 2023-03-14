import { Component,OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent  implements OnInit {
  
  employees: Employee[] = [];

  /*Created constructor*/

  constructor(public employeeService: EmployeeService) { }

  /**
   ngOnInit
   */

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((data: Employee[])=>{
      this.employees = data;
    })  
  }

    /**
   Delete
   */

  deleteEmployee(emp_no:number){
    this.employeeService.delete(emp_no).subscribe(res => {
         this.employees = this.employees.filter(item => item.emp_no !== emp_no);
    })
  }

}
