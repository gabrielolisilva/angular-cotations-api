import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICotations } from '../../interfaces/global.interfaces';
import { RouterModule } from '@angular/router';
import { baseAPI_URL } from '../../helpers/helpers';
import { FormsModule } from '@angular/forms';
import _ from 'lodash';

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
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  formatDateString(dateString: string): string {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}
