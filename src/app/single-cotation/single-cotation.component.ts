import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICotations } from '../../interfaces/global.interfaces';
import { baseAPI_URL } from '../../helpers/helpers';

@Component({
  selector: 'app-single-cotation',
  standalone: true,
  imports: [],
  templateUrl: './single-cotation.component.html',
  styleUrl: './single-cotation.component.css',
})
export class SingleCotationComponent implements OnInit {
  isLoading: boolean = true;
  cotationName: string | null = null;
  cotationData: ICotations = {} as ICotations;

  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const paramId = params.get('id');

      if (paramId) {
        this.cotationName = paramId;
        this.getCotationInfo(paramId);
      }
    });
  }

  getCotationInfo(param: string): void {
    this.http
      .get<ICotations>(`${baseAPI_URL}/${param}`)
      .subscribe((res: ICotations) => {
        this.cotationData = res;
      });

    this.isLoading = false;
  }

  formatNumber = (value: number): string => {
    if (!value) return 'R$ 0,00';
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
