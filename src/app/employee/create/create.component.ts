import { Component,OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder,Validators } from '@angular/forms'
import { Gender } from '../employee';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent  implements OnInit {
  
  message: string = "";
  messagetype: string = "";
  form!: FormGroup;
  salaryForm: FormGroup;
  designationForm: FormGroup;
  genderValues = Object.values(Gender);

  /*Created constructor*/

  constructor(
    public employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    
    this.salaryForm = this.fb.group({
      salaries: this.fb.array([]) ,
    });

    this.designationForm = this.fb.group({
      designations: this.fb.array([]) ,
    });

  }

  salaries() : FormArray {
    return this.salaryForm.get("salaries") as FormArray
  }

  designations() : FormArray {
    return this.designationForm.get("designations") as FormArray
  }

  newSalary(): FormGroup {  
    return this.fb.group({  
      salary:['', Validators.required],  
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],  
    })  
  }  

  newDesignation(): FormGroup {  
    return this.fb.group({  
      title:['', Validators.required],  
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],  
    })  
  }  

  addSalaryDetail() {
    this.salaries().push(this.newSalary());
  }

  addDesignationDetail() {
    this.designations().push(this.newDesignation());
  }
   
  removeSalaryDetail(i:number) {
    this.salaries().removeAt(i);
  }

  removeDesignationDetail(i:number) {
    this.designations().removeAt(i);
  }

  hideMessages() {
    this.message = "";
    this.messagetype = "";
  }

  /*ngOnInit*/

  ngOnInit(): void {
    this.form = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      birth_date: new FormControl('', [Validators.required]),
      hire_date: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }
  
  /*form controls*/

  get f(){
    return this.form.controls;
  }

  /*submit*/

  submit(){
    const formData = Object.assign({}, this.form.value,this.salaryForm.value, this.designationForm.value);
    this.employeeService.create(formData).subscribe((res:any) => {
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
