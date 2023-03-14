export interface Employee {
    emp_no: number;
    birth_date: Date;
    first_name: string;
    last_name: string;
    gender: Gender;
    hire_date: Date;
    salaries: [{
        salary:number,
        from_date:Date,
        to_date:Date,
    }
    ];
    titles: [{
        title:string,
        from_date:Date,
        to_date:Date,
    }
    ];
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}