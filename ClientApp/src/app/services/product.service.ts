import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    products = [
        {
            'name': 'test',
            'price': '10zł',
            'description': 'jakiś opis',
            'image': 'https://s3.przepisy.pl/przepisy3ii/img/variants/600x600/pieczen_ze_schabu_w_glazurze_z_dzemu_morelowego_z_cebula_i_jablkiem586991.jpg'
        },
        {
            'name': 'test2',
            'price': '12zł',
            'description': 'jakiś opis 2',
            'image': 'https://s3.przepisy.pl/przepisy3ii/img/variants/600x600/pieczen_ze_schabu_w_glazurze_z_dzemu_morelowego_z_cebula_i_jablkiem586991.jpg'
        },
        {
            'name': 'test3',
            'price': '15zł',
            'description': 'jakiś opis 3',
            'image': 'https://s3.przepisy.pl/przepisy3ii/img/variants/600x600/pieczen_ze_schabu_w_glazurze_z_dzemu_morelowego_z_cebula_i_jablkiem586991.jpg'
        },
        {
            'name': 'test4',
            'price': '20zł',
            'description': 'jakiś opis 4',
            'image': 'https://s3.przepisy.pl/przepisy3ii/img/variants/600x600/pieczen_ze_schabu_w_glazurze_z_dzemu_morelowego_z_cebula_i_jablkiem586991.jpg'
        }
    ]

    public getProducts() {
        return this.products;
    }
}