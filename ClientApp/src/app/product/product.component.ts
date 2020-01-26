import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {
  @Input() product: any
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
