package com.nuevo.proyecto.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nuevo.proyecto.Model.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

}
