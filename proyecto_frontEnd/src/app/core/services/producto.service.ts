import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { producto } from '../../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private readonly apiUrl = 'http://localhost:8083/api/productos';

  constructor(private readonly http: HttpClient) { }

  //listar producto
  private readonly apUrl = 'http://localhost:8083/api/home';
  getProducto(): Observable<producto[]> {
    return this.http.get<producto[]>(`${this.apUrl}`)
  }


  //id del producto
  // Modify getProductoById to accept token
  getProductoById(_IdProducto: number, token: string): Observable<any> {
    // Set up the HTTP headers with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send the GET request with the headers
    return this.http.get(`${this.apiUrl}/detalle/${_IdProducto}`, { headers });
  }





  //crear producto

  createProducto(producto: any, token: string, image: File): Observable<any> {

    const formData = new FormData();
    formData.append('producto', new Blob([JSON.stringify(producto)], { type: 'application/json' }));
    formData.append('file', image);


    // Set up the HTTP headers with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    formData.forEach((value, key) => {
      console.log(`${key}:`, value); // Debugging
    });

    // Send the POST request with the headers
    return this.http.post(`${this.apiUrl}/crear`, formData, { headers });
  }

  //actualiza imagen
  updateProductoImage(id: number, image: File): Observable<producto> {
    const formData = new FormData()
    formData.append('file', image)
    return this.http.put<producto>(`${this.apiUrl}/${id}/image`, formData);
  }





  //Actualizar producto
  // Modify updateProducto method to accept token
  updateProducto(_idProducto: number, producto: any, token: string): Observable<any> {
    // Set up the HTTP headers with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send the PUT request with the headers
    return this.http.put(`${this.apiUrl}/actualizar/${_idProducto}`, producto, { headers });
  }







  //eliminar producto

  deleteProducto(_idProducto: number, token: string): Observable<any> {

    // Set up the HTTP headers with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send the DELETE request with the headers
    return this.http.delete(`${this.apiUrl}/eliminar/${_idProducto}`, { headers });
  }

}
