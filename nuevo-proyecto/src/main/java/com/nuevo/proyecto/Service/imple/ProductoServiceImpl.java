package com.nuevo.proyecto.Service.imple;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nuevo.proyecto.Model.Image;
import com.nuevo.proyecto.Model.Producto;
import com.nuevo.proyecto.Repository.ProductoRepository;
import com.nuevo.proyecto.Service.ImageService;
import com.nuevo.proyecto.Service.ProductoService;
import com.nuevo.proyecto.exceptions.NotFoundException;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ImageService imageService;

    public ProductoServiceImpl(ProductoRepository productoRepository, ImageService imageService) {
        this.productoRepository = productoRepository;
        this.imageService = imageService;
    }

    //mostrar listado de productos
    @Override
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    //Consultar Producto por ID
    @Override
    public Optional<Producto> getProductoById(Long _IdProducto) {
        return productoRepository.findById(_IdProducto);
    }

    //Crear Producto
    @Override
    public Producto createProducto(Producto producto, MultipartFile file) throws IOException {

        if (file != null && !file.isEmpty()) {
            Image image = imageService.uploadImage(file);
            producto.setImage(image);
        }
        return productoRepository.save(producto);
    }

    //Actualizar Producto
    @Override
    public Producto updateProducto(Long _IdProducto, Producto producto) {
        if (!productoRepository.existsById(_IdProducto)) {
            throw new NotFoundException("Producto no encontrado con ID: " + _IdProducto);
        }
        producto.set_IdProducto(_IdProducto);
        return productoRepository.save(producto);
    }


    //borrar producto
    @Override
    public void deleteProducto(Producto producto) throws IOException{
        
        if (producto.getImage() != null) {
            imageService.deleteImage(producto.getImage());
        }

        if (!productoRepository.existsById(producto.get_IdProducto())) {
            throw new NotFoundException("Producto no encontrado con ID: " + producto.get_IdProducto());
        }
        productoRepository.deleteById(producto.get_IdProducto());

    }



    @Override
    public Producto updateProductoImagen(MultipartFile file, Producto producto) throws IOException {
        if (producto.getImage() != null) {
            imageService.deleteImage(producto.getImage());
        }
        Image newImage = imageService.uploadImage(file);
        producto.setImage(newImage);
        return productoRepository.save(producto);
    }

}
