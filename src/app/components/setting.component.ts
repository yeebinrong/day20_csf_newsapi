import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageDataBase } from '../storage.database';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  apikey: string;
  apiform: FormGroup;
  constructor(private fb: FormBuilder, private db: StorageDataBase, private router: Router) { }

  ngOnInit(): void {
    this.getAPI();
    this.apiform = this.CreateForm();

  }

  async getAPI () {
    const data = await this.db.getAPI();
    this.apikey = data['apikey'];
    this.apiform.patchValue({
      apikey: this.apikey
    })
  }

  saveAPI () {
    const id = 'apikey'
    const apikey = this.apiform.value;
    apikey.id = id;
    this.db.addAPI(apikey)
    this.router.navigate(['/list'])
  }

  deleteAPI () {
    const id = 'apikey'
    this.apiform.patchValue({
      apikey: ''
    })
    const apikey = this.apiform.value;
    apikey.id = id;
    this.db.addAPI(apikey)
    this.router.navigate(['/list'])
  }

  CreateForm ():FormGroup {
    return this.fb.group({
      id: this.fb.control(''),
      apikey: this.fb.control(this.apikey, [Validators.required])
    })
  }
}
