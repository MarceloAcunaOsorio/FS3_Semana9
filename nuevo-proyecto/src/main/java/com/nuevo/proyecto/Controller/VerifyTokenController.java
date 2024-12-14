package com.nuevo.proyecto.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nuevo.proyecto.Model.Producto;
import com.nuevo.proyecto.Service.ProductoService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200/")
public class VerifyTokenController {

    @Autowired
    private ProductoService productoService;

    @RequestMapping("/token")
    public String token() {
        return "Hola si funciona el token de acceso!";
    }

    //Seccion de admin
    @RequestMapping("/admin")
    public String admin() {
        return "Hola bienvenido Admin!";
    }

    //Crear
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/productos/crear")
    public ResponseEntity<Producto> createProducto(@RequestPart("producto") Producto producto, @RequestPart ("file") MultipartFile file) {
        try {

            Producto createProducto = productoService.createProducto(producto, file);
            return new ResponseEntity<>(createProducto, HttpStatus.OK);
   

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

 
    //actualizar imagen
    @PutMapping("/{id}/image")
    public ResponseEntity<Producto> updateBookImage(@PathVariable Long id, @RequestPart("file") MultipartFile file) throws IOException {
        Optional<Producto> producto = productoService.getProductoById(id);
        if (producto.isPresent()) {
            Producto updatedProducto = productoService.updateProductoImagen(file, producto.get());
            return new ResponseEntity<>(updatedProducto, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    //Actualizar actualizar
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/productos/actualizar/{_idProducto}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long _idProducto, @RequestBody Producto producto) {
        
        try {

            Producto updateProducto = productoService.updateProducto(_idProducto, producto);
            return new ResponseEntity<>(updateProducto, HttpStatus.OK);    
        } 
        catch (Exception e) 
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
    }





    //Eliminar producto
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/productos/eliminar/{_idProducto}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long _idProducto)throws IOException  {
        
        Optional<Producto> producto = productoService.getProductoById(_idProducto);

        if(producto.isPresent())
        {
            productoService.deleteProducto(producto.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

       
    }



    //Listar producto
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/productos/listado")
    public List<Producto> getAllProductoadmin() {
        return productoService.getAllProductos();
    }



    //buscar producto
    @GetMapping("/productos/detalle/{id}")
    public Optional<Producto> getProductoAdminById(@PathVariable Long id) {
        return productoService.getProductoById(id);
    }




    @GetMapping("/productos/home")
    public List<Producto> getAllProductosadmin() {
        return productoService.getAllProductos();
    }




    @RequestMapping("/user")
    public String user() {
        return "Hola bienvenido User!";
    }
}
