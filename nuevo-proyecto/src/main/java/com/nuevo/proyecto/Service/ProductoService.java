package com.nuevo.proyecto.Service;


import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.nuevo.proyecto.Model.Producto;

public interface ProductoService {
    
    //listar producto
    List<Producto> getAllProductos();

    //buscar producto por id
    Optional<Producto> getProductoById(Long _IdProducto);
 
    //metodo para actualizar, crear y eliminar
    Producto createProducto(Producto _IdProducto, MultipartFile file) throws IOException;
    Producto updateProducto(Long _IdProducto, Producto producto);
    void deleteProducto(Producto producto) throws IOException;

    Producto updateProductoImagen(MultipartFile file, Producto producto) throws IOException;
}
