import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICotations } from '../../interfaces/global.interfaces';
import { RouterModule } from '@angular/router';
import { baseAPI_URL } from '../../helpers/helpers';
import { FormsModule } from '@angular/forms';
import _ from 'lodash';
import { UtilsService } from '../utils/utils.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  inputValue: string = '';
  selectValue: string = '';
  originalCotationsData: ICotations[] = [];
  cotationsData: ICotations[] = [];

  filterOption: { field: string; label: string }[] = [
    { field: '', label: 'Selecionar...' },
    { field: 'compra', label: 'Compra' },
    { field: 'venta', label: 'Venda' },
  ];

  http = inject(HttpClient);
  utilsService = inject(UtilsService);

  ngOnInit(): void {
    this.getAllCotations();
  }

  getAllCotations(): void {
    this.http
      .get<ICotations[]>(`${baseAPI_URL}`)
      .subscribe((res: ICotations[]) => {
        this.originalCotationsData = res;
        this.cotationsData = res;
      });
  }

  handleFilterCard(): void {
    const newData = this.originalCotationsData.filter((el) => {
      const formatedElName = el.nombre.toLowerCase();
      return formatedElName.includes(this.inputValue.toLowerCase());
    });

    this.cotationsData = newData;
  }

  handleOrderList(): void {
    const newData = _.orderBy(this.cotationsData, [this.selectValue], ['desc']);
    this.cotationsData = newData;
  }

  formatNumber = (value: number): string => {
    return this.utilsService.formatNumber(value);
  };

  formatDateString(dateString: string): string {
    return this.utilsService.formatDateString(dateString);
  }
}
