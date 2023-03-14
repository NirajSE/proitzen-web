import { Component,OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Gender } from '../employee';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  message: string = "";
  messagetype: string = "";
  id!: number;
  employee!: Employee;
  form!: FormGroup;
  genderValues = Object.values(Gender);

  constructor(
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['employeeId'];
    this.employeeService.find(this.id).subscribe((data: Employee)=>{
      this.employee = data;
    }); 
      
    this.form = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      birth_date: new FormControl('', [Validators.required]),
      hire_date: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  get f(){
    return this.form.controls;
  }

  removeTitleDetail(tit: any){
    this.employeeService.deleteTitle(this.id, tit.from_date, tit.title).subscribe((res:any) => {
      this.message = res.message;
      this.messagetype = res.messagetype;
      if(this.messagetype === 'success'){
        const index = this.employee.titles.indexOf(tit);
        if (index !== -1) {
          this.employee.titles.splice(index, 1);
        }
      }
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    },
    (err: any) => {
      // Handle error response here
      this.message = err.error.message;
    })
  }

  removeSalaryDetail(sal: any){
    this.employeeService.deleteSalary(this.id, sal.from_date).subscribe((res:any) => {
      this.message = res.message;
      this.messagetype = res.messagetype;
      if(this.messagetype === 'success'){
        const index = this.employee.salaries.indexOf(sal);
        if (index !== -1) {
          this.employee.salaries.splice(index, 1);
        }
      }
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    },
    (err: any) => {
      // Handle error response here
      this.message = err.error.message;
    })
  }

  hideMessages() {
    this.message = "";
    this.messagetype = "";
  }


  submit(){
    const formData = Object.assign({}, this.form.value);
    this.employeeService.update(this.id, formData).subscribe((res:any) => {
      this.message = res.message;
      this.messagetype = res.messagetype;
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    },
    (err: any) => {
      // Handle error response here
      this.message = err.error.message;
    })
  }

}
