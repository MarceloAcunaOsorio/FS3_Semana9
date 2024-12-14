package com.nuevo.proyecto.Service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.nuevo.proyecto.Model.Image;

public interface ImageService {
    Image uploadImage(MultipartFile file) throws IOException;
    void deleteImage(Image image) throws IOException;

}
