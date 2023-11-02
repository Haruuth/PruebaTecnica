import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

enum SORT_TYPE {
  ASC = 'ASC',
  DESC = 'DESC',
}

enum SORT_KEYS {
  DEFAULT = '',
  NAME = 'name',
  PRICE = 'price',
}

interface ProductsFormat {
  _id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image: {
    src: string;
    alt: string;
  };
  bestseller: boolean;
  featured: boolean;
  description: string;
  people_also_buy: [] | ProductsFormat[];
  updated_at: string;
  created_at: string;
}

interface Sort {
  key?: SORT_KEYS;
  type?: SORT_TYPE;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  products: ProductsFormat[] = [];
  sortKeys = SORT_KEYS;
  sort: Sort = { key: SORT_KEYS.DEFAULT, type: SORT_TYPE.DESC };
  page: number = 1;
  productsPerPage: number = 6;
  lastPage: number | undefined;
  featured: ProductsFormat | undefined;

  statusCategories = [
    { key: 'people', checked: false },
    { key: 'food', checked: false },
    { key: 'landmarks', checked: false },
    { key: 'pets', checked: false },
    { key: 'premium', checked: false },
    { key: 'cities', checked: false },
    { key: 'nature', checked: false },
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDates();
    this.postFunction();
  }

  checkCategory(value: any) {
    const foundCategory = this.statusCategories.find(
      (category) => category.key === value
    );
    if (foundCategory) {
      foundCategory.checked = !foundCategory.checked;
      const filteredCategories = this.statusCategories.filter(
        (category) => category.checked
      );
      this.categories = filteredCategories.map((category) => category.key);
    }
    this.postFunction();
  }

  sortProducts() {
    if (
      this.sort.type === SORT_TYPE.ASC ||
      this.sort.key === SORT_KEYS.DEFAULT
    ) {
      this.sort.type = SORT_TYPE.DESC;
    } else if (this.sort.type === SORT_TYPE.DESC) {
      this.sort.type = SORT_TYPE.ASC;
    }
    this.postFunction();
  }

  selector() {
    if (this.sort.key === SORT_KEYS.DEFAULT) {
      this.sort.type = SORT_TYPE.DESC;
    }
    this.postFunction();
  }

  capitalizeFirstLetter(text: string) {
    const firstLetter = text.substring(0, 1).toUpperCase();
    return firstLetter + text.substring(1);
  }

  

  loadDates() {
    this.apiService
      .postPagination(this.page, this.productsPerPage)
      .subscribe((response: any) => {
        this.products = response.data.data;
        this.lastPage = response.data.last_page;
      });
  }

  loadPrevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadDates();
    }
    console.log('prev page');
  }

  loadNextPage() {
    if (this.lastPage && this.page < this.lastPage) {
      this.page++;
      this.loadDates();
    }
    console.log('next page');
  }

  postFunction() {
    let postFilter: { sort?: Sort; categories?: string[] } = {};

    if (this.categories.length) {
      postFilter.categories = this.categories;
    }

    if (this.sort.key !== SORT_KEYS.DEFAULT) {
      postFilter.sort = this.sort;
    }

    this.apiService.postData(postFilter).subscribe((response: any) => {
      if (response.data?.data) {
        const { data, last_page } = response.data;
        if (data[0].featured) {
          this.featured = data[0];
        }
        this.products = data;
        this.lastPage = last_page;
        console.log('Respuesta POST:', data);
      }
      //TODO:implementar control de error
    });
  }
}
