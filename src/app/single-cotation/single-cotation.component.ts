import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICotations } from '../../interfaces/global.interfaces';
import { baseAPI_URL } from '../../helpers/helpers';
import { UtilsService } from '../utils/utils.service';

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
  utilsService = inject(UtilsService);

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
    return this.utilsService.formatNumber(value);
  };

  formatDateString(dateString: string): string {
    return this.utilsService.formatDateString(dateString);
  }
}
