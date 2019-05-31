import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Output() featureSelected = new EventEmitter<string>();
  isOpen = false;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe((response: Response) => {
        console.log(response);
      }, () => console.log('error'));
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  openModal() {
    this.isOpen = !this.isOpen;
  }
}
